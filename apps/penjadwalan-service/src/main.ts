import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PenjadwalanServiceModule } from './penjadwalan-service.module';

async function bootstrap() {
  const app = await NestFactory.create(PenjadwalanServiceModule);

  const config = new DocumentBuilder()
    .setTitle('Penjadwalan Service API')
    .setDescription('Dokumentasi API untuk Penjadwalan Service')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.port ?? 3003);
}
bootstrap();
