<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Descripcion

Nodejs, y MySQL en conjunto con TypeORM. En este proyecto crea módulos, controladores, servicios y entidades que interactuen con una base de datos y relacionandolas (OneToOne, OneToMany y ManyToOne).

## Instalacion

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod

# Swagger UI
$ /docs
```

## Eslint

`.eslintrc.js`

```bash
# eslint rules config
"prettier/prettier": [
    "error",
    {
      "endOfLine": "auto"
    }
  ]
```

## Install @nestjs/typeorm

```bash
npm install --save @nestjs/typeorm typeorm mysql2
```

`/app.module.ts`

```javascript

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'new_database_name',
      entities: [],
      synchronize: true,
    }),
    UsersModule // importa el modulo "users"
  ],
})
export class AppModule {}
```

## Creacion de un nuevo proyecto basico

```bash
nest g mo users
```

```bash
nest g co users
```

```bash
nest g s users
```

```bash
|| nest g res users # nest generate resource users
```

## Typeorm Entidades

`/users/users.entity.ts`

```javascript
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany } from 'typeorm'
import {Profile} from './profile.entity'
import { Posts } from '../posts/post.entity'

@Entity({name: 'users'})
export class User {

  @PrimaryGeneratedColumn() 
  id: number
  
  @Column({unique: true}) 
  username: string
  
  @Column() 
  password: string
  
  @Column({type: 'datetime', default: () => 'CURRENT_TIMESTAMP'}) 
  createdAt: Date
  
  @Column({nullable: true}) 
  authStrategy: string

  @OneToOne(() => Profile) // relacion uno a uno
  @JoinColumn()
  profile: Profile

  @OneToMany(() => Posts, post => post.author) // relacion uno a muchos
  posts: Posts[]
}
```

`/posts/posts.entity.ts`

```javascript
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../users/user.entity";

@Entity('users_posts')
export class Posts {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  content: string

  @Column()
  authorId: number

  @ManyToOne(() => User, user => user.posts) // relacion muchos a uno
  author: User
}
```

## User Module

`/users/users.module.ts`

```javascript
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService] // exporta los servicios hacia el "app.module"
})
export class UsersModule {}
```

`/users/users.controller.ts`

```javascript
@Controller('users')
export class Usercontroller {

  constructor(
    private usersService: UsersService
  ) {}

  @Get('/')
  getAll() {
    return this.usersService.findAll()
  }
}
```

`/users/user.service.ts`

```javascript
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Ingectable()
export class UserService {

  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>
  ) {}

  async finAll() {
    return await this.usersRepository.find()
  }
}
```

# Transaccional Emails

### [# Brevo.com](https://app-smtp.brevo.com/real-time)

> install

```bash
npm i @getbrevo/brevo
```

`/lib/brevo.ts`

```javascript
import * as brevo from "@getbrevo/brevo";

const apiInstance = new brevo.TransactionalEmailsApi();

apiInstance.setApiKey(
  brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY as string
);

interface Params {
  subject: string;
  to: { email: string; name: string }[];
  htmlContent: string;
}

export async function sendEmail({ subject, to, htmlContent }: Params) {
  try {
    const smtpEmail = new brevo.SendSmtpEmail();
    smtpEmail.subject = subject;
    smtpEmail.to = to;
    smtpEmail.htmlContent = `<html><body>${htmlContent}</body></html>`;
    smtpEmail.sender = { name: "Fazt Tech", email: "fazt@faztweb.com" };

    await apiInstance.sendTransacEmail(smtpEmail);
  } catch (error) {
    console.error(error);
  }
}
```