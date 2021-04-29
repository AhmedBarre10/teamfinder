import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { truncate } from 'fs/promises';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';
import { User } from '../User/user.schema';
@Schema()
export class Playercards extends Document {
  @Prop({ type: String, required: true })
  PlayerId: string;

  @Prop({ type: String, required: true })
  Overall: string;
  @Prop({ type: String, required: true })
  Winpercentage: {
    type: String;
    required: true;
  };
  @Prop({ type: String, required: true })
  Rep: {
    type: String;
    required: true;
  };
  @Prop({ type: String, required: true })
  Position: {
    type: String;
    required: true;
  };
  @Prop({ type: String, required: true })
  System: {
    type: String;
    required: true;
  };
  @Prop({ type: String, required: true })
  Type: {
    type: String;
    required: true;
  };
  @Prop({ type: String, required: false })
  Status: {
    type: String;
    required: false;
  };
  @Prop({ type: String, required: true })
  Gamertag: {
    type: String;
    required: true;
  };
  @Prop({ type: String, required: true })
  Bio: {
    type: String;
    required: true;
  };
  @Prop({ type: String, required: false })
  Twitter: {
    type: String;
    required: false;
  };
  @Prop({ type: String, required: false })
  Youtube: {
    type: String;
    required: false;
  };
  @Prop({ type: String, required: false })
  Instagram: {
    type: String;
    required: false;
  };
  @Prop({ type: String, required: false })
  Twitch: {
    type: String;
    required: false;
  };
}

export const PlayerCardSchema = SchemaFactory.createForClass(Playercards);
