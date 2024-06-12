import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'node:process';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.enableCors({
    origin: configService.get<string>('clientUrl'),
    credentials: true,
  });
  await app.listen(configService.get<number>('port'));
}
bootstrap().then(() => {
  console.log(`Gateway App started on port: ${process.env.PORT}`);
});
