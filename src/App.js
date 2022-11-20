import React, { useState } from 'react';
import IntroScreen from './components/IntoScreen';
import './App.css';

function App() {
  const [startGame, setStartGame] = useState(false);

  return (
    <div className="App center--content">
      <div className='decoration decoration--left'></div>
      <div className='decoration decoration--right'></div>
      {!startGame && <IntroScreen />}
    </div>
  );
}

export default App;
