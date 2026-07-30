import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { KaryawanServiceModule } from './karyawan-service.module';

async function bootstrap() {
  const app = await NestFactory.create(KaryawanServiceModule);
  app.enableCors();
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('Karyawan Service API')
    .setDescription('Dokumentasi API untuk Karyawan Service')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.port ?? 3002);
}
bootstrap();
