import { IsEmail, IsNotEmpty, IsOptional, Length } from 'class-validator';

export class CreateUserDto {
  @IsEmail({}, { message: 'Invalid email' })
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @Length(6, 20, {
    message: 'Password must be bettween 6 and 20 character',
  })
  password: string;

  @IsNotEmpty()
  confirmPassword: string;

  @IsOptional()
  firstName: string;

  @IsOptional()
  lastName: string;

  @IsOptional()
  gender: string;
}
