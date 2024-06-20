import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmailsService } from './emails.service';
import { CreateEmailDto } from './dto/create-email.dto';
import { UpdateEmailDto } from './dto/update-email.dto';
import { SendEmailDto } from './dto/send-email.dto';
import { ApiBody, ApiParam, ApiTags, ApiResponse, ApiOkResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiConflictResponse, ApiBadRequestResponse} from '@nestjs/swagger';

@Controller('emails')
@ApiTags('emails')
export class EmailsController {
  constructor(private readonly emailsService: EmailsService) {}
  
  @Post()
  @ApiCreatedResponse({ description: 'EMAIL_SUCCESSFULLY_CREATED'})
  @ApiBadRequestResponse({description: 'EMAIL_IS_REQUIRED'})
  @ApiConflictResponse({ description: 'EMAIL_ALREADY_EXIST'})
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
  
  @Get(':id')
  @ApiOkResponse({description: 'EMAIL_FOUND'})
  @ApiNotFoundResponse({description: 'EMAIL_NOT_FOUND'})
  @ApiParam({name: 'id', description: 'Email id'})
  findOne(@Param('id') id: string) {
    try {
      return this.emailsService.findOne(+id);
    } catch (error) {
      return error.message;
    }
  }
  
  @Patch(':id')
  @ApiCreatedResponse({description: 'EMAIL_SUCCESSFULLY_UPDATED'})
  @ApiNotFoundResponse({description: 'EMAIL_NOT_FOUND'})
  @ApiBadRequestResponse({description: 'EMAIL_IS_REQUIRED'})
  @ApiParam({name: 'id', description: 'Email id'})
  @ApiBody({ type: [UpdateEmailDto], description: 'Recibe un nuevo email en el cuerpo de la peticion' })
  update(@Param('id') id: string, @Body() updateEmailDto: UpdateEmailDto) {
    try {
      return this.emailsService.update(+id, updateEmailDto);
    } catch (error) {
      return error.message;
    }
  }
  
  @Delete(':id')
  @ApiCreatedResponse({description: 'EMAIL_SUCCESSFULLY_DELETED'})
  @ApiNotFoundResponse({description: 'EMAIL_NOT_FOUND'})
  @ApiParam({ name: 'id', description: 'Email id' })
  remove(@Param('id') id: string) {
    try {
      return this.emailsService.remove(+id);
    } catch (error) {
      return error.message;
    }
  }
  
  @Post('/send-spam')
  @ApiOkResponse({description: 'OK'})
  @ApiBadRequestResponse({description: 'REQUEST_ERROR'})
  @ApiBody({ type: [SendEmailDto], description: 'Envia emails en serie, recibe un arreglo de emails' })
  sendMamy(@Body() body: SendEmailDto) {
    try {
      return this.emailsService.sendSpam(body);
    } catch (error) {
      return error.message;
    }
  }
  
}
