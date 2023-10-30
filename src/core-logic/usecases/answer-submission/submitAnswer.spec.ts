import { AppState } from "../../../store/appState";
import { initReduxStore, ReduxStore } from "../../../store/reduxStore";
import { submitAnswer } from "./submitAnswer";
import { CurrentQuestionGatewayStub } from "../../../adapters/secondary/gateways/current-gateway/stub/currentQuestionGatewayStub";
import { currentQuestionRetrievedAction } from "../current-question-retrieval/action";

describe("Answer submission", () => {
  let store: ReduxStore;
  let initialState: AppState;
  let currentQuestionGateway: CurrentQuestionGatewayStub;

  beforeEach(() => {
    currentQuestionGateway = new CurrentQuestionGatewayStub();
    store = initReduxStore({ currentQuestionGateway });
    store.dispatch(currentQuestionRetrievedAction(aQuestion));
    initialState = store.getState();
  });

  describe("Before submitting an answer", () => {
    it("should not have submitted any answer", () => {
      expect(store.getState()).toEqual<AppState>({
        ...initialState,
        answerSubmissionValidation: { data: null },
      });
    });
  });

  describe("After submitting an answer", () => {
    it("should have validated the submitted answer", async () => {
      currentQuestionGateway.feedAnswerSubmissionValidation({
        correct: "A",
        given: "A",
        status: "RIGHT",
      });
      await store.dispatch(submitAnswer("A"));
      initialState = store.getState();
      expect(store.getState()).toEqual<AppState>({
        ...initialState,
        answerSubmissionValidation: {
          data: {
            correct: "A",
            given: "A",
            status: "RIGHT",
          },
        },
      });
    });
  });

  const aQuestion = {
    id: "123abc",
    label: "Que signifie l'acronyme TDD ?",
    answersOptions: {
      A: "Toto-Driven Development",
      B: "Test-Development Driven",
      C: "Test-Driven Development",
      D: "La réponse D",
    },
  };
});
