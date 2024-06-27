import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import { EmailsService } from 'src/emails/emails.service';
import { UsersService } from 'src/users/users.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthSuscribeDto } from './dto/auth-suscribe.dto';

@Injectable()
export class AuthService {

  constructor(private emailService: EmailsService, private usersService: UsersService) {}

  async login(user: AuthLoginDto) {

    const userFound = await this.usersService.findUserByEmail(user.email);

    // bcrypt compare
    const checkPassword = await compare(user.password, userFound.password );

    if(!checkPassword) throw new HttpException('Password incorrect', HttpStatus.FORBIDDEN);

    // const payload = {email: userFound.email, username: userFound.username}
    // const token = await this.jwtService.sign(payload)

    // return token;

  }

  async suscribe(user: AuthSuscribeDto) {

    await this.usersService.findUnique(user);

    const payload = {email: user.email, username: user.username}

    // const token = await this.jwtService.sign(payload)

    await this.emailService.sendEmail(
      {
        "subject": "Email Authentication",
        "to": [
          {
            "email": `${user.email}`,
            "name": `${user.username}`
          }
        ],
        "htmlContent": `${'token'}`,
        "sender": {
          "name": "Nombre del Remitente",
          "email": "jhonatansouzameza100@correo.com"
        }
      }
    )

  }

  async verify(token: string) {

    // const isVerified = await jwtService.verify(token);

    // if(!isVerified) throw new HttpException('Invalid token', HttpStatus.FORBIDDEN);

    // const user = await this.jwtService.extract(token);

    // return user

  }

}
