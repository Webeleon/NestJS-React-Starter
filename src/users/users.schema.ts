import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  username: string;

  @Prop()
  email: string;

  @Prop()
  passwordHash: string;

  @Prop()
  passwordSalt: string;
}

export interface SafeUser {
  username: string;
  email: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
export const USER_MODEL_NAME = 'Users';
