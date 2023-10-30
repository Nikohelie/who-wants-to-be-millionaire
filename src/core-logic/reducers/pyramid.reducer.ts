import { createReducer } from "@reduxjs/toolkit";
import { answerSubmittedAction } from "../usecases/answer-submission/action";
import { PyramidState } from "../../store/appState";

const initialState: PyramidState = {
  structure: [0, 200, 500, 800, 1500, 1000000],
  currentValue: 0,
};

export const pyramidReducer = createReducer<PyramidState>(
  initialState,
  (builder) => {
    builder.addCase(answerSubmittedAction, (state, action) => {
      if (action.payload) {
        if (action.payload.status === "RIGHT")
          return {
            structure: state.structure,
            currentValue:
              state.structure[state.structure.indexOf(state.currentValue) + 1],
          };
        return state;
      }
      return state;
    });
  }
);
