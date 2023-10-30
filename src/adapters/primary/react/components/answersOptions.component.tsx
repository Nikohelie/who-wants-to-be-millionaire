import React from "react";
import { useAppDispatch, useAppSelector } from "../../../../store/reduxStore";
import { submitAnswer } from "../../../../core-logic/usecases/answer-submission/submitAnswer";
import { AnswerLetter } from "../../../../store/appState";
import {
  AnswerOptionsVM,
  HighlightStatus,
} from "../selectors/answers/answerOptionsVM";
import { selectAnswers } from "../selectors/answers/answers.selector";
import classNames from "classnames";

const answerOptionsHighlightColors: Record<HighlightStatus, string> = {
  RIGHT: "bg-green-600",
  WRONG: "bg-orange-600",
  NONE: "bg-gray-900",
};

export const AnswersOptions = () => {
  const dispatch = useAppDispatch();
  const answerOptions: AnswerOptionsVM = useAppSelector(selectAnswers)!;

  const onAnswerSelection = (letter: AnswerLetter) => () => {
    dispatch(submitAnswer(letter));
  };

  return (
    <div className="w-full justify-center grid grid-cols-2 text-white gap-4 font-mono text-sm text-left font-bold leading-6 bg-stripes-fuchsia rounded-lg">
      {Object.entries(answerOptions).map(
        ([letter, { label, highlightStatus }]) => {
          return (
            <div
              key={letter}
              className={classNames(
                "border-3 border-blue-300 rounded-lg px-3 py-1",
                answerOptionsHighlightColors[highlightStatus]
              )}
              onClick={onAnswerSelection(letter as AnswerLetter)}
            >
              <span className="text-orange-500">{letter}:</span> {label}
            </div>
          );
        }
      )}
    </div>
  );
};
