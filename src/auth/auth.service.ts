import { LoginDto } from '@/src/auth/dto/login.dto';
import { RegisterDto } from '@/src/auth/dto/register.dto';
import { Body, Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {




  getUser() {
    return 'Current user data';
  }

  userRegister( userCredentials: RegisterDto): string {
    return userCredentials.email;
  }

  userLogin( userCredentials: LoginDto): string {
    return userCredentials.email;
  }
}
