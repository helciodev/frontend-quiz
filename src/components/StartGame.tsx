import { Actions, ActionsTypes } from "../consts";

type StartGameType = {
  dispatch: React.Dispatch<ActionsTypes>;
}


function StartGame({ dispatch }: StartGameType) {
  return (
    <div className='start'>
      <h2>Welcome to The React Quiz!</h2>
      <h3>15 questions to test your React mastery</h3>
      <button
        onClick={() => dispatch({ type: Actions.START })}
        className='btn btn-ui'
      >
        Let's start
      </button>
    </div>
  );
}

export default StartGame;
