import {
  Action,
  createListenerMiddleware,
  ThunkDispatch,
} from "@reduxjs/toolkit";
import { answerSubmittedAction } from "../action";
import { retrieveCurrentQuestion } from "../../current-question-retrieval/retrieveCurrentQuestion";
import { AppState } from "../../../../store/appState";
import { Dependencies } from "../../../../store/reduxStore";

export const answerSubmissionValidationListenerMiddleware =
  createListenerMiddleware<
    AppState,
    ThunkDispatch<AppState, Dependencies, Action>
  >();

answerSubmissionValidationListenerMiddleware.startListening({
  actionCreator: answerSubmittedAction,
  effect: (action, listenerAPI) => {
    if (action.payload?.status === "RIGHT") {
      setTimeout(() => listenerAPI.dispatch(retrieveCurrentQuestion()), 1000);
    }
  },
});
