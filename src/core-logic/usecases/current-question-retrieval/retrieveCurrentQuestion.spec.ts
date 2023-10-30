import { initReduxStore, ReduxStore } from "../../../store/reduxStore";
import { AppState } from "../../../store/appState";
import { retrieveCurrentQuestion } from "./retrieveCurrentQuestion";
import { CurrentQuestionGatewayStub } from "../../../adapters/secondary/gateways/current-gateway/stub/currentQuestionGatewayStub";
import { Question } from "./question";
import { answerSubmittedAction } from "../answer-submission/action";

describe("Current question retrieval", () => {
  let store: ReduxStore;
  let currentQuestionGateway: CurrentQuestionGatewayStub;
  let initialState: AppState;

  beforeEach(() => {
    currentQuestionGateway = new CurrentQuestionGatewayStub();
    store = initReduxStore({ currentQuestionGateway });
    initialState = store.getState();
  });

  it.each`
    expectedCurrentQuestionId | expectedCurrentQuestionLabel | A                 | B                 | C                 | D
    ${"123abc"}               | ${"Qu'est-ce que le TDD ?"}  | ${"answerA"}      | ${"answerB"}      | ${"answerC"}      | ${"answerD"}
    ${"456def"}               | ${"Qu'est-ce que le DDD ?"}  | ${"otherAnswerA"} | ${"otherAnswerB"} | ${"otherAnswerC"} | ${"otherAnswerD"}
  `(
    "should retrieve the current question from a the existing pool randomly",
    async ({
      expectedCurrentQuestionLabel,
      answerA,
      answerB,
      answerC,
      answerD,
    }) => {
      const expectedCurrentQuestion = {
        id: "123abc",
        label: expectedCurrentQuestionLabel,
        answersOptions: {
          A: answerA,
          B: answerB,
          C: answerC,
          D: answerD,
        },
      };
      currentQuestionGateway.feedCurrentQuestionWith(expectedCurrentQuestion);
      await store.dispatch(retrieveCurrentQuestion());
      expectRetrievedCurrentQuestion(expectedCurrentQuestion);
    }
  );

  it("should have cleared the answer validation when retrieving the next question", async () => {
    const nextQuestion: Question = {
      id: "123abc",
      label: "Que signifie l'acronyme TDD ?",
      answersOptions: {
        A: "Toto-Driven Development",
        B: "Test-Driven Development",
        C: "Test-Development Driven",
        D: "La réponse D",
      },
    };
    store.dispatch(
      answerSubmittedAction({
        correct: "B",
        given: "B",
        status: "RIGHT",
      })
    );
    currentQuestionGateway.feedCurrentQuestionWith(nextQuestion);
    await store.dispatch(retrieveCurrentQuestion());
    expect(store.getState()).toEqual<AppState>({
      ...initialState,
      currentQuestionRetrieval: {
        data: nextQuestion,
      },
      pyramid: {
        ...initialState.pyramid,
        currentValue: 200,
      },
      answerSubmissionValidation: { data: null },
    });
  });

  const expectRetrievedCurrentQuestion = (expectedQuestion: Question) => {
    expect(store.getState()).toEqual<AppState>({
      ...initialState,
      currentQuestionRetrieval: {
        data: expectedQuestion,
      },
    });
  };
});
