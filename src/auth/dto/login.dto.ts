import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'Invalid email' })
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @Length(6, 20, {
    message: 'Password must be bettween 6 and 20 character',
  })
  password: string;
}
