import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString, Length, Max, Min } from 'class-validator';

export class CreatePostDto {

  @ApiProperty({ 
    description: 'Contenido del post (requerido, longitud entre 1 y 255 caracteres)',
    type: String,
    example: 'Este es el contenido de mi post'
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 600)
  content: string;
  
  @ApiProperty({ 
    description: 'Calificación del post (opcional, debe ser un número entero entre 1 y 5, por defecto es 5)',
    type: Number,
    example: 4
  })
  @IsInt()
  @Min(1)
  @Max(5)
  @IsOptional()
  rating?: number;
  
  @ApiProperty({ 
    description: 'ID del usuario que crea el post',
    type: Number,
    example: 1
  })
  @IsInt()
  @IsNotEmpty()
  userId: number;
}