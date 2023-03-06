import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto';
import { SignUpDto } from './dto/sign-up.dto';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  public login(@Request() req): LoginDto {
    return req.user;
  }

  @Post('sign-up')
  public async signUp(@Body() body: SignUpDto) {
    return await this.authService.signUp(body);
  }
}
