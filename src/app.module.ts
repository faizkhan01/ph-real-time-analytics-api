import { UsersModule } from './modules/user/user.module';
import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResultsModule } from './modules/result/results.module';
import { serverConfig } from './config/server.config';
import { swaggerConfig } from './config/swagger.config';
import { AppConfigModule } from './config/config.module';
import config from './db/ormconfig';
import { AuthModule } from './modules/auth/auth.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { QuizListeners } from './libs/listeners/listeners';
import { MetricsModule } from './modules/metrics/metrics.module';

@Module({
  imports: [
    AppConfigModule,
    TypeOrmModule.forRoot(config),
    EventEmitterModule.forRoot(),
    UsersModule,
    ResultsModule,
    AuthModule,
    MetricsModule,
  ],
  controllers: [AppController],
  providers: [AppService, QuizListeners],
})
export class AppModule {
  onApplicationBootstrap() {
    if (process.env.NODE_ENV === 'development') {
      Logger.verbose(
        `🧠 API Documentation running here 👀 http://${serverConfig.host}:${serverConfig.port}/${swaggerConfig.swaggerPrefix}`,
      );
      Logger.verbose(`⭐️ DB ADMIN : http://localhost:5050 🚀`);
    }
  }
}
