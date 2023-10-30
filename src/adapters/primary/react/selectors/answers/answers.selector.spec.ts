import { AnswerOptionsVM, HighlightStatus } from "./answerOptionsVM";
import { initReduxStore, ReduxStore } from "../../../../../store/reduxStore";
import { selectAnswers } from "./answers.selector";
import { currentQuestionRetrievedAction } from "../../../../../core-logic/usecases/current-question-retrieval/action";
import { AnswerLetter } from "../../../../../store/appState";
import { answerSubmittedAction } from "../../../../../core-logic/usecases/answer-submission/action";

describe("Answers selector", () => {
  let store: ReduxStore;

  beforeEach(() => {
    store = initReduxStore({});
  });

  describe("Before retrieving the current question", () => {
    it("should not get any answers", () => {
      expect(selectAnswers(store.getState())).toBeNull();
    });
  });

  describe("After retrieving a question", () => {
    beforeEach(() => {
      store.dispatch(
        currentQuestionRetrievedAction({
          id: "123abc",
          label: "Parmi les termes suivants, lequel est lié à l'informatique ?",
          answersOptions: {
            A: "HTML",
            B: "MHTL",
            C: "THML",
            D: "LMHT",
          },
        })
      );
    });

    describe("Before submitting an answer", () => {
      it("should not highlight any answer option", () => {
        expectAnswerOptionsVM({
          A: "NONE",
          B: "NONE",
          C: "NONE",
          D: "NONE",
        });
      });
    });

    describe("After submitting an answer", () => {
      it.each`
        correct | given  | status     | statusA    | statusB    | statusC    | statusD
        ${"A"}  | ${"A"} | ${"RIGHT"} | ${"RIGHT"} | ${"NONE"}  | ${"NONE"}  | ${"NONE"}
        ${"A"}  | ${"B"} | ${"WRONG"} | ${"RIGHT"} | ${"WRONG"} | ${"NONE"}  | ${"NONE"}
        ${"C"}  | ${"B"} | ${"WRONG"} | ${"NONE"}  | ${"WRONG"} | ${"RIGHT"} | ${"NONE"}
      `(
        "should highlight a right answer",
        ({ correct, given, status, statusA, statusB, statusC, statusD }) => {
          store.dispatch(
            answerSubmittedAction({
              correct,
              given,
              status,
            })
          );
          expectAnswerOptionsVM({
            A: statusA,
            B: statusB,
            C: statusC,
            D: statusD,
          });
        }
      );
    });
  });

  const expectAnswerOptionsVM = (
    highlightStatusByAnswerOption: Record<AnswerLetter, HighlightStatus>
  ) => {
    const answers = selectAnswers(store.getState());
    const expectedAnswers = JSON.stringify({
      A: {
        label: "HTML",
        highlightStatus: highlightStatusByAnswerOption["A"],
      },
      B: {
        label: "MHTL",
        highlightStatus: highlightStatusByAnswerOption["B"],
      },
      C: {
        label: "THML",
        highlightStatus: highlightStatusByAnswerOption["C"],
      },
      D: {
        label: "LMHT",
        highlightStatus: highlightStatusByAnswerOption["D"],
      },
    });

    expect(JSON.stringify(answers)).toEqual(expectedAnswers);
  };
});
