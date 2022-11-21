import React from "react";

export default function Question({ question, registerQuestion }) {
  return (
    <div>
      <h1 dangerouslySetInnerHTML={{ __html: question.question }}></h1>
      <div className='answers'>
        {question.answers.map((answer) => {
          return (
            <button
              className={`question--button ${answer.isSelected ? 'selected' : ''}`}
              dangerouslySetInnerHTML={{ __html: answer.answerText }}
              key={answer.answerText}
              onClick={() => registerQuestion(question.id, answer.answerText)}
            ></button>
          );
        })}
      </div>
    </div>
  )
}
