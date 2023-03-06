import { Expose, Transform } from 'class-transformer';
import { isEmpty } from 'lodash';

export class LoginDto {
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
}
