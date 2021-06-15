import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types, Schema as MongooseSchema } from "mongoose";

@Schema()
export class Comments extends Document {
  @Prop({ type: String, required: true })
  text: string;
  user: {
    name: string;
    profileImage: string;
    id: string;
  };
}

export const CommentsSchema = SchemaFactory.createForClass(Comments);
