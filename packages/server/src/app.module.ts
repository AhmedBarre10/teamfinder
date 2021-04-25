import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { InfoModule } from './Infos/info.module';
import { UserModule } from './User/user.module';

@Module({
  imports: [
    UserModule,
    InfoModule,
    MongooseModule.forRoot(
      'mongodb+srv://ahmed123:ahmed123@cluster0.oyinh.mongodb.net/NBA2K?retryWrites=true&w=majority',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
