import { Injectable } from '@nestjs/common';
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
    
    // return this.usersSevice.update(id, userFound);

    return this.usersSevice.createProfile(userFound);
  }

  findAll() {
    return `This action returns all profile`;
  }

  findOne(id: number) {
    return `This action returns a #${id} profile`;
  }

  update(id: number, profile: UpdateProfileDto) {
    return `This action updates a #${id} profile`;
  }

  remove(id: number) {
    return `This action removes a #${id} profile`;
  }
}
