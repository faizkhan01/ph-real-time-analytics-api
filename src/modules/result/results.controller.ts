import { Body, Controller, Get, Param, Post, Query, Res } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Result } from './entities/results.entity';
import { ResultsService } from './results.service';
import { Response } from 'express';
import { interval, map } from 'rxjs';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/libs/decorators/roles.decorator';
import { QuizEvent, ResultSubmittedEvent } from 'src/libs/events/events';

@Controller('results')
@ApiTags('Results')
export class ResultController {
  constructor(
    private readonly resultsService: ResultsService,
    private eventEmitter: EventEmitter2,
  ) {}

  @Roles('admin')
  @Get()
  findAll(): Promise<Result[]> {
    return this.resultsService.findAll();
  }

  @Roles('user', 'admin')
  @Get('user/:userId')
  findByUser(@Param('userId') userId: number): Promise<Result[]> {
    return this.resultsService.findByUser(userId);
  }

  @Roles('admin')
  @Get('quiz/:quizId/aggregate')
  aggregateQuizScores(@Param('quizId') quizId: number): Promise<any> {
    return this.resultsService.aggregateQuizScores(quizId);
  }

  @Roles('admin')
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

  @Roles('admin')
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

  @Roles('admin')
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

  @Roles('user')
  @Post()
  async submitResult(@Body() data: any) {
    // Process incoming data
    const result = await this.resultsService.submitResult(data);
    // Emit event for result submission
    const event = new ResultSubmittedEvent(result.id);
    await this.eventEmitter.emit(QuizEvent.RESULT_SUBMITTED, event);
    return result;
  }
}
