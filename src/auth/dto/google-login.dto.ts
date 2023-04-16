import { IsNotEmpty } from 'class-validator';

export class GoogleLoginDto {
  @IsNotEmpty({ message: "You don't have access to this service" })
  googleAccessToken: string;
}
