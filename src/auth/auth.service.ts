import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { LoginResponseDto } from './dto/response';

@Injectable()
export class AuthService {
  async login(data: any): Promise<any> {
    const { email } = data;
    const user = { email, firstname: 'first name', lastName: 'lastname' };
    return plainToClass(LoginResponseDto, user, {
      excludeExtraneousValues: true,
    });
  }
}
