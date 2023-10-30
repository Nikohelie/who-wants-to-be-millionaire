import {
  Action,
  AnyAction,
  configureStore,
  Store,
  ThunkAction,
  ThunkDispatch,
} from "@reduxjs/toolkit";
import { AppState } from "./appState";
import { currentQuestionRetrievalReducer as currentQuestionRetrieval } from "../core-logic/reducers/currentQuestionRetrieval.reducer";
import { answerSubmissionValidationReducer as answerSubmissionValidation } from "../core-logic/reducers/answerSubmissionValidation.reducer";
import { pyramidReducer as pyramid } from "../core-logic/reducers/pyramid.reducer";
import { CurrentQuestionGateway } from "../core-logic/gateways/currentQuestionGateway";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { answerSubmissionValidationListenerMiddleware } from "../core-logic/usecases/answer-submission/next-question-retrieval/answerSubmissionValidationListener";

export interface Dependencies {
  currentQuestionGateway: CurrentQuestionGateway;
}

export const initReduxStore = (
  dependencies: Partial<Dependencies>,
  includeRTKListeners?: boolean
) => {
  return configureStore({
    reducer: {
      currentQuestionRetrieval,
      answerSubmissionValidation,
      pyramid,
    },
    middleware: (getDefaultMiddleware) => {
      const middleware = getDefaultMiddleware({
        thunk: {
          extraArgument: dependencies,
        },
        serializableCheck: false,
      });
      if (includeRTKListeners)
        return middleware.prepend(
          answerSubmissionValidationListenerMiddleware.middleware
        );
      return middleware;
    },
    devTools: true,
  });
};

export type ReduxStore = Store<AppState> & {
  dispatch: ThunkDispatch<AppState, Dependencies, Action>;
};

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  Dependencies,
  AnyAction
>;

export type AppDispatch = ThunkDispatch<AppState, Dependencies, Action>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
