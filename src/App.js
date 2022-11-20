import React, { useState } from 'react';
import IntroScreen from './components/IntoScreen';
import './App.css';

function App() {
  return (
    <div className="App center--content">
      <div className='decoration decoration--left'></div>
      <div className='decoration decoration--right'></div>
      <IntroScreen />
    </div>
  );
}

export default App;
