import { INestApplication } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';

export function setupSwagger(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle('Bettermode task')
    .setDescription('The Api')
    .setVersion('1.0.0')
    .addTag('Bettermode task')
    .addBearerAuth()
    .setExternalDoc('Postman collection', 'docs-json')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: 'Bettermode task API Docs',
  };
  SwaggerModule.setup('docs', app, document, customOptions);
}
