import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MongooseModule } from "@nestjs/mongoose";
import { PlayercardModule } from "./Infos/Playercard.module";
import { ThreadController } from "./Thread/thread.controller";
import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from "@nestjs/common";
import { authMiddleware } from "./User/auth.middleware";
import { PlayercardController } from "./Infos/Playercard.controller";
import { UserModule } from "./User/user.module";
import { ConfigModule } from "@nestjs/config";
import { ThreadModule } from "./Thread/thread.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    PlayercardModule,
    ThreadModule,
    MongooseModule.forRoot(
      "env"
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(authMiddleware).forRoutes(
      { path: "auth/profileImage/", method: RequestMethod.GET },
      { path: "auth/upload/", method: RequestMethod.GET },
      { path: "auth/getMe/", method: RequestMethod.GET },
      { path: "thread/", method: RequestMethod.GET }
      // ThreadController,
    );
  }
}
