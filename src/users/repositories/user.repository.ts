import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/base.repository';
import { UserDocument } from '../schemas/user.schema';

export class UserRepository extends BaseRepository<UserDocument> {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<UserDocument>,
  ) {
    super(userModel);
  }
}
