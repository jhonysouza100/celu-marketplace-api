import { ApiProperty } from '@nestjs/swagger';

export class SendEmailDto {

  @ApiProperty({
    description: 'Asunto',
    type: String,
    example: 'Asunto del email'
  })
  subject: string;
  
  @ApiProperty({
    description: 'Lista de destinatarios con sus correos electrónicos y nombres',
    type: [{ 
      email: { type: 'string', example: 'destinatario@correo.com' },
      name: { type: 'string', example: 'Nombre del Destinatario' }
    }]
  })
  to: { email: string; name: string }[];
  
  
  @ApiProperty({
    description: 'Cuerpo HTML del email',
    type: String,
    example: '<h3>Hola Mundo</h3>'
  })
  htmlContent: string;
  
  @ApiProperty({
    description: 'Información del remitente del email',
    type: {
      name: { type: 'string', example: 'Nombre del Remitente' },
      email: { type: 'string', example: 'remitente@correo.com' }
    }
  })
  sender: { name: string; email: string }
  
}
