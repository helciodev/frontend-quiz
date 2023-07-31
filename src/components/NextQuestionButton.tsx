import { Actions } from "../consts";
function NextQuestionButton({ dispatch, answer }) {
  return (
    answer !== "" && (
      <button
        onClick={() => dispatch({ type: Actions.NEXT })}
        className='btn btn-ui'
      >
        Next
      </button>
    )
  );
}

export default NextQuestionButton;
