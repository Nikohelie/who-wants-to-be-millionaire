import { selectPyramid } from "./pyramid.selector";
import { PyramidVM } from "./pyramidViewModel";
import { initReduxStore, ReduxStore } from "../../../../../store/reduxStore";
import { answerSubmittedAction } from "../../../../../core-logic/usecases/answer-submission/action";

describe("Pyramid selector", () => {
  let store: ReduxStore;

  beforeEach(() => {
    store = initReduxStore({});
  });

  it("should obtain the pyramid in descending order", () => {
    expect(selectPyramid(store.getState())).toEqual<PyramidVM>({
      structure: ["1 MILLION €", "1.500 €", "800 €", "500 €", "200 €", "0 €"],
      currentValue: "0 €",
    });
  });

  it("should show a gain", () => {
    store.dispatch(
      answerSubmittedAction({
        correct: "A",
        given: "A",
        status: "RIGHT",
      })
    );
    expect(selectPyramid(store.getState())).toEqual<PyramidVM>({
      structure: ["1 MILLION €", "1.500 €", "800 €", "500 €", "200 €", "0 €"],
      currentValue: "200 €",
    });
    for (let i = 0; i < 3; i++)
      store.dispatch(
        answerSubmittedAction({
          correct: "A",
          given: "A",
          status: "RIGHT",
        })
      );
    expect(selectPyramid(store.getState())).toEqual<PyramidVM>({
      structure: ["1 MILLION €", "1.500 €", "800 €", "500 €", "200 €", "0 €"],
      currentValue: "1.500 €",
    });
  });
});
