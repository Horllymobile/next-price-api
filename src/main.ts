import { NestFactory } from '@nestjs/core';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerCustomOptions,
} from '@nestjs/swagger';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: '*',
  });
  const config = new DocumentBuilder()
    .addBearerAuth({
      type: 'apiKey',
      bearerFormat: 'Beareer token',
    })
    .setTitle('Next-Price')
    .setDescription('The Next price API description')
    .setVersion('1.0')
    // .addTag('goods', '')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: 'My API Docs',
  };
  SwaggerModule.setup('api', app, document, customOptions);
  await app.listen(3000);
}
bootstrap();
