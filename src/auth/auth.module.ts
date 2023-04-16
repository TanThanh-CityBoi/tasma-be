import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/users/user.module';

@Module({
  imports: [PassportModule, UserModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, JwtService],
})
export class AuthModule {}
