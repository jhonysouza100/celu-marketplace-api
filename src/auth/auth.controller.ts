import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { ApiAcceptedResponse, ApiBearerAuth, ApiBody, ApiDefaultResponse, ApiHeader, ApiTags } from '@nestjs/swagger';
import { AuthSuscribeDto } from './dto/auth-suscribe.dto';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { Roles } from './decorators/roles.decorator';
import { Role } from './enums/roles.enum';

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
  @ApiDefaultResponse({description: '{"access_token": "123456789abcdef" }'})
  suscribe(@Body() user: AuthSuscribeDto) {
    try {
      return this.authService.suscribe(user);
    } catch (error) {
      return error.message;
    }
  }

  @Post('/authorize')
  @Roles(Role.USER)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer access_token',
  })
  @ApiAcceptedResponse({description: '{"email": "johndoe@gmail.com","username": "john doe", role: "user", "iat": 1719542330,"exp": 1719545930}'})
  authorize(@Req() req) {
    return req.user;
  }

  
}
