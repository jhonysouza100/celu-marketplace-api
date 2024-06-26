import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateProfileDto } from './create-profile.dto';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateProfileDto extends PartialType(CreateProfileDto) {

  @ApiProperty({ 
    description: 'Primer nombre del usuario (opcional)',
    type: String,
    example: 'john'
  })
  @IsString()
  @IsOptional()
  firstname?: string;
  
  @ApiProperty({
    description: 'Apellido del usuario (opcional)',
    type: String,
    example: 'doe'
  })
  @IsString()
  @IsOptional()
  lastname?: string;
  
  @ApiProperty({
    description: 'Edad del usuario (opcional)',
    type: Number,
    example: 25
  })
  @IsNumber()
  @IsOptional()
  age?: number;
  
  @ApiProperty({
    description: 'Nacionalidad del usuario (opcional)',
    type: String,
    example: 'US'
  })
  @IsString()
  @IsOptional()
  nacionality?: string;

}
