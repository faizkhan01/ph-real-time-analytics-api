import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { swaggerConfig } from 'src/config/swagger.config';

export default function LoadSwaggerModule(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle(swaggerConfig.title)
    .setDescription(swaggerConfig.description)
    .setVersion('1.0.0')
    .addTag(swaggerConfig.tag)
    .build();

  const document = SwaggerModule.createDocument(app, config);

  document.paths = Object.keys(document.paths).reduce((newPaths, path) => {
    newPaths[`/api${path}`] = document.paths[path];
    return newPaths;
  }, {});

  SwaggerModule.setup(swaggerConfig.swaggerPrefix, app, document);
}
