export enum QuizEvent {
  RESULT_SUBMITTED = 'resultSubmitted',
}

export class ResultSubmittedEvent {
  constructor(public readonly resultId: number) {}
}
