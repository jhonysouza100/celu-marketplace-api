import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailsModule } from './emails/emails.module';
import { UsersModule } from './users/users.module';
import { ProfileModule } from './profile/profile.module';
import { AuthModule } from './auth/auth.module';
import config from './config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: config.DATABASE_HOST,
      port: (parseFloat(config.DATABASE_PORT)),
      username: config.DATABASE_USERNAME,
      password: config.DATABASE_PASSWORD,
      database: config.DATABASE_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    EmailsModule,
    UsersModule,
    ProfileModule,
    AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
