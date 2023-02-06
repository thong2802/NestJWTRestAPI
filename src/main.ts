import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
 
  // config swagger document API for Development.
  const config = new DocumentBuilder()
    .setTitle("Swagger Documentation")
    .setDescription("Swagger Documentation with API")
    .setVersion("1.0")
    .addTag('api')
    .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api",app, document);

    await app.listen(3000);
}
bootstrap();