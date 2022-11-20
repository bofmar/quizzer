import React, { useState } from "react";

export default function Question({ question, registerQuestion }) {
  const [answers, setAnswers] = useState(shuffle([question.correct_answer, ...question.incorrect_answers]));

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
        {answers.map(answer => <button className='question--button' dangerouslySetInnerHTML={{ __html: answer }} key={answer} onClick={(event) => registerQuestion(event, question.id, answer)}></button>)}
      </div>
    </div>
  )
}
