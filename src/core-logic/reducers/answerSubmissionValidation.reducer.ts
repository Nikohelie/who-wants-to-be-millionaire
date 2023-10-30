import { createReducer } from "@reduxjs/toolkit";
import { AnswerSubmissionValidation } from "../usecases/answer-submission/answerSubmissionValidation";
import { answerSubmittedAction } from "../usecases/answer-submission/action";
import { currentQuestionRetrievedAction } from "../usecases/current-question-retrieval/action";

export const answerSubmissionValidationReducer = createReducer<{
  data: AnswerSubmissionValidation | null;
}>({ data: null }, (builder) => {
  builder
    .addCase(answerSubmittedAction, (state, action) => {
      if (action.payload) return { data: action.payload };
      return state;
    })

    .addCase(currentQuestionRetrievedAction, (state, action) => {
      return { data: null };
    });
});
