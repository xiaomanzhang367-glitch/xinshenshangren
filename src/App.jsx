import React from 'react';
import { GameProvider } from './context/GameContext';
import MainScreen from './components/MainScreen';

function App() {
  return (
    <GameProvider>
      <MainScreen />
    </GameProvider>
  );
}

export default App;
