// aggregated-metrics.service.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Result } from 'src/modules/result/entities/results.entity';
import { AggregatedMetrics } from 'src/modules/metrics/entities/aggregated-matrics.entity';
import { AggregatedMetricsService } from 'src/modules/metrics/aggregated-matrics.service';

describe('AggregatedMetricsService', () => {
  let service: AggregatedMetricsService;
  let resultRepository: Repository<Result>;
  let metricsRepository: Repository<AggregatedMetrics>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AggregatedMetricsService,
        {
          provide: getRepositoryToken(Result),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(AggregatedMetrics),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<AggregatedMetricsService>(AggregatedMetricsService);
    resultRepository = module.get<Repository<Result>>(
      getRepositoryToken(Result),
    );
    metricsRepository = module.get<Repository<AggregatedMetrics>>(
      getRepositoryToken(AggregatedMetrics),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should update metrics for a result', async () => {
    const resultId = 1;
    const mockResult = {
      id: 1,
      userId: 1,
      score: 80,
      completed_at: new Date(),
    };
    const mockMetrics = {
      id: 1,
      totalScore: 200,
      totalEntries: 2,
      averageScore: 100,
    };

    jest
      .spyOn(resultRepository, 'findOne')
      .mockResolvedValue(mockResult as unknown as Result);
    jest
      .spyOn(metricsRepository, 'findOne')
      .mockResolvedValue(mockMetrics as AggregatedMetrics);
    jest
      .spyOn(metricsRepository, 'save')
      .mockImplementation(async (metrics: AggregatedMetrics) => metrics);

    await service.updateMetrics(resultId);

    expect(resultRepository.findOne).toHaveBeenCalledWith(resultId);
    expect(metricsRepository.findOne).toHaveBeenCalled();
    expect(metricsRepository.save).toHaveBeenCalledWith({
      ...mockMetrics,
      totalScore: mockMetrics.totalScore + mockResult.score,
      totalEntries: mockMetrics.totalEntries + 1,
      averageScore:
        (mockMetrics.totalScore + mockResult.score) /
        (mockMetrics.totalEntries + 1),
    });
  });

  it('should create metrics if none exist', async () => {
    const resultId = 1;
    const mockResult = {
      id: 1,
      userId: 1,
      score: 80,
      completed_at: new Date(),
    };

    jest
      .spyOn(resultRepository, 'findOne')
      .mockResolvedValue(mockResult as unknown as Result);
    jest.spyOn(metricsRepository, 'findOne').mockResolvedValue(undefined);
    jest
      .spyOn(metricsRepository, 'save')
      .mockImplementation(async (metrics: AggregatedMetrics) => metrics);

    await service.updateMetrics(resultId);

    expect(resultRepository.findOne).toHaveBeenCalledWith(resultId);
    expect(metricsRepository.findOne).toHaveBeenCalled();
    expect(metricsRepository.save).toHaveBeenCalledWith({
      totalScore: mockResult.score,
      totalEntries: 1,
      averageScore: mockResult.score,
    });
  });
});
