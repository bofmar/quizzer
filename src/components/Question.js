import React from "react";

export default function Question({ question }) {
  const answers = [question.correct_answer, ...question.incorrect_answers];

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;

  }

  return (
    <div>
      <h1 dangerouslySetInnerHTML={{ __html: question.question }}></h1>
      <div className='answers'>
        {shuffle(answers).map(answer => <button className='question--button' dangerouslySetInnerHTML={{ __html: answer }} key={answer}></button>)}
      </div>
    </div>
  )
}
