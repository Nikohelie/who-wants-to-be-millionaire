import { CurrentQuestion } from "./currentQuestion.component";
import { Jokers } from "./jokers.component";
import { Pyramid } from "./pyramid.component";

const App = () => {
  return (
    <div className="App">
      <div className="flex justify-between mx-3">
        <div className="flex flex-col w-6/12">
          <CurrentQuestion />
        </div>
        <div className="flex flex-col w-3/12">
          <Jokers />
          <Pyramid />
        </div>
      </div>
    </div>
  );
};

export default App;
