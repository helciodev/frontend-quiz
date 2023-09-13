import { useQuizContext } from "./quiz-context/QuizProvider";

function Progress() {
  const { totalNumQuestions, totalPoints, index, userPoints } =
    useQuizContext();
  return (
    <header className='progress'>
      <progress max={totalNumQuestions} value={index + 1}></progress>
      <p>
        Question <strong>{index + 1}</strong> / {totalNumQuestions}
      </p>
      <p>
        <strong>{userPoints}</strong> / {totalPoints}
      </p>
    </header>
  );
}

export default Progress;
