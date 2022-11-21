import React, { useState } from "react";

export default function Question({ question, registerQuestion }) {
  return (
    <div>
      <h1 dangerouslySetInnerHTML={{ __html: question.question }}></h1>
      <div className='answers'>
        {question.answers.map((answer, index) => <button className='question--button' dangerouslySetInnerHTML={{ __html: answer.answerText }} key={answer.answerText} ></button>)}
      </div>
    </div>
  )
}
