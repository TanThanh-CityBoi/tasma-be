import { Expose, Transform } from 'class-transformer';
import { isEmpty } from 'lodash';

export class UserDto {
  @Expose()
  _id: string;

  @Expose()
  email: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  @Transform(({ obj }) =>
    isEmpty(obj.firstName && obj.lastName)
      ? null
      : `${obj.firstName} ${obj.lastName}`,
  )
  fullName: string;

  @Expose()
  gender: string;

  @Expose()
  avatar: string;

  @Expose()
  emailVerified: boolean;

  @Expose()
  createdAt: string;

  @Expose()
  updatedAt: string;
}
