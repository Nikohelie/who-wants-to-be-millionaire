import { CurrentQuestionGateway } from "../../../../../core-logic/gateways/currentQuestionGateway";
import { Question } from "../../../../../core-logic/usecases/current-question-retrieval/question";
import { AnswerLetter } from "../../../../../store/appState";
import { AnswerSubmissionValidation } from "../../../../../core-logic/usecases/answer-submission/answerSubmissionValidation";

export class CurrentQuestionGatewayStub implements CurrentQuestionGateway {
  private _currentQuestion: Question | null = null;
  private _answerSubmissionValidation: AnswerSubmissionValidation | null = null;

  async loadCurrentQuestion(): Promise<Question> {
    return this._currentQuestion!;
  }

  async submitAnswer(
    questionId: string,
    answerLetter: AnswerLetter
  ): Promise<AnswerSubmissionValidation> {
    return this._answerSubmissionValidation!;
  }

  feedCurrentQuestionWith(loadedCurrentQuestion: Question) {
    this._currentQuestion = loadedCurrentQuestion;
  }

  feedAnswerSubmissionValidation(
    answerSubmissionValidation: AnswerSubmissionValidation
  ) {
    this._answerSubmissionValidation = answerSubmissionValidation;
  }
}
