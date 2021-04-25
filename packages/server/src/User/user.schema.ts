import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ type: String, required: true, unique: true })
  name: {
    type: String;
    unique: true;
    required: true;
  };
  @Prop({ type: String, required: true, unique: true })
  email;
  @Prop({ type: String, required: true })
  password;
}

export const UserSchema = SchemaFactory.createForClass(User);
