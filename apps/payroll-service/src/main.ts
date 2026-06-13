import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PayrollServiceModule } from './payroll-service.module';

async function bootstrap() {
  const app = await NestFactory.create(PayrollServiceModule);

  const config = new DocumentBuilder()
    .setTitle('Payroll Service API')
    .setDescription('Dokumentasi API untuk Payroll Service')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.port ?? 3005);
}
bootstrap();
