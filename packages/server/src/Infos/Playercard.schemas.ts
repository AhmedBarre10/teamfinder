import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { truncate } from "fs/promises";
import { Document, Types, Schema as MongooseSchema } from "mongoose";
import { User } from "../User/user.schema";
@Schema()
export class Playercards extends Document {
  @Prop({ type: String, required: false })
  date: string;

  @Prop({ type: Object, required: false })
  Team1: [
    Name: string,
    Logo: string,
    id: string,
    first: {
      name: string;
      points: string;
      assist: string;
      blocks: string;
      steals: string;
      rebounds: string;
      FG: string;
      TPT: string;
      id: string;
    },
    second: {
      name: string;
      Logo: string;
      points: string;
      assist: string;
      blocks: string;
      steals: string;
      rebounds: string;
      FG: string;
      TPT: string;
      id: string;
    },
    third: {
      name: string;
      Logo: string;
      points: string;
      assist: string;
      blocks: string;
      steals: string;
      rebounds: string;
      FG: string;
      TPT: string;
      id: string;
    }
  ];

  @Prop({ type: Object, required: false })
  Team2: [
    Name: string,
    Logo: string,
    id: string,
    first: {
      name: string;
      points: string;
      assist: string;
      blocks: string;
      steals: string;
      rebounds: string;
      FG: string;
      TPT: string;
      id: string;
    },
    second: {
      name: string;
      Logo: string;
      points: string;
      assist: string;
      blocks: string;
      steals: string;
      rebounds: string;
      FG: string;
      TPT: string;
      id: string;
    },
    third: {
      name: string;
      Logo: string;
      points: string;
      assist: string;
      blocks: string;
      steals: string;
      rebounds: string;
      FG: string;
      TPT: string;
      id: string;
    }
  ];

  // @Prop({ type: Array, required: false })
  // Roster: [{ name: string; id: string; position: string }];
}

export const PlayerCardSchema = SchemaFactory.createForClass(Playercards);
