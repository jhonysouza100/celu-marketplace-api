import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateProfileDto {

  @ApiProperty({ 
    description: 'Primer nombre del usuario',
    type: String,
    example: 'john'
  })
  @IsString()
  @IsNotEmpty()
  firstname: string;
  
  @ApiProperty({
    description: 'Apellido del usuario',
    type: String,
    example: 'doe'
  })
  @IsString()
  @IsNotEmpty()
  lastname: string;
  
  @ApiProperty({
    description: 'Edad del usuario',
    type: Number,
    example: 25
  })
  @IsNumber()
  @IsNotEmpty()
  age: number;
  
  @ApiProperty({
    description: 'Nacionalidad del usuario',
    type: String,
    example: 'US'
  })
  @IsString()
  @IsNotEmpty()
  nacionality: string;

}
