import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';

@Controller('profile')
@ApiTags('Profile')
@ApiBearerAuth()
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post('/:id')
  @ApiParam({name: 'id', description: 'User id'})
  @ApiBody({ type: [CreateProfileDto], description: 'Recibe un objeto con el perfil del usuario' })
  create(@Param('id', ParseIntPipe) id:number, @Body() profile: CreateProfileDto) {
    try {
      return this.profileService.create(id, profile);
    } catch (error) {
      return error.message;
    }
  }

  @Get()
  findAll() {
    return this.profileService.findAll();
  }

  @Get(':id')
  @ApiParam({name: 'id', description: 'Profile Id'})
  findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      return this.profileService.findOne(+id)
    } catch (error) {
      return error.message;
    };
  }
  
  @Delete(':id')
  @ApiParam({name: 'id', description: 'Profile Id'})
  remove(@Param('id', ParseIntPipe) id: number) {
    try {
      return this.profileService.remove(+id);
    } catch (error) {
      return error.message;
    }
  }
  
  @Patch(':id')
  @ApiParam({name: 'id', description: 'Profile Id'})
  @ApiBody({type: [UpdateProfileDto], description: 'Recibe un objeto con el (nuevo) perfil del usuario'})
  update(@Param('id', ParseIntPipe) id: number, @Body() profile: UpdateProfileDto) {
    try {
      return this.profileService.update(+id, profile);
    } catch (error) {
      return error.message;
    }
  }
}
