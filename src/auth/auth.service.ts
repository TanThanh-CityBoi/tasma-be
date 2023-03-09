import { Injectable } from '@nestjs/common';
import { isEmpty } from 'lodash';
import { UserService } from 'src/users/user.service';
import { response, transformData } from 'src/utils';
import { LoginDto, SignUpDto } from './dto';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from 'src/config.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly config: ConfigService,
  ) {}
  async login(data: any) {
    const { email } = data;
    if (!email) return response(400, 'Incorrect email or password');
    const user = await this.userService.getUser({ email });
    if (isEmpty(user)) {
      return response(400, 'Incorrect email or password');
    }
    const accessToken = this.jwtService.sign(
      {
        userId: user._id,
      },
      {
        secret: this.config.get('JWT_SECRET'),
        expiresIn: this.config.get('TOKEN_EXPTIME'),
      },
    );
    return transformData(LoginDto, { user, accessToken });
  }

  async signUp(data: any) {
    try {
      const { email, firstName, lastName, gender, password, confirmPassword } =
        data;
      if (password != confirmPassword) {
        return response(400, 'Password and ConfirmPassword does not match');
      }
      const existedUser = await this.userService.getUser({ email });
      if (!isEmpty(existedUser)) {
        return response(400, 'Email have already used');
      }
      const newUser = new User();
      newUser.email = email;
      newUser.firstName = firstName;
      newUser.lastName = lastName;
      newUser.password = bcrypt.hashSync(password, 10);
      newUser.gender = gender;

      const result = await this.userService.createUser(newUser);
      return transformData(SignUpDto, result);
    } catch (error) {
      return response(500, 'INTERNAL_SERVER_ERROR', null, error);
    }
  }
}
