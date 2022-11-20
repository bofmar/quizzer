import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import IntroScreen from './components/IntoScreen';
import Question from './components/Question';
import './App.css';

function App() {
  const [startGame, setStartGame] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [gameOver, setGameOver] = useState({ finished: false, score: 0 });

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
    setQuestions(prevQuestions => prevQuestions.map(q => q.id === questionId ? { ...q, answer: answer } : q));
    const allButtons = event.target.parentNode.childNodes;
    allButtons.forEach(button => button.classList.remove('selected'));
    event.target.classList.add('selected');
  }

  function checkQuestions() {
    let tally = 0;
    questions.forEach(question => {
      if (question.answer === question.correct_answer) {
        tally++;
      }
    });
    setGameOver({ finished: true, score: tally })
  }

  return (
    <div className="App center--content">
      <div className='decoration decoration--left'></div>
      <div className='decoration decoration--right'></div>
      {startGame ?
        <div className='questions--wrapper center--content'>
          {questions.map(question => <Question key={question.id} question={question} registerQuestion={registerQuestion} />)}
          <div className='center--content' id='button--wrapper'>
            {gameOver.finished && <h1>You scored {gameOver.score}/5 answers</h1>}
            <button onClick={checkQuestions}>Check answers</button>
          </div>
        </div> :
        <IntroScreen startQuiz={startQuiz} />}
    </div>
  );
}

export default App;
