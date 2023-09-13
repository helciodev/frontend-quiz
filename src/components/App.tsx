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
import { Actions } from "../consts";
import { useQuizContext } from "./quiz-context/QuizProvider";

function App() {
  const { status, dispatch } = useQuizContext();

  return (
    <div className='app'>
      <GameTitle />
      <Main>
        {status === Actions.ERROR && <ErrorMessage />}
        {status === Actions.IS_LOADING && <Loading />}
        {status === Actions.ACTIVE && <StartGame dispatch={dispatch} />}
        {status === Actions.START && (
          <>
            <Progress />
            <Question />
            <Footer>
              <Counter />
              <NextQuestionButton />
            </Footer>
          </>
        )}
        {status === Actions.FINISH_GAME && <FinishScreen />}
      </Main>
    </div>
  );
}

export default App;
