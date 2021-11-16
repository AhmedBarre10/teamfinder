import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { PlayercardController } from "./Playercard.controller";
import { PlayercardService } from "./Playercard.service";
import { PlayerCardSchema } from "./Playercard.schemas";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "Playercards", schema: PlayerCardSchema },
    ]),
  ],
  controllers: [PlayercardController],
  providers: [PlayercardService],
})
export class PlayercardModule {}
