import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { LoginResponseDto } from './dto/response';
import { LocalAuthGuard } from './local-auth.guard';
@Injectable()
export class AuthService {
  async login(data: any): Promise<any> {
    const { email, password } = data;
    const user = { email, firstname: 'first name', lastName: 'lastname' };
    return plainToClass(LoginResponseDto, user, {
      excludeExtraneousValues: true,
    });
  }
}
