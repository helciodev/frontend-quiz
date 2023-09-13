import React, { createContext, useContext, useEffect, useReducer } from "react";
import {
  Actions,
  ActionsTypes,
  TIME_PER_QUESTION,
  QuestionInterface,
  InitialStateType,
} from "../../consts";

const QuizContext = createContext();
const questionsUrl =
  "https://frontentd-quiz-server-vercel.vercel.app/questions";

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

function QuizProvider({ children }: { children: React.ReactNode }) {
  const [
    { status, userPoints, questions, index, answer, highScore, time },
    dispatch,
  ] = useReducer(reducer, initialState);
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
    <QuizContext.Provider
      value={{
        status,
        userPoints,
        questions,
        index,
        answer,
        highScore,
        time,
        dispatch,
        question,
        totalNumQuestions,
        totalPoints,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuizContext() {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error("Quiz context was used outside the QuizProvider!");
  }

  return context;
}

export { QuizProvider, useQuizContext };
