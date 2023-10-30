import { AnswerLetter } from "../../../store/appState";

export interface Question {
  id: string;
  label: string;
  answersOptions: Record<AnswerLetter, AnswerOptionLabel>;
}

export type AnswerOptionLabel = string;
