import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString, Length } from "class-validator";

export class CreateUserDto {
  
  @ApiProperty({ 
    description: 'Nombre de usuario',
    type: String,
    example: 'johndoe123'
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
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
  
  @ApiProperty({ 
    description: 'Contraseña (opcional)',
    type: String,
    example: 'password123'
  })
  @IsString()
  @IsOptional()
  @Length(1, 12)
  password?: string;

  @ApiProperty({ 
    description: 'Enlace a la foto de perfil (opcional)',
    type: String,
    example: 'https://jondoe.jpg'
  })
  @IsString()
  @IsOptional()
  picture?: string;

}
