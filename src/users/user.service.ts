import { Injectable } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { User } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  async createUser(data: User) {
    try {
      const { email, firstName, lastName, password } = data;
      const newUser = await this.userRepository.create({
        email,
        firstName,
        lastName,
        password,
      });
      return newUser;
    } catch (error) {
      throw Error(error);
    }
  }

  async getUser(condition: any) {
    return await this.userRepository.findOne(condition);
  }
}
