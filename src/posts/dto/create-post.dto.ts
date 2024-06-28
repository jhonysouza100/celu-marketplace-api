import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString, Length, MAX, Max, Min } from "class-validator";

export class CreatePostDto {

  @ApiProperty({
    description: 'El contenido del post',
    type: String,
    example: 'Este es el contenido del post'
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 600)
  content: string;

  @ApiProperty({
    description: 'La calificación del post 1-5 (opcional)',
    type: Number,
    example: 4
  })
  @IsNumber()
  @IsOptional()
  @Min(1)
  @Max(5)
  rating?: number;

}
