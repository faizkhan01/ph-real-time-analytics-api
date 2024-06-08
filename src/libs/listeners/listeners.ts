import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { QuizEvent, ResultSubmittedEvent } from '../events/events';
import { AggregatedMetricsService } from 'src/modules/metrics/aggregated-matrics.service';

@Injectable()
export class QuizListeners {
  constructor(
    private readonly aggregatedMetricsService: AggregatedMetricsService,
  ) {}
  @OnEvent(QuizEvent.RESULT_SUBMITTED)
  async handleResultSubmittedEvent(event: ResultSubmittedEvent) {
    // Process and update aggregated metrics here
    const resultId = event.resultId;
    await this.aggregatedMetricsService.updateMetrics(resultId);
  }
}
