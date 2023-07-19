import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path'
const hbs = require('hbs')

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setBaseViewsDir(join(__dirname, '..', 'views'))
  hbs.registerPartials(join(__dirname, '..', 'views', 'partials'))
  app.setViewEngine('hbs')
  await app.listen(3000);
}
bootstrap();
