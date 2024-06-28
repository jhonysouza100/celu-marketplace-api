import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class PostsService {

  constructor(
    @InjectRepository(Post) private postsRepository: Repository<Post>,
    private usersService: UsersService
  ) {}

  async create(id: number, post: CreatePostDto) {
    
    await this.usersService.findOne(id)

    post.userId = id

    const newPost = this.postsRepository.create(post)

    await this.postsRepository.save(newPost);

  }

  async findAll() {
    return await this.postsRepository.find({
      relations: ['user']
    });
  }

  async findOne(id: number) {
    
    const postFound = await this.postsRepository.findOne({where: {id: id}, relations: ['user']})

    if(!postFound) throw new HttpException('Post not found', HttpStatus.NOT_FOUND);

    return postFound;

  }
  
  async remove(id: number) {
    
    await this.findOne(id);

    await this.postsRepository.delete({id});

    throw new HttpException(`Post #${id} deleted successfully`, HttpStatus.OK);

  }

  async update(id: number, post: UpdatePostDto) {
    
    await this.findOne(id);

    await this.postsRepository.update({id}, post)

    throw new HttpException(`Post #${id} update successfully`, HttpStatus.OK);

  }
}
