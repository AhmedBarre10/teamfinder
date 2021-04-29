import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayercardModule } from './Infos/Playercard.module';
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { authMiddleware } from './User/auth.middleware';
import { PlayercardController } from './Infos/Playercard.controller';
import { UserModule } from './User/user.module';
@Module({
  imports: [
    UserModule,
    PlayercardModule,
    MongooseModule.forRoot(
      'mongodb+srv://ahmed123:ahmed123@cluster0.oyinh.mongodb.net/NBA2K?retryWrites=true&w=majority',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(authMiddleware).forRoutes(PlayercardController);
  }
}
