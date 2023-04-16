import { Body, Controller, Post } from '@nestjs/common';

import { _response } from '@utils/function';
import { AuthService } from './auth.service';
import { CreateUserDto, GoogleLoginDto, LoginDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  public async login(@Body() body: LoginDto) {
    const result = await this.authService.login(body);
    return _response({ data: result, message: 'Loggin successfully' });
  }

  @Post('sign-up')
  public async signUp(@Body() body: CreateUserDto) {
    const result = await this.authService.signUp(body);
    return _response({ data: result, message: 'Register successfully' });
  }

  @Post('google-login')
  public async googleLogin(@Body() body: GoogleLoginDto) {
    const result = await this.authService.loginWithGoogle(body);
    return _response({ data: result, message: 'Login successfully' });
  }
}
