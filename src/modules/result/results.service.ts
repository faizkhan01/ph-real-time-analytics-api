import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { Result } from './entities/results.entity';

@Injectable()
export class ResultsService {
  constructor(
    @InjectRepository(Result)
    private resultsRepository: Repository<Result>,
  ) {}

  async findAll(): Promise<Result[]> {
    return this.resultsRepository.find();
  }

  async findByUser(userId: number): Promise<Result[]> {
    return this.resultsRepository.find({ where: { user_id: userId } });
  }

  async aggregateQuizScores(quizId: number): Promise<any> {
    return this.resultsRepository
      .createQueryBuilder('result')
      .select('result.quiz_id', 'quizId')
      .addSelect('AVG(result.score)', 'averageScore')
      .addSelect('COUNT(result.id)', 'attempts')
      .where('result.quiz_id = :quizId', { quizId })
      .groupBy('result.quiz_id')
      .getRawOne();
  }

  async findByTimeInterval(startDate: Date, endDate: Date): Promise<Result[]> {
    return this.resultsRepository.find({
      where: {
        completed_at: Between(startDate, endDate),
      },
    });
  }

  async calculateAverageScoreByTimeInterval(
    startDate: Date,
    endDate: Date,
  ): Promise<number> {
    const results = await this.resultsRepository.find({
      where: {
        completed_at: Between(startDate, endDate),
      },
    });
    const totalScore = results.reduce((acc, curr) => acc + curr.score, 0);
    return totalScore / results.length;
  }
}
