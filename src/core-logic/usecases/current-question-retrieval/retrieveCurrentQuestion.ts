import { currentQuestionRetrievedAction } from "./action";
import { AppThunk } from "../../../store/reduxStore";

export const retrieveCurrentQuestion =
  (): AppThunk =>
  async (dispatch, _, { currentQuestionGateway }) => {
    const currentQuestion = await currentQuestionGateway.loadCurrentQuestion();
    dispatch(currentQuestionRetrievedAction(currentQuestion));
  };
