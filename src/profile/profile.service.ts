import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ProfileService {

  constructor(
    @InjectRepository(Profile) private profileRepositoy: Repository<Profile>,
    private usersSevice: UsersService) {}

  async create(id: number, profile: CreateProfileDto) {
    
    const userFound = await this.usersSevice.findOne(id);

    const newProfile = this.profileRepositoy.create(profile);

    const savedProfile = await this.profileRepositoy.save(newProfile);

    userFound.profile = savedProfile;
    
    return this.usersSevice.update(id, userFound);

  }

  async findAll() {

    return await this.profileRepositoy.find();

  }

  async findOne(id: number) {
    
    const profileFound = await this.profileRepositoy.findOne({ where: { id: id } });

    if(!profileFound) throw new HttpException("No profile found", HttpStatus.NOT_FOUND);
    
    return profileFound;

  }
  
  async remove(id: number) {
    
    await this.findOne(id)
    
    await this.profileRepositoy.delete({id});
    
    throw new HttpException(`Profile #${id} deleted successfully`, HttpStatus.OK)
    
  }
  
  async update(id: number, profile: UpdateProfileDto) {
    
    await this.findOne(id)

    await this.profileRepositoy.update({id}, profile)

    throw new HttpException(`Profile #${id} updated successfully`, HttpStatus.OK);

  }

}
