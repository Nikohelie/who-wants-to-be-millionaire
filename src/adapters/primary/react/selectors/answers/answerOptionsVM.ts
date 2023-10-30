import { AnswerLetter } from "../../../../../store/appState";

export type AnswerOptionsVM = Record<
  AnswerLetter,
  { label: string; highlightStatus: HighlightStatus }
>;

export type HighlightStatus = "NONE" | "WRONG" | "RIGHT";
