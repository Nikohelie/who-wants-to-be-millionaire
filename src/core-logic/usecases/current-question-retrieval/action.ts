import { createAction } from "@reduxjs/toolkit";
import { Question } from "./question";

export const currentQuestionRetrievedAction = createAction<Question | null>(
  "CURRENT_QUESTION_RETRIEVED"
);
