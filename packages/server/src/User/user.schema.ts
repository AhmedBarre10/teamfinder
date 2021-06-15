import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ type: String, required: true, unique: true })
  name: string;
  @Prop({ type: String, required: true, unique: true })
  email: string;
  @Prop({ type: String, required: true })
  password: string;
  @Prop({ tpye: String, required: true, default: 'none' })
  profileImage: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
