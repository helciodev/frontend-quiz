import { ActionsTypes } from "../consts";
import Options from "./Options";
type Question = {
  question: string;
  options: string[];
  correctOption: number;
  points: number;
};
type QuestionProps = {
  question: Question;
  dispatch: React.Dispatch<ActionsTypes>;
  answer: string | number;
};

function Question({ question, dispatch, answer }: QuestionProps) {
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
