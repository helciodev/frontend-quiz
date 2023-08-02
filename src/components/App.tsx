const questionsUrl: string =
  "https://frontentd-quiz-server-vercel.vercel.app/questions";
import { useEffect, useReducer } from "react";

import {
  Actions,
  ActionsTypes,
  TIME_PER_QUESTION,
  QuestionInterface,
  InitialStateType,
} from "../consts";

import Main from "./Main";
import Loading from "./Loading";
import StartGame from "./StartGame";
import GameTitle from "./GameTitle";
import Question from "./Question";
import NextQuestionButton from "./NextQuestionButton";
import Progress from "./Progress";
import ErrorMessage from "./ErrorMessage";
import FinishScreen from "./FinishScreen";
import Counter from "./Counter";
import Footer from "./Footer";

const initialState: InitialStateType = {
  status: "inactive",
  userPoints: 0,
  questions: [],
  index: 0,
  answer: "",
  highScore: 0,
  time: 0,
};

function reducer(state: typeof initialState, action: ActionsTypes) {
  switch (action.type) {
    case Actions.IS_LOADING:
      return { ...state, status: Actions.IS_LOADING };
    case Actions.ACTIVE:
      return {
        ...state,
        status: Actions.ACTIVE,
        questions: action.payload,
      };
    case Actions.START:
      return {
        ...state,
        status: Actions.START,
        time: state.questions.length * TIME_PER_QUESTION,
      };
    case Actions.OPTION_SELECTED:
      return {
        ...state,
        answer: action.payload.selected,
        userPoints:
          action.payload.selected === action.payload.correctOption
            ? state.userPoints + action.payload.points
            : state.userPoints,
      };
    case Actions.TIMER:
      return {
        ...state,
        time: state.time - 1,
        status: state.time === 0 ? Actions.FINISH_GAME : state.status,
      };
    case Actions.NEXT:
      return { ...state, index: state.index + 1, answer: "" };
    case Actions.FINISH_GAME:
      return {
        ...state,
        status: Actions.FINISH_GAME,
        highScore:
          state.userPoints > state.highScore
            ? state.userPoints
            : state.highScore,
      };
    case Actions.RESTART_GAME:
      return {
        ...initialState,
        questions: state.questions,
        status: Actions.ACTIVE,
        highScore: state.highScore,
      };
    case Actions.ERROR:
      return { ...state, status: Actions.ERROR };
    default:
      throw new Error("Something went wrong!");
  }
}

function App() {
  const [
    { status, userPoints, questions, index, answer, highScore, time },
    dispatch,
  ] = useReducer(reducer, initialState);

  // derivate state
  const question = questions[index];
  const totalNumQuestions = questions.length;
  const totalPoints = questions.reduce(
    (acc: number, { points }: QuestionInterface) => acc + points,
    0
  );

  useEffect(() => {
    const getQuestions = async (): Promise<void> => {
      try {
        dispatch({ type: Actions.IS_LOADING });
        const res = await fetch(questionsUrl);
        const data = await res.json();

        dispatch({ type: Actions.ACTIVE, payload: data });
      } catch (error) {
        console.error(error);
        console.log({ error });
        dispatch({ type: Actions.ERROR });
      }
    };
    getQuestions();
  }, []);

  return (
    <div className='app'>
      <GameTitle />
      <Main>
        {status === Actions.ERROR && <ErrorMessage />}
        {status === Actions.IS_LOADING && <Loading />}
        {status === Actions.ACTIVE && <StartGame dispatch={dispatch} />}
        {status === Actions.START && (
          <>
            <Progress
              totalNumQuestions={totalNumQuestions}
              totalPoints={totalPoints}
              index={index}
              userPoints={userPoints}
            />
            <Question answer={answer} dispatch={dispatch} question={question} />
            <Footer>
              <Counter time={time} dispatch={dispatch} />
              <NextQuestionButton
                totalNumQuestions={totalNumQuestions}
                index={index}
                answer={answer}
                dispatch={dispatch}
              />
            </Footer>
          </>
        )}
        {status === Actions.FINISH_GAME && (
          <FinishScreen
            userPoints={userPoints}
            totalPoints={totalPoints}
            highScore={highScore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
