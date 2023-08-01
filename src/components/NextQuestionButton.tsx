import { Actions, ActionsTypes } from "../consts";

type NextQuestionButtonProps = {
  dispatch: React.Dispatch<ActionsTypes>;
  answer: string | number;
  index: number;
  totalNumQuestions: number;
};
function NextQuestionButton({
  dispatch,
  answer,
  index,
  totalNumQuestions,
}: NextQuestionButtonProps) {
  if (answer !== "" && totalNumQuestions - 1 > index)
    return (
      <button
        onClick={() => dispatch({ type: Actions.NEXT })}
        className='btn btn-ui'
      >
        Next
      </button>
    );

  if (answer !== "" && totalNumQuestions - 1 === index)
    return (
      <button
        onClick={() => dispatch({ type: Actions.FINISH_GAME })}
        className='btn btn-ui'
      >
        Finish Game
      </button>
    );
}

export default NextQuestionButton;
