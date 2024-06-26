import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('Users')
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiBody({ type: [CreateUserDto], description: 'Recibe un objeto usuario' })
  create(@Body() user: CreateUserDto) {
    try {
      return this.usersService.create(user);
    } catch (error) {
      return error.message;
    }
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('/:id')
  @ApiParam({name: 'id', description: 'User id'})
  findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      return this.usersService.findOne(id);
    } catch (error) {
      return error.message;
    }
  }

  @Delete('/:id')
  @ApiParam({ name: 'id', description: 'User id' })
  remove(@Param('id', ParseIntPipe) id: number) {
    try {
      return this.usersService.remove(id);
    } catch (error) {
      return error.message;
    }
  }

  @Patch(':id')
  @ApiParam({name: 'id', description: 'User id'})
  @ApiBody({ type: [UpdateUserDto], description: 'Recibe un nuevo user en el cuerpo de la peticion' })
  update(@Param('id', ParseIntPipe) id: number, @Body() user: UpdateUserDto ) {
    try {
      return this.usersService.update(id, user);
    } catch (error) {
      return error.message;
    }
  }

  @Post('/suscribe')
  @ApiBody({ type: [CreateUserDto], description: 'Recibe un objeto usuario' })
  suscribe(@Body() user: CreateUserDto) {
    try {
      return this.usersService.suscribe(user);
    } catch (error) {
      return error.message;
    }
  }

}
