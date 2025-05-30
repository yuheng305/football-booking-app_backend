import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import "./instrument"; // Import Sentry instrumentation
import { SentryExceptionFilter } from './exception/SentryExceptionFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 🔧 Swagger config
  const config = new DocumentBuilder()
    .setTitle('Football API')
    .setDescription('API quản lý sân bóng đá và dịch vụ')
    .setVersion('1.0')
    .addBearerAuth({
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT", // Optional, but helps with documentation
    })
    .addTag('clusters') // tag này để nhóm các endpoint
    .addTag('owners') // tag này để nhóm các endpoint
    .addTag('auth') // tag này để nhóm các endpoint
    .build();

  app.useGlobalFilters(new SentryExceptionFilter()); // Register Sentry exception filter

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // <-- http://localhost:3000/api

  await app.listen(3000);
}
bootstrap();
