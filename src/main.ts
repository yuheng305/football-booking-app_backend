import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Football API')
    .setDescription('API quản lý sân bóng đá và dịch vụ')
    .setVersion('1.0')
    .addTag('clusters')
    .addTag('owners')
    .addTag('auth')
    .addBearerAuth( // 👈 THÊM ĐOẠN NÀY
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT', // Optional: ghi rõ định dạng token
        name: 'Authorization',
        description: 'Nhập token vào đây',
        in: 'header',
      },
      'access-token', // 👈 Đây là name để liên kết, mặc định là 'default', bạn đặt gì cũng được
    )
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    deepScanRoutes: true, // 👈 THÊM NÈ
  });

  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
