import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { ThrottlerBehindProxyGuard } from './trottler.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseGuards(ThrottlerBehindProxyGuard)
  getHello(@Request() req) {
    return this.appService.getHello(req.ip);
  }
}
