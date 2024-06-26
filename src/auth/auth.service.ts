import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import { EmailsService } from 'src/emails/emails.service';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthRegisterDto } from './dto/auth-register.dto';

@Injectable()
export class AuthService {

  constructor(
    private readonly emailService: EmailsService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService) {}

  async login(user: AuthLoginDto) {

    const userFound = await this.usersService.findUserByEmail(user.email);

    // bcrypt compare
    const checkPassword = await compare(user.password, userFound.password );

    if(!checkPassword) throw new HttpException('Password incorrect', HttpStatus.FORBIDDEN);

    const payload = {
      email: userFound.email,
      username: userFound.username,
      role: userFound.role
    };

    const access_token = await this.jwtService.signAsync(payload);

    return {
      id: userFound.id,
      username: userFound.username,
      email: userFound.email,
      picture: userFound.picture,
      profile: userFound.profile,
      access_token};
  }

  async register(user: AuthRegisterDto) {

    // Verifica si el usuario ya existe
    await this.usersService.findUnique(user);

    const payload = {
      email: user.email,
      username: user.username
    }

    const access_token = await this.jwtService.signAsync(payload);

    await this.emailService.sendEmail(
      {
        "subject": "Email Authentication",
        "to": [
          {
            "email": `${user.email}`,
            "name": `${user.username}`
          }
        ],
        "htmlContent": `${access_token}`,
        "sender": {
          "name": "Nombre del Remitente",
          "email": "jhonatansouzameza100@correo.com"
        }
      }
    )

    return {access_token}

  }
  
}
