
import React, { useState } from 'react';
import { GameBoard } from './components/GameBoard';
import { RulesModal } from './components/RulesModal';

function App() {
  const [isRulesVisible, setRulesVisible] = useState(false);

  return (
    <main className="bg-gray-900 min-h-screen font-sans text-white relative overflow-hidden">
      {/* New green felt table background with spotlight effect */}
      <div className="absolute inset-0 bg-[#0a3824]"></div>
      <div 
        className="absolute inset-0 opacity-40" 
        style={{backgroundImage: "url('https://www.transparenttextures.com/patterns/fabric-of-squares.png')"}}
      ></div>
      <div className="absolute inset-0 bg-radial-gradient(ellipse_at_center,rgba(255,255,255,0.1)_0%,rgba(0,0,0,0.8)_80%)"></div>


      <div className="relative z-10 flex flex-col h-screen">
          <header className="flex justify-between items-center p-4 border-b-2 border-yellow-600/30 shadow-lg bg-black/20">
              <h1 className="text-4xl font-creepster text-yellow-300 drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)]">
                  Granny Mayhem
              </h1>
              <button 
                onClick={() => setRulesVisible(true)}
                className="bg-black/30 hover:bg-black/50 text-yellow-300 font-bold py-2 px-4 rounded-lg border border-yellow-500/50 transition-colors shadow-md"
              >
                  Règles du jeu
              </button>
          </header>

          <div className="flex-grow">
             <GameBoard />
          </div>
      </div>
      
      <RulesModal isVisible={isRulesVisible} onClose={() => setRulesVisible(false)} />
    </main>
  );
}

export default App;