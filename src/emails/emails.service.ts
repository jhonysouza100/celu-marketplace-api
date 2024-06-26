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

  constructor(@InjectRepository(Email) private emailsRepository: Repository<Email>) {}

  async create(email: CreateEmailDto) {

    const emailFound = await this.emailsRepository.findOneBy(email);

    if(emailFound) throw new HttpException('Email already exist', HttpStatus.CONFLICT);

    const newEmail = this.emailsRepository.create(email);

    return await this.emailsRepository.save(newEmail);

  }

  async findAll() {

    return await this.emailsRepository.find()

  }

  async findOne(id: number) {
    
    const emailFound = await this.emailsRepository.findOne({ where: {id}})

    if(!emailFound) throw new HttpException('Email not found', HttpStatus.NOT_FOUND)
    
    return emailFound
  }

  async remove(id: number) {
    
    await this.findOne(id);

    this.emailsRepository.delete({ id });

    throw new HttpException(`Email #${id} deleted successfully`, HttpStatus.OK);
    
  }
  
  async update(id: number, email: CreateEmailDto) {
    
    await this.findOne(id)
    
    await this.emailsRepository.update({id}, email)
    
    throw new HttpException(`Email #${id} updated successfully`, HttpStatus.OK);

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
