import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateEmailDto } from './dto/create-email.dto';
import { UpdateEmailDto } from './dto/update-email.dto';
import { Email } from './entities/email.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SendEmailDto } from './dto/send-email.dto';

@Injectable()
export class EmailsService {

  constructor(
    @InjectRepository(Email) private emailsRepository: Repository<Email>
  ) {}

  async create(email: CreateEmailDto) {

    const emailFound = await this.emailsRepository.findOneBy(email)

    if(emailFound) throw new HttpException('EMAIL_ALREADY_EXIST', HttpStatus.CONFLICT)

    const newEmail = this.emailsRepository.create(email)

    return await this.emailsRepository.save(newEmail)
  }

  async findAll() {
    return await this.emailsRepository.find()
  }

  async findOne(id: number) {
    
    const emailFound = await this.emailsRepository.findOne({ where: {id}})

    if(!emailFound) throw new HttpException('EMAIL_NOT_FOUND', HttpStatus.NOT_FOUND)
    
    return emailFound
  }

  update(id: number, updateEmailDto: UpdateEmailDto) {
    return `This action updates a #${id} email`;
  }

  remove(id: number) {
    return `This action removes a #${id} email`;
  }

  // ====== CMS ======
  async sendSpam(body: SendEmailDto) {
    return body
  }
}
