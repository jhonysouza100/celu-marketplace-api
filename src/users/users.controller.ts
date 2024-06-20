import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { ApiBody, ApiParam, ApiTags, ApiResponse, ApiOkResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiConflictResponse, ApiBadRequestResponse} from '@nestjs/swagger';


@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiCreatedResponse({ description: 'USER_SUCCESSFULLY_CREATED'})
  @ApiBadRequestResponse({description: 'A_PARAMETER_IS_MISSING'})
  @ApiConflictResponse({ description: 'USER_ALREADY_EXIST'})
  @ApiBody({ type: [CreateUserDto], description: 'Recibe una direccion de email' })
  create(@Body() createUserDto: CreateUserDto) {

    try {
      return this.usersService.create(createUserDto);
    } catch (error) {
      return error.message;
    }

  }

  // ====== CMS USER ======
  @Get()
  @ApiOkResponse({description: 'OK'})
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
