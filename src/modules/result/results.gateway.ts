import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ResultsService } from './results.service';

@WebSocketGateway()
export class ResultsGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly resultsService: ResultsService) {}

  @SubscribeMessage('getResults')
  async handleGetResults(client: Socket): Promise<void> {
    const results = await this.resultsService.findAll();
    client.emit('results', results);
  }

  @SubscribeMessage('getUserResults')
  async handleGetUserResults(
    client: Socket,
    @MessageBody() userId: number,
  ): Promise<void> {
    const results = await this.resultsService.findByUser(userId);
    client.emit('userResults', results);
  }

  @SubscribeMessage('aggregateQuizScores')
  async handleAggregateQuizScores(
    client: Socket,
    @MessageBody() quizId: number,
  ): Promise<void> {
    const aggregate = await this.resultsService.aggregateQuizScores(quizId);
    client.emit('quizAggregate', aggregate);
  }
}
