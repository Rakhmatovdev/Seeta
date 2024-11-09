import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { AllExceptionsFilter } from './common/helpers/error-handling';
async function start() {
  try {
    const PORT = process.env.PORT || 3000;
    const app = await NestFactory.create(AppModule);
    app.use(cookieParser());
    app.useGlobalPipes(new ValidationPipe());
    // app.useGlobalPipes(new CustomValidationPipe());
    // app.useGlobalFilters(new AllExceptionsFilter());
    // app.useGlobalFilters(new AllExceptionsFilter(new Logger()));
    const config = new DocumentBuilder()
      .setTitle('Seeta project')
      .setDescription('Seeta project REST API')
      .setVersion('1.0')
      .addTag('NESTJS, validation, mailer, swagger, guard, sequelize, pg')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);
    await app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}
start();

