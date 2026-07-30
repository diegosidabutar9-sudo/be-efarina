import * as dotenv from 'dotenv';
dotenv.config();
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PayrollServiceModule } from './payroll-service.module';

async function bootstrap() {
  const app = await NestFactory.create(PayrollServiceModule);

  app.enableCors();
  app.setGlobalPrefix('api'); // Enable CORS for API clients

  const config = new DocumentBuilder()
    .setTitle('Payroll Service API')
    .setDescription('Dokumentasi lengkap API untuk Payroll Service. Terintegrasi dengan spesifikasi OpenAPI.')
    .setVersion('1.0.0')
    .setContact('Developer Support', '', 'support@example.com')
    .addServer(`http://localhost:${process.env.PAYROLL_PORT ?? 3005}`, 'Local Server')
    .addBearerAuth()
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, documentFactory, {
    swaggerOptions: {
      persistAuthorization: true, // Keeps token across reloads
      docExpansion: 'list',
      filter: true,
      showRequestDuration: true,
    },
    customSiteTitle: 'Payroll API Docs',
  });

  await app.listen(process.env.PAYROLL_PORT ?? 3005);
}
bootstrap();
