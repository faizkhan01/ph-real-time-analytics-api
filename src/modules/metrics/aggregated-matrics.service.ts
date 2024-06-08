// services/aggregated-metrics.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Result } from '../result/entities/results.entity';
import { AggregatedMetrics } from './entities/aggregated-matrics.entity';

@Injectable()
export class AggregatedMetricsService {
  constructor(
    @InjectRepository(Result)
    private resultsRepository: Repository<Result>,
    @InjectRepository(AggregatedMetrics)
    private metricsRepository: Repository<AggregatedMetrics>,
  ) {}

  async updateMetrics(resultId: number): Promise<void> {
    // Fetch the submitted result
    const result = await this.resultsRepository.findOne({
      where: { id: resultId },
    });
    if (!result) {
      throw new Error(`Result with ID ${resultId} not found`);
    }

    // Get the current metrics
    let metrics = await this.metricsRepository.findOne({
      where: {
        result_id: resultId,
      },
    });
    if (!metrics) {
      metrics = this.metricsRepository.create();
    }

    // Update the metrics
    metrics.totalScore += result.score;
    metrics.totalEntries += 1;
    metrics.averageScore = metrics.totalScore / metrics.totalEntries;

    // Save the updated metrics
    await this.metricsRepository.save(metrics);
  }
}
