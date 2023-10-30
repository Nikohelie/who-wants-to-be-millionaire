import { CurrentQuestionGateway } from "../../../../../core-logic/gateways/currentQuestionGateway";
import { FakeCurrentQuestionGateway } from "./fakeCurrentQuestionGateway";
import { AnswerLetter } from "../../../../../store/appState";

describe("Fake current question gateway", () => {
  let currentQuestionGateway: CurrentQuestionGateway;

  beforeEach(() => {
    currentQuestionGateway = new FakeCurrentQuestionGateway(
      questionsPool,
      correctAnswerByQuestionId
    );
  });

  describe("Current question loading", () => {
    it("should load the first question from the pool", async () => {
      const expectedCurrentQuestion = {
        id: "123abc",
        label: "Que signifie l'acronyme TDD ?",
        answersOptions: {
          A: "Toto-Driven Development",
          B: "Test-Development Driven",
          C: "Test-Driven Development",
          D: "La réponse D",
        },
      };
      expect(await currentQuestionGateway.loadCurrentQuestion()).toEqual(
        expectedCurrentQuestion
      );
    });

    it("should load the next question from the pool", async () => {
      await currentQuestionGateway.loadCurrentQuestion();
      const expectedCurrentQuestion = {
        id: "456def",
        label: "Que signifie l'acronyme DDD ?",
        answersOptions: {
          A: "Domain-Driven Design",
          B: "Dodo-Driven Design",
          C: "Dark-Driven Development",
          D: "La réponse D",
        },
      };
      expect(await currentQuestionGateway.loadCurrentQuestion()).toEqual(
        expectedCurrentQuestion
      );
    });
  });

  describe("Answer submission", () => {
    it("should validate a submitted answer", async () => {
      expect(await currentQuestionGateway.submitAnswer("123abc", "C")).toEqual({
        correct: "C",
        given: "C",
        status: "RIGHT",
      });
      expect(await currentQuestionGateway.submitAnswer("456def", "B")).toEqual({
        correct: "A",
        given: "B",
        status: "WRONG",
      });
    });
  });

  const questionsPool = [
    {
      id: "123abc",
      label: "Que signifie l'acronyme TDD ?",
      answersOptions: {
        A: "Toto-Driven Development",
        B: "Test-Development Driven",
        C: "Test-Driven Development",
        D: "La réponse D",
      },
    },
    {
      id: "456def",
      label: "Que signifie l'acronyme DDD ?",
      answersOptions: {
        A: "Domain-Driven Design",
        B: "Dodo-Driven Design",
        C: "Dark-Driven Development",
        D: "La réponse D",
      },
    },
  ];

  const correctAnswerByQuestionId: Record<string, AnswerLetter> = {
    "123abc": "C",
    "456def": "A",
  };
});
