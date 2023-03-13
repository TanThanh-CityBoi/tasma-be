import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/users/schemas';

export type WorkspaceDocument = HydratedDocument<Workspace>;

@Schema()
export class Workspace {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Issue' }] })
  issues: [];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Setting' })
  settings: {};

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  members: Array<User>;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  host: User;

  @Prop({ default: 'default.png' })
  avata: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Channel' }] })
  channels: [];

  @Prop({ default: Date.now() })
  createdAt?: Date;

  @Prop({ default: Date.now() })
  updatedAt?: Date;
}

export const WorkspaceSchema = SchemaFactory.createForClass(Workspace);
