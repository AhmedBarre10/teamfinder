import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserController } from "./user.controller";
import { UserSchema } from "./user.schema";
import { UserService } from "./user.service";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "User", schema: UserSchema }]),
    JwtModule.register({
      secret: "jwtSecret",
      signOptions: { expiresIn: "60d" },
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
