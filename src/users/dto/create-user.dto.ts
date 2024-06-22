import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty, IsOptional, Length } from 'class-validator';

export class CreateUserDto {

  @ApiProperty({ 
    description: 'Nombre de usuario',
    type: String,
    example: 'johndoe123'
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
  @Length(1, 50)
  email: string;
  
  @ApiProperty({ 
    description: 'Enlace a la foto de perfil (opcional)',
    type: String,
    example: 'https://jondoe.jpg'
  })
  @IsString()
  @IsOptional()
  picture?: string;
  
  @ApiProperty({ 
    description: 'Contraseña (opcional)',
    type: String,
    example: 'password123'
  })
  @IsString()
  @IsOptional()
  @Length(1, 12)
  password?: string;
  
}
