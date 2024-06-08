// metrics.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AggregatedMetrics } from './entities/aggregated-matrics.entity';
import { Result } from '../result/entities/results.entity';
import { AggregatedMetricsService } from './aggregated-matrics.service';

@Module({
  imports: [TypeOrmModule.forFeature([AggregatedMetrics, Result])],
  providers: [AggregatedMetricsService],
  exports: [AggregatedMetricsService],
})
export class MetricsModule {}
