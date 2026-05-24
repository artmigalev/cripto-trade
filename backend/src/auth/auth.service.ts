import { LoginDto } from '@/src/auth/dto/login.dto';
import { RegisterDto } from '@/src/auth/dto/register.dto';
import { User } from '@interfaces/user.interface';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import * as bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly users: User[] = [];

  constructor(private jwtService: JwtService) {}

  getUser(email: LoginDto['email']): User | undefined {
    return this.users.find((user) => user.email === email);
  }

  async userRegister(userCredentials: RegisterDto) {

      const user = this.getUser(userCredentials.email);

      if (user) {
        throw new BadRequestException('User already exists');
      }
      const nextId = randomUUID();

      const hash = await bcrypt.hash(userCredentials.password, 10);

      this.users.push({ ...userCredentials, password: hash, id: nextId });

      const access_token = this.jwtService.signAsync({
        sub: nextId,
        email: userCredentials.email,
      });

      return { access_token };

  }

  async userLogin(userCredentials: LoginDto) {

      const user = this.getUser(userCredentials.email);

      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }
      const isMatch = await bcrypt.compare(
        userCredentials.password,
        user.password,
      );

      if (!isMatch) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const access_token = this.jwtService.signAsync({
        sub: user.id,
        email: user.email,
      });

      return { access_token };

  }
}
