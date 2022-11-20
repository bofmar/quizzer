import React, { useState } from 'react';
import IntroScreen from './components/IntoScreen';
import './App.css';

function App() {
  const [startGame, setStartGame] = useState(false);

  function startQuiz() {
    setStartGame(true);
  }

  return (
    <div className="App center--content">
      <div className='decoration decoration--left'></div>
      <div className='decoration decoration--right'></div>
      {!startGame && <IntroScreen startQuiz={startQuiz} />}
    </div>
  );
}

export default App;
