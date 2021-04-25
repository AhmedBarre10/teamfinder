import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { InfoController } from './info.controller';
import { InfoService } from './Info.service';
import { InfoSchema } from './info.schemas';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Info', schema: InfoSchema }])],
  controllers: [InfoController],
  providers: [InfoService],
})
export class InfoModule {}
