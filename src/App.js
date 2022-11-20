import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import IntroScreen from './components/IntoScreen';
import Question from './components/Question';
import './App.css';

function App() {
  const [startGame, setStartGame] = useState(false);
  const [questions, setQuestions] = useState([]);

  function startQuiz() {
    setStartGame(true);
  }

  useEffect(() => {
    (async function getQuiz() {
      const response = await fetch('https://opentdb.com/api.php?amount=5');
      const data = await response.json();
      setQuestions(data.results.map(res => ({ ...res, id: nanoid(), answer: '' })));
    })();
  }, [startGame]);

  function registerQuestion(event, questionId, answer) {
    setQuestions(prevQuestions => prevQuestions.map(q => q.id === questionId ? { ...q, answer: answer } : { ...q, answer: '' }));
    const allButtons = event.target.parentNode.childNodes;
    allButtons.forEach(button => button.classList.remove('selected'));
    event.target.classList.add('selected');
  }


  return (
    <div className="App center--content">
      <div className='decoration decoration--left'></div>
      <div className='decoration decoration--right'></div>
      {startGame ?
        <div className='questions--wrapper center--content'>
          {questions.map(question => <Question key={question.id} question={question} registerQuestion={registerQuestion} />)}
          <div className='center--content' id='button--wrapper'>
            <button>Check answers</button>
          </div>
        </div> :
        <IntroScreen startQuiz={startQuiz} />}
    </div>
  );
}

export default App;
