function Progress({ totalNumQuestions, totalPoints, index, userPoints }) {
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
