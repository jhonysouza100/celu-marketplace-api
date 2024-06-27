import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class AuthSuscribeDto {
  
  @ApiProperty({ 
    description: 'Nombre del usuario',
    type: String,
    example: 'john'
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ 
    description: 'Correo electrónico',
    type: String,
    example: 'johndoe@example.com'
  })
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  @Length(1, 320)
  email: string;
  
}

