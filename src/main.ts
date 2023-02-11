import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';
import { ConfigService } from '@nestjs/config';
async function bootstrap() {
  const app: NestExpressApplication = await NestFactory.create(AppModule, {
    cors: true,
    logger: ['error', 'warn', 'log'],
  });
  const config: ConfigService = app.get(ConfigService);
  const port: number = config.get<number>('NODE_PORT');

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  app.use(require('morgan')('dev'));
  const SwaggerConfig = new DocumentBuilder()
    .setTitle('ELN Apis')
    .setDescription('ELN API')
    .setVersion('1.0')
    .setBasePath('api')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, SwaggerConfig);
  SwaggerModule.setup('swagger', app, document);
  app.enableCors();
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  await app.listen(port, () => {
    console.log('[WEB]', `http://localhost:${port}`);
  });
}
bootstrap();
