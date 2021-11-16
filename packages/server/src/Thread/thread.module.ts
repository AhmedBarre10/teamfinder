import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ThreadController } from "./thread.controller";
import { ThreadSchema } from "./thread.schema";
import { ThreadServices } from "./thread.services";
import { UserService } from "../User/user.service";
import { UserSchema } from "../User/user.schema";
import { JwtModule } from "@nestjs/jwt";
import { CommentsSchema } from "./comments.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Thread", schema: ThreadSchema }]),
    MongooseModule.forFeature([{ name: "User", schema: UserSchema }]),
    // MongooseModule.forFeature([{ name: "Comments", schema: CommentsSchema }]),

    JwtModule.register({
      secret: "jwtSecret",
      signOptions: { expiresIn: "60d" },
    }),
  ],

  controllers: [ThreadController],
  providers: [ThreadServices, UserService],
})
export class ThreadModule {}
