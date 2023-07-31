const questionsUrl: string = "http://localhost:3005/questions";
import Main from "./Main";
import Loading from "./Loading";
import { useEffect, useReducer } from "react";
import StartGame from "./StartGame";
import GameTitle from "./GameTitle";
import Question from "./Question";

export enum Actions {
  IS_LOADING = "IS_LOADING",
  ACTIVE = "ACTIVE",
  START = "START",
}
const initialState = {
  status: "inactive",
  userPoints: 0,
  questions: [],
  index: 0,
};
function reducer(state, action) {
  switch (action.type) {
    case Actions.IS_LOADING:
      return { ...state, status: Actions.IS_LOADING };
    case Actions.ACTIVE:
      return { ...state, status: Actions.ACTIVE, questions: action.payload };
    case Actions.START:
      return { ...state, status: Actions.START };
    default:
      throw new Error("Something went wrong!");
  }
}

interface Question {
  question: string;
  options: string[];
  correctOption: number;
  points: number;
}
function App() {
  const [{ status, userPoints, questions, index }, dispatch] = useReducer(
    reducer,
    initialState
  );

  // derivate state
  const question = questions[index];
  useEffect(() => {
    const getQuestions = async (): Promise<void> => {
      try {
        dispatch({ type: Actions.IS_LOADING });
        const res = await fetch(questionsUrl);
        const data: Question[] = await res.json();

        dispatch({ type: Actions.ACTIVE, payload: data });
      } catch (error) {
        console.error(error);
      }
    };
    getQuestions();
  }, []);
  return (
    <div className='app'>
      <GameTitle />
      <Main>
        {status === Actions.IS_LOADING && <Loading />}
        {status === Actions.ACTIVE && <StartGame dispatch={dispatch} />}
        {status === Actions.START && <Question question={question} />}
      </Main>
    </div>
  );
}

export default App;
