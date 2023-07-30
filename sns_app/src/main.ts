import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';

// hbsファイル利用
const hbs = require('hbs');
// Session利用
const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  hbs.registerPartials(join(__dirname, '..', 'views', 'partials'));
  app.setViewEngine('hbs');
  app.useGlobalPipes(new ValidationPipe());
  app.use(
    cookieSession({
      name: 'session', // セッションクッキー名
      keys: ['key1'], // クッキーの暗号化
      maxAge: 7 * 24 * 60 * 60 * 1000, // セッションの有効期限
    }),
  );
  await app.listen(3000);
}
bootstrap();
