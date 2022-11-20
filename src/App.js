import React, { useState, useEffect } from 'react';
import IntroScreen from './components/IntoScreen';
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
      setQuestions(data.results);
      console.log(questions);
    })();

  }, [startGame]);

  return (
    <div className="App center--content">
      <div className='decoration decoration--left'></div>
      <div className='decoration decoration--right'></div>
      {!startGame && <IntroScreen startQuiz={startQuiz} />}
    </div>
  );
}

export default App;
