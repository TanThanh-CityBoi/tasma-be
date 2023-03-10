import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, GoogleLoginDto, LoginRes, SignUpRes } from './dto';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  public login(@Request() req): Promise<LoginRes> {
    return req.user;
  }

  @Post('sign-up')
  public async signUp(@Body() body: CreateUserDto): Promise<SignUpRes> {
    return await this.authService.signUp(body);
  }

  @Post('google-login')
  public async googleLogin(@Body() body: GoogleLoginDto): Promise<LoginRes> {
    return await this.authService.loginWithGoogle(body);
  }
}
