import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateEmailDto } from './dto/create-email.dto';
import { Email } from './entities/email.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SendEmailDto } from './dto/send-email.dto';
import config from '../config'
import * as brevo from "@getbrevo/brevo";

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

  async remove(id: number) {
    
    const emailFound = this.emailsRepository.findOne({ where: {id} });
    
    if(!emailFound) throw new HttpException('EMAIL_NOT_FOUND', HttpStatus.NOT_FOUND)

    this.emailsRepository.delete({ id });

    return emailFound;
  }

  async update(id: number, email: CreateEmailDto) {
    
    const emailFound = this.emailsRepository.findOne({ where: {id} });
    
    if(!emailFound) throw new HttpException('EMAIL_NOT_FOUND', HttpStatus.NOT_FOUND);

    return this.emailsRepository.update({id}, email)
      
  }

  async sendEmail({ subject, to, htmlContent, sender }: SendEmailDto) {
    
    const apiInstance = new brevo.TransactionalEmailsApi();

    apiInstance.setApiKey(
      brevo.TransactionalEmailsApiApiKeys.apiKey,
      config.BREVO_API_KEY as string
    );

    try {
      const smtpEmail = new brevo.SendSmtpEmail();
      smtpEmail.subject = subject;
      smtpEmail.to = to;
      smtpEmail.htmlContent = `<html><body>${htmlContent}</body></html>`;
      smtpEmail.sender = sender;
  
      await apiInstance.sendTransacEmail(smtpEmail);
    } catch (error) {
      console.error(error);
    }
  }
}
