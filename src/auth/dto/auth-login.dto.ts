import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class AuthLoginDto {
  
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

  @ApiProperty({ 
    description: 'Contraseña del usuario',
    type: String,
    example: '123abc'
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 12)
  password: string;

  
}