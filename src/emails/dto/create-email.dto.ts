import { ApiProperty } from '@nestjs/swagger';

export class CreateEmailDto {
  @ApiProperty({ 
    description: 'Una direccion de email',
    type: String,
    example: 'ejemplo@correo.com'
  })
  email: string;
}
