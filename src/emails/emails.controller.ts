import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { EmailsService } from './emails.service';
import { CreateEmailDto } from './dto/create-email.dto';
import { SendEmailDto } from './dto/send-email.dto';
import { ApiBody, ApiParam, ApiTags, ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';

@Controller('emails')
@ApiTags('Emails')
@ApiBearerAuth()
export class EmailsController {
  constructor(private readonly emailsService: EmailsService) {}
  
  @Post()
  @ApiBody({ type: [CreateEmailDto], description: 'Recibe una direccion de email' })
  create(@Body() email: CreateEmailDto) {
    try {
      return this.emailsService.create(email);
    } catch (error) {
      return error.message;
    }
  }
  
  // ====== CMS USER ======
  @Get()
  @ApiOkResponse({description: 'OK'})
  findAll() {
    return this.emailsService.findAll();
  }
  
  @Get('/:id')
  @ApiParam({name: 'id', description: 'Email id'})
  findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      return this.emailsService.findOne(id);
    } catch (error) {
      return error.message;
    }
  }
    
  @Delete('/:id')
  @ApiParam({ name: 'id', description: 'Email id' })
  remove(@Param('id', ParseIntPipe) id: number) {
    try {
      return this.emailsService.remove(id);
    } catch (error) {
      return error.message;
    }
  }
  
  @Patch(':id')
  @ApiParam({name: 'id', description: 'Email id'})
  @ApiBody({ type: [CreateEmailDto], description: 'Recibe un nuevo email en el cuerpo de la peticion' })
  update(@Param('id', ParseIntPipe) id: number, @Body() email: CreateEmailDto ) {
    try {
      return this.emailsService.update(id, email);
    } catch (error) {
      return error.message;
    }
  }
  
  @Post('/send-email')
  @ApiBody({ type: [SendEmailDto], description: 'Envia emails en serie, recibe un arreglo de emails' })
  sendEmail(@Body() body: SendEmailDto) {
    try {
      return this.emailsService.sendEmail(body);
    } catch (error) {
      return error.message;
    }
  }
  
}
