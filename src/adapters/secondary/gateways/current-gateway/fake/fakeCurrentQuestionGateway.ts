import { CurrentQuestionGateway } from "../../../../../core-logic/gateways/currentQuestionGateway";
import { Question } from "../../../../../core-logic/usecases/current-question-retrieval/question";
import { AnswerLetter } from "../../../../../store/appState";
import { AnswerSubmissionValidation } from "../../../../../core-logic/usecases/answer-submission/answerSubmissionValidation";

export class FakeCurrentQuestionGateway implements CurrentQuestionGateway {
  private cursor: number = 0;
  constructor(
    private questionsPool: Question[],

    private correctAnswerByQuestionId: Record<string, AnswerLetter>
  ) {}

  async loadCurrentQuestion(): Promise<Question> {
    return this.questionsPool[this.cursor++];
  }

  async submitAnswer(
    questionId: string,
    answerLetter: AnswerLetter
  ): Promise<AnswerSubmissionValidation> {
    return {
      correct: this.correctAnswerByQuestionId[questionId],
      given: answerLetter,
      status:
        this.correctAnswerByQuestionId[questionId] === answerLetter
          ? "RIGHT"
          : "WRONG",
    };
  }
}

export interface ArrayIndexPicker {
  pick<T>(array: Array<T>): number;
}
