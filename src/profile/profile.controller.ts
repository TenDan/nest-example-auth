import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { Controller, Get, Request, UseGuards } from '@nestjs/common';

@Controller('profile')
export class ProfileController {

  @UseGuards(JwtAuthGuard)
  @Get()
  getProfile(@Request() req) {
    return req.user;
  }
}
