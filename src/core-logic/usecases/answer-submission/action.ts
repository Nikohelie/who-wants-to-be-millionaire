import { createAction } from "@reduxjs/toolkit";
import { AnswerSubmissionValidation } from "./answerSubmissionValidation";

export const answerSubmittedAction =
  createAction<AnswerSubmissionValidation | null>("ANSWER_SUBMITTED_ACTION");
