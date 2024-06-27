import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthSuscribeDto } from './dto/auth-suscribe.dto';
import { AuthLoginDto } from './dto/auth-login.dto';

@Controller('auth')
@ApiTags('Auth')
@ApiBearerAuth()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/suscribe')
  @ApiBody({ type: [AuthSuscribeDto], description: 'Recibe un objeto usuario (para registro manual)' })
  suscribe(@Body() user: AuthSuscribeDto) {
    try {
      return this.authService.suscribe(user);
    } catch (error) {
      return error.message;
    }
  }

  @Post('/verify')
  @ApiBody({ type: String, description: 'Recibe un jwt token (proporcionado por el /suscribe)' })
  register(@Body() token: string) {
    try {
      return this.authService.verify(token);
    } catch (error) {
      return error.message;
    }
  }
  
  @Post('/login')
  @ApiBody({ type: [AuthLoginDto], description: 'Recibe un email y contraseña' })
  login(@Body() user: AuthLoginDto) {
    try {
      return this.authService.login(user);
    } catch (error) {
      return error.message;
    }
  }
}
