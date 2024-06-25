import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity.js';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class PostsService {

  constructor( 
    @InjectRepository(Post) private postsRepository: Repository<Post>,
    @InjectRepository(User) private usersRepository: Repository<User>
  ) {}

    
  async create(post: CreatePostDto) {
    
    const userFound = await this.usersRepository.findOne({ where: { id: post.userId } });

    if(!userFound) return new HttpException('USER_NOT_FOUND', HttpStatus.NOT_FOUND)

      const newPost = new Post();
      newPost.content = post.content;
      newPost.rating = post.rating;
      newPost.userId = userFound;
    
    // const newPost = this.postsRepository.create(post)
  
    return await this.postsRepository.save(newPost)
    
  }
  
  async findAll() {
    return await this.postsRepository.find()
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, post: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}