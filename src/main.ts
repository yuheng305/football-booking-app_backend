import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 🔧 Swagger config
  const config = new DocumentBuilder()
    .setTitle('Football API')
    .setDescription('API quản lý sân bóng đá và dịch vụ')
    .setVersion('1.0')
    .addTag('clusters') // tag này để nhóm các endpoint
    .addTag('owners') // tag này để nhóm các endpoint
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // <-- http://localhost:3000/api

  await app.listen(3000);
}
bootstrap();
