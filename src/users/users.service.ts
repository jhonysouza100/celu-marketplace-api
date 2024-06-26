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

    if(userFound) throw new HttpException('User already exist', HttpStatus.CONFLICT);

    const newUser = this.usersRepository.create(user);

    return await this.usersRepository.save(newUser);

  }

  async findAll() {

    return await this.usersRepository.find();

  }

  async findOne(id: number) {

    const userFound = await this.usersRepository.findOne({ where: {id}});

    if(!userFound) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    
    return userFound;

  }

  async remove(id: number) {

    await this.findOne(id)

    await this.usersRepository.delete({ id });

    throw new HttpException(`User #${id} deleted successfully`, HttpStatus.OK);

  }
  
  async update(id: number, user: UpdateUserDto) {
    
    await this.findOne(id)

    await this.usersRepository.update( {id}, user );
    
    throw new HttpException(`User #${id} updated successfully`, HttpStatus.OK);

  }
}