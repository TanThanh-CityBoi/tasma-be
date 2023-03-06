import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { isEmpty } from 'lodash';
import { UserService } from 'src/users/user.service';
import { response, transformer } from 'src/utils';
import { LoginDto, SignUpDto } from './dto';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
  async login(data: any) {
    const { email } = data;
    const user = { email, firstname: 'first name', lastName: 'lastname' };
    return plainToClass(LoginDto, user, {
      excludeExtraneousValues: true,
    });
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
      return transformer(SignUpDto, result);
    } catch (error) {
      return response(500, 'INTERNAL_SERVER_ERROR', null, error);
    }
  }
}
