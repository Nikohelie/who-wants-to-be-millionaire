import { AnswerLetter, AppState } from "../../../../store/appState";
import { initReduxStore, ReduxStore } from "../../../../store/reduxStore";
import { answerSubmittedAction } from "../action";
import { AnswerSubmissionValidation } from "../answerSubmissionValidation";

describe("Pyramid update", () => {
  let store: ReduxStore;
  let initialState: AppState;

  beforeEach(() => {
    store = initReduxStore({});
    initialState = store.getState();
  });

  it.each`
    answersHistory   | expectedPyramidValue
    ${""}            | ${0}
    ${"RIGHT"}       | ${200}
    ${"WRONG"}       | ${0}
    ${"RIGHT-RIGHT"} | ${500}
    ${"RIGHT-WRONG"} | ${200}
  `(
    "should update the pyramid at each answer",
    ({ answersHistory, expectedPyramidValue }) => {
      const history = answersHistory.split("-");
      if (history.length > 0) {
        for (const status of history)
          status === "RIGHT"
            ? setRightAnswerValidation()
            : setWrongAnswerValidation();
      }
      expectPyramidValue(expectedPyramidValue);
    }
  );

  const setRightAnswerValidation = () => setAnswerValidation("A", "A", "RIGHT");

  const setWrongAnswerValidation = () => setAnswerValidation("A", "B", "WRONG");

  const setAnswerValidation = (
    correct: AnswerLetter,
    given: AnswerLetter,
    status: AnswerSubmissionValidation["status"]
  ) => {
    store.dispatch(
      answerSubmittedAction({
        correct,
        given,
        status,
      })
    );
  };

  const expectPyramidValue = (expectedPyramidValue: number) => {
    initialState = store.getState();
    expect(store.getState()).toEqual<AppState>({
      ...initialState,
      pyramid: {
        ...initialState.pyramid,
        currentValue: expectedPyramidValue,
      },
    });
  };
});
