import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import LoadSwaggerModule from './libs/loaders/swagger.module';
import { serverConfig } from './config/server.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  if (process.env.NODE_ENV === 'development') LoadSwaggerModule(app);

  app.setGlobalPrefix(serverConfig.globalPrefix);

  await app.listen(serverConfig.port);
  console.log(
    '\x1b[47m\x1b[46m%s\x1b[0m',
    `🧠 Server running on 👀  `,
    '\x1b[1m\x1b[5m',
    `http://${serverConfig.host}:${serverConfig.port}/api 🔥🚀`,
  );
}
bootstrap();
