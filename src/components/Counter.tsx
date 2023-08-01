import { useEffect } from "react";
import { Actions, ActionsTypes } from "../consts";

type CounterProps = {
  time: number;
  dispatch: React.Dispatch<ActionsTypes>;
};
function Counter({ time, dispatch }: CounterProps) {
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
