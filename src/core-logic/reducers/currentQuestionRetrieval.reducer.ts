import { createReducer } from "@reduxjs/toolkit";
import { currentQuestionRetrievedAction } from "../usecases/current-question-retrieval/action";
import { Question } from "../usecases/current-question-retrieval/question";

export const currentQuestionRetrievalReducer = createReducer<{
  data: Question | null;
}>({ data: null }, (builder) => {
  builder.addCase(currentQuestionRetrievedAction, (state, action) => {
    if (action.payload) return { data: action.payload };
    return state;
  });
});
