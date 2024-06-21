import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreatePostDto } from './dto/create.post.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Post } from './entities/post.entity';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Post) private postsRepository: Repository<Post>
  ) {}

  async create(user: CreateUserDto) {

    const userFound = await this.usersRepository.findOne({ where: { email: user.email } });

    if(userFound) throw new HttpException('USER_ALREADY_EXIST', HttpStatus.CONFLICT)

    const newUser = this.usersRepository.create(user)

    return await this.usersRepository.save(newUser)
  }
  
  // POST ↓↓↓
  async createPost(post: CreatePostDto) {
    
    const newPost = this.postsRepository.create(post)
  
    return await this.postsRepository.save(newPost)

  }

  async findAllPosts() {
    return await this.postsRepository.find()
  }
  // POST ↑↑↑

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
