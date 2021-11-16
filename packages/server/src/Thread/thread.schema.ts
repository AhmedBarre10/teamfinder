import {
  Prop,
  Schema as SchemaAnnotation,
  SchemaFactory,
} from "@nestjs/mongoose";
import { Document, Types, Schema } from "mongoose";

@SchemaAnnotation()
export class Thread extends Document {
  @Prop({ type: Schema.Types.ObjectId, ref: "User", required: true })
  sender: Schema.Types.ObjectId;
  @Prop({ type: String })
  msg: { type: string; required: true };
  @Prop({ type: Date })
  date: { type: Date };
}

export const ThreadSchema = SchemaFactory.createForClass(Thread);
