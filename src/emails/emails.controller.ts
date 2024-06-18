import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmailsService } from './emails.service';
import { CreateEmailDto } from './dto/create-email.dto';
import { UpdateEmailDto } from './dto/update-email.dto';
import { SendEmailDto } from './dto/send-email.dto';

@Controller('emails')
export class EmailsController {
  constructor(private readonly emailsService: EmailsService) {}

  @Post()
  create(@Body() email: CreateEmailDto) {
    try {
      return this.emailsService.create(email);
    } catch (error) {
      return error.message;
    }
  }

  @Get()
  findAll() {
    return this.emailsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.emailsService.findOne(+id);
    } catch (error) {
      return error.message;
    }
  }
  
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmailDto: UpdateEmailDto) {
    try {
      return this.emailsService.update(+id, updateEmailDto);
    } catch (error) {
      return error.message;
    }
  }
  
  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.emailsService.remove(+id);
    } catch (error) {
      return error.message;
    }
  }

  // ====== CMS ======
  @Post('/send-spam')
  sendMamy(@Body() body: SendEmailDto) {
    try {
      return this.emailsService.sendSpam(body);
    } catch (error) {
      return error.message;
    }
  }

}
