import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ 
    description: 'Nombre de usuario (opcional)',
    type: String,
    example: 'johndoe123'
  })
  @IsString()
  @IsOptional()
  username?: string;

  @ApiProperty({ 
    description: 'Correo electrónico (opcional)',
    type: String,
    example: 'johndoe@example.com'
  })
  @IsEmail()
  @IsString()
  @IsOptional()
  @Length(1, 320)
  email?: string;
  
}
