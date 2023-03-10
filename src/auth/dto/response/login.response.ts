import { Expose, Type } from 'class-transformer';
import { UserDto } from './user.dto';

export class LoginRes {
  @Type(() => UserDto)
  @Expose()
  userInfo: UserDto;

  @Expose()
  accessToken: string;
}
