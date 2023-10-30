import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./who-wants-to-be-millionaire/adapters/primary/react/components/App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { initReduxStore } from "./who-wants-to-be-millionaire/store/reduxStore";
import { FakeCurrentQuestionGateway } from "./who-wants-to-be-millionaire/adapters/secondary/gateways/current-gateway/fake/fakeCurrentQuestionGateway";
import { AnswerLetter } from "./who-wants-to-be-millionaire/store/appState";
import { questionsPool } from "./who-wants-to-be-millionaire/inMemoryQuestionsPool";

const correctAnswerByQuestionId: Record<string, AnswerLetter> = {
  "123abc": "B",
  "456def": "C",
  "789eee": "B",
  "999aaa": "A",
  "888ddd": "D",
};

const currentQuestionGateway = new FakeCurrentQuestionGateway(
  questionsPool,
  correctAnswerByQuestionId
);
const store = initReduxStore({ currentQuestionGateway }, true);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
