import { AnswerLetter } from "../../../store/appState";

export interface AnswerSubmissionValidation {
  correct: AnswerLetter;
  given: AnswerLetter;
  status: "RIGHT" | "WRONG";
}
