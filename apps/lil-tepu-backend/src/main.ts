import * as dotenv from 'dotenv';
dotenv.config();
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.setGlobalPrefix('api'); // Enable CORS for Cross-Origin requests

  const config = new DocumentBuilder()
    .setTitle('E-Farina API Gateway')
    .setDescription('Dokumentasi lengkap API terpusat (API Gateway) standar internasional untuk sistem E-Farina. Meliputi rute layanan, dan cek status sistem.')
    .setVersion('1.0.0')
    .setTermsOfService('https://example.com/terms')
    .setContact('E-Farina Engineering Team', 'https://example.com/support', 'support@example.com')
    .setLicense('MIT License', 'https://opensource.org/licenses/MIT')
    .addServer(`http://localhost:${process.env.PORT ?? 3000}`, 'Development Server')
    .addBearerAuth()
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, documentFactory, {
    swaggerOptions: {
      persistAuthorization: true,
      docExpansion: 'list',
      filter: true,
      displayRequestDuration: true,
    },
    customSiteTitle: 'E-Farina API Gateway Docs',
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
