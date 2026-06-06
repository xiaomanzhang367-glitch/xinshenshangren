import React, { createContext, useContext } from 'react';
import { useGameState } from '../hooks/useGameState';

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const gameHook = useGameState();

  return (
    <GameContext.Provider value={gameHook}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  return useContext(GameContext);
};
