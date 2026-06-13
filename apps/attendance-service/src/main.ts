import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AttendanceServiceModule } from './attendance-service.module';

async function bootstrap() {
  const app = await NestFactory.create(AttendanceServiceModule);

  const config = new DocumentBuilder()
    .setTitle('Attendance Service API')
    .setDescription('Dokumentasi API untuk Attendance Service')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.port ?? 3004);
}
bootstrap();
