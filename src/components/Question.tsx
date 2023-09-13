import { ActionsTypes } from "../consts";
import Options from "./Options";
import { useQuizContext } from "./quiz-context/QuizProvider";

function Question() {
  const { question, dispatch, answer } = useQuizContext();
  const { question: interrogation, options, correctOption, points } = question;
  return (
    <div>
      <h4>{interrogation}</h4>
      <Options
        answer={answer}
        dispatch={dispatch}
        options={options}
        correctOption={correctOption}
        points={points}
      />
    </div>
  );
}

export default Question;
