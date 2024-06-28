import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { ApiAcceptedResponse, ApiBearerAuth, ApiBody, ApiHeader, ApiTags } from '@nestjs/swagger';
import { AuthSuscribeDto } from './dto/auth-suscribe.dto';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@Controller('auth')
@ApiTags('Auth')
@ApiBearerAuth()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @ApiBody({ type: [AuthLoginDto], description: 'Recibe un email y contraseña' })
  login(@Body() user: AuthLoginDto) {
    try {
      return this.authService.login(user);
    } catch (error) {
      return error.message;
    }
  }

  @Post('/suscribe')
  @ApiBody({ type: [AuthSuscribeDto], description: 'Recibe un objeto usuario (para registro manual)' })
  suscribe(@Body() user: AuthSuscribeDto) {
    try {
      return this.authService.suscribe(user);
    } catch (error) {
      return error.message;
    }
  }

  @Post('/authorize')
  @UseGuards(AuthGuard)
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer access_token',
  })
  @ApiAcceptedResponse({description: '{"email": "johndoe@gmail.com","username": "john doe","iat": 1719542330,"exp": 1719545930}'})
  authorize(@Request() req) {
    return req.user;
  }
  
}
