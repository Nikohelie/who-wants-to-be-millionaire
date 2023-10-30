import { Question } from "../usecases/current-question-retrieval/question";
import { AnswerLetter } from "../../store/appState";
import { AnswerSubmissionValidation } from "../usecases/answer-submission/answerSubmissionValidation";

export interface CurrentQuestionGateway {
  loadCurrentQuestion(): Promise<Question>;

  submitAnswer(
    questionId: string,
    answerLetter: AnswerLetter
  ): Promise<AnswerSubmissionValidation>;
}
