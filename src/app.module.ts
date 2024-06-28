import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailsModule } from './emails/emails.module';
import { UsersModule } from './users/users.module';
import { ProfileModule } from './profile/profile.module';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
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
    ThrottlerModule.forRoot([{
      ttl: 1000,
      limit: 3,
    }]),
    EmailsModule,
    UsersModule,
    ProfileModule,
    AuthModule,
    PostsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
