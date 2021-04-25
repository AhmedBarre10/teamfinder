// import * as mongoose from 'mongoose';
// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

// export const InfoSchema = new mongoose.Schema({
//   Archetype: {
//     type: String,
//     required: true,
//   },
//   Player: {
//     type: String,
//     required: true,
//   },
//   Overall: {
//     type: String,
//     required: true,
//   },
//   Winpercentage: {
//     type: String,
//     required: true,
//   },
//   Rep: {
//     type: String,
//     required: true,
//   },

//   Position: {
//     type: String,
//     required: true,
//   },

//   System: {
//     type: String,
//     required: true,
//   },
//   Type: {
//     type: String,
//     required: true,
//   },
//   Status: {
//     type: String,
//     required: false,
//   },
//   Gamertag: {
//     type: String,
//     required: true,
//   },
//   Bio: {
//     type: String,
//     required: true,
//   },
//   Twitter: {
//     type: String,
//     required: false,
//   },
//   Youtube: {
//     type: String,
//     required: false,
//   },
//   Instagram: {
//     type: String,
//     required: false,
//   },
//   Twitch: {
//     type: String,
//     required: false,
//   },
// });

// export interface Info extends mongoose.Document {
//   Archetype: String;
//   Player: String;
//   Overall: String;
//   Winpercentage: String;
//   Rep: String;

//   Position: String;

//   System: String;
//   Type: String;
//   Status: String;
//   Gamertag: String;
//   Bio: String;
//   Twitter: String;
//   Youtube: String;
//   Instagram: String;
//   Twitch: String;
// }

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class Info extends Document {
  @Prop({ type: String, required: true })
  Player: {
    type: String;
    required: true;
  };
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  user: Types.ObjectId;

  @Prop({ type: String, required: true })
  Overall: {
    type: String;
    required: true;
  };
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
  @Prop({ type: String, required: true })
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
  @Prop({ type: String, required: true })
  Twitter: {
    type: String;
    required: false;
  };
  @Prop({ type: String, required: true })
  Youtube: {
    type: String;
    required: false;
  };
  @Prop({ type: String, required: true })
  Instagram: {
    type: String;
    required: false;
  };
  @Prop({ type: String, required: true })
  Twitch: {
    type: String;
    required: false;
  };
}

export const InfoSchema = SchemaFactory.createForClass(Info);
