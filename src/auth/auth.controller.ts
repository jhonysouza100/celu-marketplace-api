import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { ApiAcceptedResponse, ApiBearerAuth, ApiBody, ApiDefaultResponse, ApiHeader, ApiTags } from '@nestjs/swagger';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth.guard';

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

  @Post('/register')
  @ApiBody({ type: [AuthRegisterDto], description: 'Recibe un objeto usuario (para registro manual)' })
  @ApiDefaultResponse({description: '{"access_token": "123456789abcdef" }'})
  register(@Body() user: AuthRegisterDto) {
    try {
      return this.authService.register(user);
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
  @ApiAcceptedResponse({description: '{"email": "johndoe@gmail.com","username": "john doe", "iat": 1719542330,"exp": 1719545930}'})
  authorize(@Req() req) {
    return req.user;
  }

  
}
