import { AuthService } from '@auth/auth.service';
import { LoginDto } from '@/src/auth/dto/login.dto';
import { RegisterDto } from '@dto/register.dto';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Res,
} from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('/me')
  getCredentials(@Body() userCredentials: LoginDto) {
    return this.authService.getUser(userCredentials.email);
  }
  // /auth/register
  @HttpCode(HttpStatus.OK)
  @Post('/register')
  createUser(@Body() userCredentials: RegisterDto) {
    return this.authService.userRegister(userCredentials);
  }

  // /auth/login
  @Post('/login')
  authenticateUser(@Body() userCredentials: LoginDto) {
    return this.authService.userLogin(userCredentials);
  }
}
