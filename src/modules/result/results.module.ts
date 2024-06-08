import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Result } from './entities/results.entity';
import { ResultsService } from './results.service';
import { ResultController } from './results.controller';
import { ResultsGateway } from './results.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Result])],
  controllers: [ResultController],
  providers: [ResultsService, ResultsGateway],
  exports: [ResultsService],
})
export class ResultsModule {}
