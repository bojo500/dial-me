import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as dotenv from 'dotenv';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { VersioningType } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 9001;
  const config = new DocumentBuilder()
    .setTitle('Dial Me Open API 🚀')
    .setDescription('Dial Me API description 📋')
    .setVersion('1.0')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('swagger', app, document)

  app.enableCors();
  app.enableVersioning({
    type: VersioningType.URI,
  });

  await app.listen(port);
  console.log(`Application is running 🚀 on: ${await app.getUrl()} Author : Mohamed Khaled`);
}
bootstrap();