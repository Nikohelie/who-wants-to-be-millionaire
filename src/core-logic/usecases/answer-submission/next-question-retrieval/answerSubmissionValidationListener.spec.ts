import { initReduxStore, ReduxStore } from "../../../../store/reduxStore";
import { CurrentQuestionGatewayStub } from "../../../../adapters/secondary/gateways/current-gateway/stub/currentQuestionGatewayStub";
import { currentQuestionRetrievedAction } from "../../current-question-retrieval/action";
import { AppState } from "../../../../store/appState";
import { answerSubmittedAction } from "../action";
import { Question } from "../../current-question-retrieval/question";

describe("Answer submission validation listener", () => {
  let store: ReduxStore;
  let currentQuestionGateway: CurrentQuestionGatewayStub;
  let initialState: AppState;

  beforeEach(() => {
    currentQuestionGateway = new CurrentQuestionGatewayStub();
    store = initReduxStore({ currentQuestionGateway }, true);
    jest.useFakeTimers();
  });

  it("should retrieve next question if answer validation is right and waiting time past", async () => {
    // GIVEN
    store.dispatch(currentQuestionRetrievedAction(pastQuestion));
    currentQuestionGateway.feedCurrentQuestionWith(currentQuestion);
    // WHEN - triggers the listener
    store.dispatch(
      answerSubmittedAction({
        correct: "A",
        given: "A",
        status: "RIGHT",
      })
    );
    // THEN
    jest.advanceTimersByTime(1000);
    await expectCurrentQuestion(currentQuestion);
  });

  it("should not retrieve next question if answer validation is right and waiting time NOT past", async () => {
    // GIVEN
    store.dispatch(currentQuestionRetrievedAction(pastQuestion));
    currentQuestionGateway.feedCurrentQuestionWith(currentQuestion);
    // WHEN - triggers the listener
    store.dispatch(
      answerSubmittedAction({
        correct: "A",
        given: "A",
        status: "RIGHT",
      })
    );
    // THEN
    jest.advanceTimersByTime(999); // 1ms before the end of the waiting time
    await expectCurrentQuestion(pastQuestion);
  });

  it("should not retrieve next question if answer validation is wrong", async () => {
    store.dispatch(currentQuestionRetrievedAction(pastQuestion));
    currentQuestionGateway.feedCurrentQuestionWith(currentQuestion);
    // WHEN - triggers the listener
    store.dispatch(
      answerSubmittedAction({
        correct: "A",
        given: "B",
        status: "WRONG",
      })
    );
    jest.advanceTimersByTime(1000);
    await expectCurrentQuestion(pastQuestion);
  });

  const pastQuestion = {
    id: "123abc",
    label: "Que signifie l'acronyme TDD ?",
    answersOptions: {
      A: "Toto-Driven Development",
      B: "Test-Driven Development",
      C: "Test-Development Driven",
      D: "La réponse D",
    },
  };

  const currentQuestion = {
    id: "456def",
    label: "Que signifie l'acronyme CQRS ?",
    answersOptions: {
      A: "Cool Query Responsibility Segregation",
      B: "Command Quiz Responsibility Segregation",
      C: "Command Query Responsibility Segregation",
      D: "La réponse D",
    },
  };

  const expectCurrentQuestion = (expectedQuestion: Question) =>
    new Promise((resolve, reject) => {
      jest.useRealTimers(); // important to run the setTimeout below realistically
      setTimeout(() => {
        initialState = store.getState();
        try {
          resolve(
            expect(store.getState()).toEqual<AppState>({
              ...initialState,
              currentQuestionRetrieval: { data: expectedQuestion },
            })
          );
        } catch (e) {
          reject(e);
        }
      }, 0);
    });
});
