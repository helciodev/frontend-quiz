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
import Progress from "./Progress";
import Error from "./Error";

const initialState = {
  status: "inactive",
  userPoints: 0,
  questions: [],
  index: 0,
  answer: "",
  error: null,
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
      return {
        ...state,
        answer: action.payload.selected,
        userPoints:
          action.payload.selected === action.payload.correctOption
            ? state.userPoints + action.payload.points
            : state.userPoints,
      };
    case Actions.NEXT:
      return { ...state, index: state.index + 1, answer: "" };
    case Actions.ERROR:
      return { ...state, error: action.payload };
    default:
      throw new Error("Something went wrong!");
  }
}

function App() {
  const [{ status, userPoints, questions, index, answer, error }, dispatch] =
    useReducer(reducer, initialState);

  // derivate state
  const question = questions[index];
  const totalNumQuestions = questions.length;
  const totalPoints = questions.reduce((acc, { points }) => acc + points, 0);
  console.log({ userPoints });

  useEffect(() => {
    const getQuestions = async (): Promise<void> => {
      try {
        dispatch({ type: Actions.IS_LOADING });
        const res = await fetch(questionsUrl);
        const data: QuestionInterface[] = await res.json();

        dispatch({ type: Actions.ACTIVE, payload: data });
      } catch (error) {
        console.error(error);
        console.log({ error });
        dispatch({ type: "error", payload: error.TypeError });
      }
    };
    getQuestions();
  }, []);

  return (
    <div className='app'>
      <GameTitle />
      <Main>
        {status === Actions.ERROR && <Error errorMessage={error} />}
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
            <NextQuestionButton answer={answer} dispatch={dispatch} />
          </>
        )}
      </Main>
    </div>
  );
}

export default App;
