import { UserModule } from './modules/user/user.module';
import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResultsModule } from './modules/result/results.module';
import { serverConfig } from './config/server.config';
import { swaggerConfig } from './config/swagger.config';
import { AppConfigModule } from './config/config.module';
import config from './db/ormconfig';

@Module({
  imports: [
    AppConfigModule,
    TypeOrmModule.forRoot(config),
    UserModule,
    ResultsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  onApplicationBootstrap() {
    if (process.env.NODE_ENV === 'development') {
      Logger.verbose(
        `🧠 API Documentation running here 👀 http://${serverConfig.host}:${serverConfig.port}/${swaggerConfig.swaggerPrefix}`,
      );
    }
  }
}
