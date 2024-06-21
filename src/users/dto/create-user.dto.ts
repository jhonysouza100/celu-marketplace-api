import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ 
    description: 'Nombre de usuario',
    type: String,
    example: 'johndoe123'
  })
  @IsNotEmpty()
  @IsString()
  username: string;
  
  @ApiProperty({ 
    description: 'Correo electrónico',
    type: String,
    example: 'johndoe@example.com'
  })
  @IsNotEmpty()
  @IsEmail()
  @Length(1, 50)
  @IsString()
  email: string;
 
  @ApiProperty({ 
    description: 'Enlace a la foto de perfil',
    type: String,
    example: 'https://jondoe.jpg'
  })
  @Length(1,255)
  @IsOptional()
  @IsString()
  picture?: string;
  
  @ApiProperty({ 
    description: 'Contraseña (opcional)',
    type: String,
    example: 'password123'
  })
  @Length(1,50)
  @IsOptional()
  @IsString()
  password?: string;
  
  @ApiProperty({ 
    description: 'Número de teléfono (opcional)',
    type: String,
    example: '+1234567890'
  })
  @Length(1,50)
  @IsOptional()
  @IsString()
  tel?: string;
  
  @ApiProperty({ 
    description: 'País (opcional)',
    type: String,
    example: 'USA'
  })
  @Length(1,50)
  @IsOptional()
  @IsString()
  pais?: string;
}
