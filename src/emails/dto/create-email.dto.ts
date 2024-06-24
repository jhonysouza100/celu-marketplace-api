import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateEmailDto {
  @ApiProperty({ 
    description: 'Una direccion de email',
    type: String,
    example: 'ejemplo@correo.com'
  })
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  @Length(1, 320)
  email: string;
}
