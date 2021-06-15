import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class Thread extends Document {
  @Prop({ type: String, required: true })
  title: string;
  @Prop({ type: String, required: true })
  body: string;
  @Prop({ type: Object, required: true })
  user: {
    name: string;
    profileImage: string;
    id: string;
  };

  @Prop({ type: String, required: true })
  image: string;

  @Prop({ type: Array })
  comments: [];

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  author: MongooseSchema.Types.ObjectId;
}

export const ThreadSchema = SchemaFactory.createForClass(Thread);
