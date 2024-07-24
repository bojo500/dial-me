import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as dotenv from 'dotenv';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { VersioningType } from "@nestjs/common";

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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
  await app.listen(3006);
}
bootstrap();