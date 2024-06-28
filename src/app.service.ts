import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  getHello(clientIp: string) {

    return {message: `Hello World! Your IP is: ${clientIp}`, ip: clientIp}

  }

}


