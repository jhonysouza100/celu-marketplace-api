import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';

@Controller('posts')
@ApiTags('Posts')
@ApiBearerAuth()
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @ApiBody({type: [CreatePostDto], description: 'Resibe un objeto post'})
  create(@Body() post: CreatePostDto) {
    try {
      return this.postsService.create(post);
    } catch (error) {
      return error.message;
    }
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  @ApiParam({name: 'id', description: 'Post id'})
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.findOne(+id);
  }
  
  @Delete(':id')
  @ApiParam({name: 'id', description: 'Post id'})
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.remove(+id);
  }
  
  @Patch(':id')
  @ApiParam({name: 'id', description: 'Post id'})
  @ApiBody({type: [UpdatePostDto], description: 'Resibe un nuevo objeto post'})
  update(@Param('id', ParseIntPipe) id: number, @Body() post: UpdatePostDto) {
    return this.postsService.update(+id, post);
  }
}
