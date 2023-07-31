import { Actions } from "../consts";

type OptionsProps = {
  options: string[];
  dispatch: { type: string; payload?: unknown };
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
  const hasAnwer = answer !== "";
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
            hasAnwer ? (i === correctOption ? "correct" : "wrong") : null
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
