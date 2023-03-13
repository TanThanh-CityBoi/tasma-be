import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Workspace } from 'src/workspaces/schemas';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop({ default: 'default-avt.png' })
  avatar: string;

  @Prop({ default: 1 })
  gender: number; // 1: male, 2: fermale, 3: other

  @Prop({ default: false })
  emailVerified: boolean;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Workspace' }] })
  workspaces: Array<Workspace>;

  @Prop({ default: Date.now() })
  createdAt?: Date;

  @Prop({ default: Date.now() })
  updatedAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
