import React from "react";

export default function IntroScreen({ startQuiz }) {
  return (
    <div className='intro--wrapper center--content'>
      <h1>Quizzer</h1>
      <p>Test your knowledge!</p>
      <button className='no--select' onClick={startQuiz}>Star quiz</button>
    </div>
  );
}
