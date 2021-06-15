import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayercardModule } from './Infos/Playercard.module';
import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { authMiddleware } from './User/auth.middleware';
import { PlayercardController } from './Infos/Playercard.controller';
import { UserModule } from './User/user.module';
import { ConfigModule } from '@nestjs/config';
import { ThreadModule } from './Thread/thread.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    PlayercardModule,
    ThreadModule,
    MongooseModule.forRoot(
      'mongodb+srv://ahmed123:ahmed123@cluster0.oyinh.mongodb.net/NBA2K?retryWrites=true&w=majority',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(authMiddleware).forRoutes(
      { path: 'auth/profileImage/', method: RequestMethod.ALL },
      { path: 'auth/upload/', method: RequestMethod.ALL },
      { path: 'auth/getMe/', method: RequestMethod.ALL },
      { path: 'thread', method: RequestMethod.ALL },

      PlayercardController,
    );
  }
}
