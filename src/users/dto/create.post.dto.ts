import { IsNotEmpty, IsOptional, IsInt, Min, Max, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {

  @ApiProperty({ 
    description: 'ID del usuario que crea el post',
    type: Number,
    example: 1
  })
  @IsNotEmpty()
  userId: number; // Id del usuario que crea el post
  
  @ApiProperty({ 
    description: 'Contenido del post (requerido, longitud entre 1 y 255 caracteres)',
    type: String,
    example: 'Este es el contenido de mi post'
  })
  @IsNotEmpty()
  @Length(1, 255)
  content: string;
  
  @ApiProperty({ 
    description: 'Calificación del post (opcional, debe ser un número entero entre 1 y 5)',
    type: Number,
    example: 4
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  rating?: number;
  
}
