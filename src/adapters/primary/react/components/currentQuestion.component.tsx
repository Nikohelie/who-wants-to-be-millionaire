import { QuestionTitle } from "./questionTitle.component";
import { AnswersOptions } from "./answersOptions.component";
import { useEffect, useRef } from "react";
import { retrieveCurrentQuestion } from "../../../../core-logic/usecases/current-question-retrieval/retrieveCurrentQuestion";
import { useAppDispatch, useAppSelector } from "../../../../store/reduxStore";

export const CurrentQuestion = () => {
  const dispatch = useAppDispatch();
  const currentQuestion = useAppSelector(
    (state) => state.currentQuestionRetrieval.data
  );
  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) {
      dispatch(retrieveCurrentQuestion());

      mounted.current = true;
    }
  }, [dispatch]);

  return (
    <>
      {currentQuestion && (
        <div>
          <QuestionTitle title={currentQuestion.label} />
          <AnswersOptions />
        </div>
      )}
    </>
  );
};
