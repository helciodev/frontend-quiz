import { Actions, ActionsTypes } from "../consts";
import { useQuizContext } from "./quiz-context/QuizProvider";

function NextQuestionButton() {
  const { dispatch, answer, index, totalNumQuestions } = useQuizContext();
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
