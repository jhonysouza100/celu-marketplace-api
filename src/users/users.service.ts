import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {

  constructor(@InjectRepository(User) private usersRepository: Repository<User>) {} 

  async create(user: CreateUserDto) {
    
    const userFound = await this.usersRepository.findOne({ where: { email: user.email } });

    if(userFound) throw new HttpException('USER_ALREADY_EXIST', HttpStatus.CONFLICT)

    const newUser = this.usersRepository.create(user)

    return await this.usersRepository.save(newUser)

  }

  async findAll() {
    return await this.usersRepository.find();
  }

  async findOne(id: number) {

    const userFound = await this.usersRepository.findOne({ where: {id}})

    if(!userFound) throw new HttpException('USER_NOT_FOUND', HttpStatus.NOT_FOUND)
    
    return userFound
  }

  remove(id: number) {

    const userFound = this.usersRepository.findOne({ where: {id} });
    
    if(!userFound) throw new HttpException('USER_NOT_FOUND', HttpStatus.NOT_FOUND)

    this.usersRepository.delete({ id });

    return userFound;
  }

  update(id: number, user: UpdateUserDto) {
    
    const userFound = this.usersRepository.findOne({where: {id: id}});

    if(!userFound) throw new HttpException('USER NOT FOUND', HttpStatus.NOT_FOUND);

    return this.usersRepository.update( {id}, user );
  }
}