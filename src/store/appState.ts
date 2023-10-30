import { Question } from "../core-logic/usecases/current-question-retrieval/question";
import { AnswerSubmissionValidation } from "../core-logic/usecases/answer-submission/answerSubmissionValidation";

export interface AppState {
  currentQuestionRetrieval: {
    data: Question | null;
  };

  answerSubmissionValidation: {
    data: AnswerSubmissionValidation | null;
  };

  pyramid: PyramidState;
}

export type PyramidState = {
  structure: number[];
  currentValue: number;
};

export type AnswerLetter = "A" | "B" | "C" | "D";
