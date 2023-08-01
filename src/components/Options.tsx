import { Actions, ActionsTypes } from "../consts";

type OptionsProps = {
  options: string[];
  dispatch: React.Dispatch<ActionsTypes>;
  points: number;
  correctOption: number;
  answer: string | number;
};

function Options({
  options,
  dispatch,
  points,
  correctOption,
  answer,
}: OptionsProps) {
  const hasAnswer = answer !== "";
  return (
    <div className='options'>
      {options.map((option, i) => (
        <button
          key={option}
          onClick={() =>
            dispatch({
              type: Actions.OPTION_SELECTED,
              payload: { points, correctOption, selected: i },
            })
          }
          className={`btn btn-option ${i === answer ? "answer" : ""} ${
            hasAnswer ? (i === correctOption ? "correct" : "wrong") : null
          }`}
          disabled={hasAnswer}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
