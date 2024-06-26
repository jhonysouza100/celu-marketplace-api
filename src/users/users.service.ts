import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { hash } from 'bcrypt';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private authService: AuthService
  ) {} 

  async create(user: CreateUserDto) {
    
    const userFound = await this.usersRepository.findOne({ where: { email: user.email } });

    if(userFound) throw new HttpException('User already exist', HttpStatus.CONFLICT);
    
    // bcrypt
    const { password } = user;
    if(password) {
      const plainToHash = await hash(password, 10);
      user = {...user, password: plainToHash}
    }

    const newUser = this.usersRepository.create(user);

    await this.usersRepository.save(newUser);

    return await this.authService.login({email: user.email, password: user.password})

  }

  async findAll() {
    return await this.usersRepository.find({
      relations: ['profile']
    });
  }

  async findOne(id: number) {

    const userFound = await this.usersRepository.findOne({ where: {id}, relations: ['profile']});

    if(!userFound) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    
    return userFound;

  }

  async remove(id: number) {

    await this.findOne(id)

    await this.usersRepository.delete({ id });

    throw new HttpException(`User #${id} deleted successfully`, HttpStatus.OK);

  }
  
  async update(id: number, user: UpdateUserDto) {
    
    await this.findOne(id)

    // bcrypt
    const { password } = user;
    if(password) {
      const plainToHash = await hash(password, 10);
      user = {...user, password: plainToHash}
    }

    await this.usersRepository.update( {id}, user );
    
    throw new HttpException(`User #${id} updated successfully`, HttpStatus.OK);

  }

  async findUnique(user: UpdateUserDto) {
    
    const emailFound = await this.usersRepository.findOne({ where: { email: user.email } });
  
    const usernameFound = await this.usersRepository.findOne({ where: { username: user.username } });
  
    if(emailFound) throw new HttpException('Email already exist', HttpStatus.CONFLICT);
  
    else if(usernameFound) throw new HttpException('Username already exist', HttpStatus.CONFLICT);
    
  }

  async findUserByEmail(email: string) {

    const userFound = await this.usersRepository.findOne({ where: { email: email }, select: ['id','username', 'email', 'password','picture', 'role'], relations: ['profile'] });
    
    if(!userFound) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    return userFound;

  }

}