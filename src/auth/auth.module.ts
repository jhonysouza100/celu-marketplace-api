import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { EmailsModule } from 'src/emails/emails.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [ JwtModule.register({
    secret: 'any',
    signOptions: { expiresIn: '1h'}
  }),UsersModule, EmailsModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
