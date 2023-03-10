import { Expose, Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import { isEmpty } from 'lodash';

export class SignUpRes {
  @Expose()
  _id: string;

  @IsEmail({}, { message: 'Invalid email' })
  @IsNotEmpty()
  @Expose()
  email: string;

  @IsNotEmpty()
  @Length(6, 20, {
    message: 'Password must be bettween 6 and 20 character',
  })
  password: string;

  @IsNotEmpty()
  confirmPassword: string;

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
