import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Result } from 'src/modules/result/entities/results.entity';
import { ResultsService } from 'src/modules/result/results.service';
import { Repository } from 'typeorm';

describe('ResultService', () => {
  let service: ResultsService;
  let repository: Repository<Result>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ResultsService,
        {
          provide: getRepositoryToken(Result),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ResultsService>(ResultsService);
    repository = module.get<Repository<Result>>(getRepositoryToken(Result));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should submit a result', async () => {
    const resultData = {
      /* mock result data */
      userId: 1,
      score: 20,
    };
    const expectedResult = { id: 1, ...resultData };
    jest.spyOn(repository, 'save').mockResolvedValue(expectedResult as any);

    const result = await service.submitResult(resultData);

    expect(result).toEqual(expectedResult);
  });
});
