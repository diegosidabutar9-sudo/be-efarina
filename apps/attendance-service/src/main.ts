import * as dotenv from 'dotenv';
dotenv.config();
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AttendanceServiceModule } from './attendance-service.module';

async function bootstrap() {
  const app = await NestFactory.create(AttendanceServiceModule);

  app.enableCors(); // Enable CORS for API clients

  const config = new DocumentBuilder()
    .setTitle('Attendance Service API')
    .setDescription('Dokumentasi lengkap API untuk Attendance Service. Terintegrasi dengan spesifikasi OpenAPI.')
    .setVersion('1.0.0')
    .setContact('Developer Support', '', 'support@example.com')
    .addServer(`http://localhost:${process.env.ATTENDANCE_PORT ?? 3004}`, 'Local Server')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, documentFactory, {
    swaggerOptions: {
      persistAuthorization: true, // Keeps token across reloads
      docExpansion: 'list',
      filter: true,
      showRequestDuration: true,
    },
    customSiteTitle: 'Attendance API Docs',
  });

  await app.listen(process.env.ATTENDANCE_PORT ?? 3004);
}
bootstrap();
