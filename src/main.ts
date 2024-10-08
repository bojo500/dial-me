import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

dotenv.config();


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors({
    origin: ['http://localhost:3000', 'http://mo.com:3000'],
    optionsSuccessStatus: 200,
    methods: 'GET,POST',
    allowedHeaders: 'Content-Type,Authorization',
  }));
  const port = process.env.PORT || 9001;

  const config = new DocumentBuilder()
      .setTitle('Dial Me Open API 🚀')
      .setDescription('Dial Me API description 📋')
      .setVersion('1.0')
      .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  app.enableCors({
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  await app.listen(port);
  console.log(`Application is running 🚀 on: ${await app.getUrl()} Author : Mohamed Khaled`);
}

bootstrap();
