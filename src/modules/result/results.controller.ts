import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import { Result } from './entities/results.entity';
import { ResultsService } from './results.service';
import { Response } from 'express';
import { interval, map } from 'rxjs';
import { ApiTags } from '@nestjs/swagger';

@Controller('results')
@ApiTags('Results')
export class ResultController {
  constructor(private readonly resultsService: ResultsService) {}

  @Get()
  findAll(): Promise<Result[]> {
    return this.resultsService.findAll();
  }

  @Get('user/:userId')
  findByUser(@Param('userId') userId: number): Promise<Result[]> {
    return this.resultsService.findByUser(userId);
  }

  @Get('quiz/:quizId/aggregate')
  aggregateQuizScores(@Param('quizId') quizId: number): Promise<any> {
    return this.resultsService.aggregateQuizScores(quizId);
  }

  @Get('sse')
  sendEvents(@Res() res: Response) {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    interval(1000)
      .pipe(
        map(
          () =>
            `data: ${JSON.stringify({ message: 'hello world', timestamp: new Date() })}\n\n`,
        ),
      )
      .subscribe((data) => res.write(data));
  }

  @Get('time-interval')
  async findByTimeInterval(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ): Promise<Result[]> {
    const results = await this.resultsService.findByTimeInterval(
      new Date(startDate),
      new Date(endDate),
    );
    return results;
  }

  @Get('average-score')
  async calculateAverageScoreByTimeInterval(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ): Promise<number> {
    const averageScore =
      await this.resultsService.calculateAverageScoreByTimeInterval(
        new Date(startDate),
        new Date(endDate),
      );
    return averageScore;
  }
}
