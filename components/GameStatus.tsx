import React from 'react';
import type { RoundResult, GamePhase } from '../types';

interface GameStatusProps {
  message: string;
  roundResult: RoundResult | null;
  phase: GamePhase;
  onContinue: () => void;
}

export const GameStatus: React.FC<GameStatusProps> = ({ message, roundResult, phase, onContinue }) => {
  if (!roundResult) {
    if (!message) return null;
    return (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="bg-black/70 rounded-lg py-2 px-6 inline-block border border-gray-700 shadow-lg">
              <p className="text-lg font-semibold text-white">{message}</p>
          </div>
      </div>
    );
  }

  return (
    <div 
      className="absolute inset-0 bg-black/60 z-30 flex items-center justify-center p-4 cursor-pointer"
      onClick={phase === 'WAIT_FOR_CONTINUE' ? onContinue : undefined}
    >
      <div 
        className="bg-gray-900/90 rounded-lg p-6 border-2 border-yellow-600 shadow-2xl w-full max-w-lg text-center"
      >
        <h3 className="text-2xl font-creepster text-yellow-300 mb-2">{message}</h3>
        <p className="text-sm text-gray-300 whitespace-pre-wrap leading-relaxed border-y border-gray-700 py-3 my-3">{roundResult.explanation}</p>
        <p className="font-bold mt-2 text-lg">Score du Round: Vous ({roundResult.playerPower}) vs IA ({roundResult.aiPower})</p>
        {phase === 'WAIT_FOR_CONTINUE' && (
            <p className="text-yellow-400 animate-pulse mt-4 text-lg">
              Cliquez ou appuyez sur une touche pour continuer...
            </p>
        )}
      </div>
    </div>
  );
};