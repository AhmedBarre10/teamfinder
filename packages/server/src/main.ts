import { NestFactory } from '@nestjs/core';
import * as bodyParser from 'body-parser';
import { AppModule } from './app.module';
declare const module: any;


async function bootstrap() {
  console.log(process.env.AWS_S3_BUCKET_NAME)
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3000);
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap();
// production use only
// AppClusterService.clusterize(bootstrap)
