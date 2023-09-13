import { useEffect } from "react";
import { Actions } from "../consts";
import { useQuizContext } from "./quiz-context/QuizProvider";

function Counter() {
  const { time, dispatch } = useQuizContext();
  const min = Math.floor(time / 60);
  const seconds = time % 60;

  useEffect(() => {
    const timeOutId = setInterval(() => {
      dispatch({ type: Actions.TIMER });
    }, 1000);
    return () => clearInterval(timeOutId);
  }, [dispatch]);
  return (
    <div className='timer'>
      {min < 10 && "0"}
      {min}: {seconds < 10 && "0"}
      {seconds}
    </div>
  );
}

export default Counter;
