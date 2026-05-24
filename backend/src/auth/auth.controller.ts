import { AuthService } from '@auth/auth.service';
import { LoginDto } from '@/src/auth/dto/login.dto';
import { RegisterDto } from '@dto/register.dto';
import {
  Controller,
  Body,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@auth/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}


  @UseGuards(AuthGuard)
  @Get('/me')
  getCredentials(@Req() req:Request) {
    return req['user'];
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
