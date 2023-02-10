import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
 
  // config swagger document API for Development.
  const PORT = 3000;
  const config = new DocumentBuilder()
    .setTitle("Swagger Documentation")
    .setDescription("Swagger Documentation with API")
    .setVersion("1.0")
    .addTag('api')
    .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api",app, document);

    app.useGlobalPipes(new ValidationPipe());
    await app.listen(PORT);
    console.log(PORT)
}
bootstrap();
