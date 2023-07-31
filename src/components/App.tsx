const questionsUrl: string = "http://localhost:3005/questions";
import Main from "./Main";
import Loading from "./Loading";
import { useEffect, useReducer } from "react";
import StartGame from "./StartGame";
import GameTitle from "./GameTitle";
import Question from "./Question";
import NextQuestionButton from "./NextQuestionButton";
import { Actions, ActionsTypes } from "../consts";
import { QuestionInterface } from "../consts";

const initialState = {
  status: "inactive",
  userPoints: 0,
  questions: [],
  index: 0,
  answer: "",
};

function reducer(state: typeof initialState, action: ActionsTypes) {
  switch (action.type) {
    case Actions.IS_LOADING:
      return { ...state, status: Actions.IS_LOADING };
    case Actions.ACTIVE:
      return { ...state, status: Actions.ACTIVE, questions: action.payload };
    case Actions.START:
      return { ...state, status: Actions.START };
    case Actions.OPTION_SELECTED:
      return { ...state, answer: action.payload.selected };
    case Actions.NEXT:
      return { ...state, index: (state.index += 1), answer: "" };
    default:
      throw new Error("Something went wrong!");
  }
}

function App() {
  const [{ status, userPoints, questions, index, answer }, dispatch] =
    useReducer(reducer, initialState);

  // derivate state
  const question = questions[index];
  console.log(answer);

  useEffect(() => {
    const getQuestions = async (): Promise<void> => {
      try {
        dispatch({ type: Actions.IS_LOADING });
        const res = await fetch(questionsUrl);
        const data: QuestionInterface[] = await res.json();

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
        {status === Actions.START && (
          <>
            <Question answer={answer} dispatch={dispatch} question={question} />
            <NextQuestionButton answer={answer} dispatch={dispatch} />
          </>
        )}
      </Main>
    </div>
  );
}

export default App;
