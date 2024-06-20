import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>
  ) {}

  async create(user: CreateUserDto) {

    const userFound = await this.usersRepository.findOneBy(user)

    if(userFound) throw new HttpException('USER_ALREADY_EXIST', HttpStatus.CONFLICT)

    const newUser = this.usersRepository.create(user)

    return await this.usersRepository.save(newUser)
  }

  async findAll() {
    return await this.usersRepository.find()
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
