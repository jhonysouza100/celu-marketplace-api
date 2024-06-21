import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ 
    description: 'Nombre de usuario',
    type: String,
    example: 'johndoe123'
  })
  username: string;
  
  @ApiProperty({ 
    description: 'Correo electrónico',
    type: String,
    example: 'johndoe@example.com'
  })
  email: string;
 
  @ApiProperty({ 
    description: 'Enlace a la foto de perfil',
    type: String,
    example: 'https://jondoe.jpg'
  })
  picture?: string;
  
  @ApiProperty({ 
    description: 'Contraseña (opcional)',
    type: String,
    example: 'password123'
  })
  password?: string;

  @ApiProperty({ 
    description: 'Número de teléfono (opcional)',
    type: String,
    example: '+1234567890'
  })
  tel?: string;

  @ApiProperty({ 
    description: 'País (opcional)',
    type: String,
    example: 'USA'
  })
  pais?: string;
}
