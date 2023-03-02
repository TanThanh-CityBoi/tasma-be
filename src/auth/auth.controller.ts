import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { LoginResponseDto } from './dto/response';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  @UseGuards(LocalAuthGuard)
  @Post('login')
  public login(@Request() req): LoginResponseDto {
    return req.user;
  }
}
