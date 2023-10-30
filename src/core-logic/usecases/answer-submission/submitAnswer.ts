import { AppThunk } from "../../../store/reduxStore";
import { AnswerLetter } from "../../../store/appState";
import { answerSubmittedAction } from "./action";

export const submitAnswer =
  (answerLetter: AnswerLetter): AppThunk =>
  async (dispatch, getState, { currentQuestionGateway }) => {
    const answerSubmissionValidation =
      await currentQuestionGateway.submitAnswer(
        getState().currentQuestionRetrieval.data!.id,
        answerLetter
      );
    dispatch(answerSubmittedAction(answerSubmissionValidation));
  };
