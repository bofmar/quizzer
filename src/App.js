import React, { useState, useEffect, useRef } from 'react';
import { nanoid } from 'nanoid';
import IntroScreen from './components/IntoScreen';
import Question from './components/Question';
import './App.css';

function App() {
  const shouldFetch = useRef(true);
  const [startGame, setStartGame] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [gameOver, setGameOver] = useState({ finished: false, score: 0 });

  function startQuiz() {
    setStartGame(true);
  }

  useEffect(() => {
    if (shouldFetch.current) {
      (async function getQuiz() {
        const response = await fetch('https://opentdb.com/api.php?amount=5');
        const data = await response.json();
        setQuestions(data.results.map(res => createNewQuestion(res)));
      })();

      return () => {
        shouldFetch.current = false;
      }
    }
  }, [startGame]);

  function createNewQuestion(res) {
    return {
      ...res,
      id: nanoid(),
      answers: shuffle([
        {
          answerText: res.correct_answer,
          isSelected: false,
          isCorrect: true,
          setGreen: false,
          setRed: false
        },
        ...res.incorrect_answers.map(answer => ({ answerText: answer, isSelected: false, isCorrect: false, setGreen: false, setRed: false }))
      ]),
    }
  }

  function registerQuestion(questionId, answer) {
    setQuestions(prevQuestions => prevQuestions.map(q => q.id === questionId ? { ...q, answers: q.answers.map(a => ({ ...a, isSelected: a.answerText === answer })) } : q));
  }

  function checkQuestions() {
    let tally = 0;
    questions.forEach(question => {
      question.answers.map(a => {
        if (a.isSelected && a.isCorrect) {
          tally++;
        }
        if (a.isCorrect) {
          a.setGreen = true;
        }
        if (a.isSelected && !a.isCorrect) {
          a.setRed = true;
        }
      })
    });
    setGameOver({ finished: true, score: tally })
  }

  function restartGame() {
    setStartGame(false);
    setGameOver({ finished: false, score: 0 });
    shouldFetch.current = true;
  }

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;

  }

  return (
    <div className="App center--content">
      <div className='decoration decoration--left'></div>
      <div className='decoration decoration--right'></div>
      {startGame ?
        <div className='questions--wrapper center--content'>
          {questions.map(question => <Question key={question.id} question={question} finished={gameOver.finished} registerQuestion={registerQuestion} />)}
          <div className='center--content' id='button--wrapper'>
            {gameOver.finished && <h1>You scored {gameOver.score}/5 answers</h1>}
            {gameOver.finished && <button onClick={restartGame}>Play Again</button>}
            {!gameOver.finished && <button onClick={checkQuestions}>Check answers</button>}
          </div>
        </div> :
        <IntroScreen startQuiz={startQuiz} />}
    </div>
  );
}

export default App;
