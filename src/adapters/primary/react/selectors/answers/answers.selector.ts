import { AppState } from "../../../../../store/appState";
import { AnswerOptionsVM } from "./answerOptionsVM";
import { Question } from "../../../../../core-logic/usecases/current-question-retrieval/question";
import { AnswerSubmissionValidation } from "../../../../../core-logic/usecases/answer-submission/answerSubmissionValidation";

export const selectAnswers = (state: AppState): AnswerOptionsVM | null => {
  const question = state.currentQuestionRetrieval.data!;
  if (!question) return null;
  const answerValidation = state.answerSubmissionValidation.data;
  const defaultAnswerOptionsVM = makeDefaultVM(question);
  if (!answerValidation) return defaultAnswerOptionsVM;
  const answerOptionsVM = Object.entries(defaultAnswerOptionsVM).reduce(
    (acc, [letter, { label }]) => {
      return markGivenAnswerAsWrongByDefault(
        acc,
        letter,
        label,
        answerValidation
      );
    },
    {} as AnswerOptionsVM
  );
  return markGoodAnswer(answerOptionsVM, question, answerValidation);
};

const makeDefaultVM = (question: Question) =>
  Object.entries(question.answersOptions).reduce((acc, [letter, label]) => {
    return {
      ...acc,
      [letter]: {
        label,
        highlightStatus: "NONE",
      },
    };
  }, {} as AnswerOptionsVM);

const markGivenAnswerAsWrongByDefault = (
  acc: AnswerOptionsVM,
  letter: string,
  label: string,
  answerValidation: AnswerSubmissionValidation
) => {
  return {
    ...acc,
    [letter]: {
      label,
      highlightStatus: answerValidation.given === letter ? "WRONG" : "NONE",
    },
  };
};

const markGoodAnswer = (
  answerOptionsVM: AnswerOptionsVM,
  question: Question,
  answerValidation: AnswerSubmissionValidation
) => {
  return {
    ...answerOptionsVM,
    [answerValidation.correct]: {
      label: question.answersOptions[answerValidation.correct],
      highlightStatus: "RIGHT",
    },
  };
};
