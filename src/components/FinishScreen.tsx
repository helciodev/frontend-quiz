import { showEmoji } from "../helpers";
import { Actions, ActionsTypes } from "../consts";
type FinishScreenProps = {
  userPoints: number;
  totalPoints: number;
  highScore: number;
  dispatch: React.Dispatch<ActionsTypes>;
};
function FinishScreen({
  userPoints,
  totalPoints,
  highScore,
  dispatch,
}: FinishScreenProps) {
  return (
    <>
      <p className='result'>
        <span>{showEmoji(userPoints)}</span> You scored{" "}
        <strong>{userPoints}</strong> out of {totalPoints} (
        {((userPoints * 100) / totalPoints).toFixed(2)}%)
      </p>
      <p className='highscore'>(Highscore: {highScore} points)</p>
      <button
        className='btn btn-ui'
        onClick={() => dispatch({ type: Actions.RESTART_GAME })}
      >
        Restart quiz
      </button>
    </>
  );
}

export default FinishScreen;
