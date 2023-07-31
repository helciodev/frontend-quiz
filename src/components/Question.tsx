import Option from "./Option";
type QuestionProps = {
  question: string;
  options: string[];
  correctOption: number;
  points: number;
};

function Question({ question }) {
  console.log(question);

  return (
    <div>
      <h4>Which is the most popular JavaScript framework?</h4>
      <div className='options'>
        <button className='btn btn-option  '>Angular</button>
        <button className='btn btn-option  '>React</button>
        <button className='btn btn-option  '>Svelte</button>
        <button className='btn btn-option  '>Vue</button>
      </div>
    </div>
  );
}

export default Question;
