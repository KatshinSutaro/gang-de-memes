
import React, { useEffect } from 'react';
import { useGameLogic } from '../hooks/useGameLogic';
import { PlayerHand } from './PlayerHand';
import { Card } from './Card';
import { GameStatus } from './GameStatus';
import { Dice } from './Dice';

const InfoPlaque: React.FC<{label: string; value: number | string}> = ({label, value}) => (
    <div className="bg-black/50 rounded-md px-4 py-1 border border-black/50 shadow-lg text-center">
        <span className="text-gray-400 text-sm block">{label}</span>
        <span className="text-yellow-300 text-2xl font-bold font-creepster tracking-wider">{value}</span>
    </div>
);

const CardSlot: React.FC<{children: React.ReactNode; label: string}> = ({ children, label }) => (
    <div className="flex flex-col items-center space-y-2">
        <h3 className="font-bold text-gray-400 text-shadow-md">{label}</h3>
        <div className="w-28 h-44 bg-black/20 rounded-lg border-2 border-black/30 shadow-inner flex items-center justify-center">
            {children}
        </div>
    </div>
);

export const GameBoard: React.FC = () => {
    const { gameState, handlePlayerPlayCard, resetGame, handleContinueToNextRound } = useGameLogic();
    const { 
        player, 
        ai, 
        challengeCard, 
        phase, 
        gameMessage, 
        roundResult,
        playerPlayedCard,
        aiPlayedCard,
        playerDiceResult,
        aiDiceResult
    } = gameState;
    
    const showDice = phase === 'RESOLUTION' && (playerDiceResult !== null || aiDiceResult !== null);
    
    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (phase === 'WAIT_FOR_CONTINUE') {
                handleContinueToNextRound();
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [phase, handleContinueToNextRound]);

    const handleQuit = () => {
        window.close();
    };

    return (
        <div className="w-full h-full flex flex-col items-center justify-between p-4 relative text-white">
            
            {/* AI Area */}
            <div className="w-full flex flex-col items-center">
                <div className="flex justify-between w-full max-w-4xl items-center">
                    <InfoPlaque label="IA Score" value={ai.score} />
                    <h2 className="text-2xl font-creepster text-gray-400 drop-shadow-lg">Main de l'IA</h2>
                    <InfoPlaque label="Cartes" value={ai.hand.length} />
                </div>
                <div className="h-40 w-full">
                     <PlayerHand cards={ai.hand} owner="AI" />
                </div>
            </div>

            {/* Center Area (Play Zone) */}
            <div className="w-full max-w-3xl flex-grow flex justify-around items-center relative py-4">
                 {/* Player Side */}
                <div className="flex flex-col items-center space-y-4">
                    <CardSlot label="Votre Carte">
                         <Card card={playerPlayedCard} />
                    </CardSlot>
                    <div className="h-28 w-28 flex items-center justify-center">
                         {showDice && playerDiceResult && <Dice value={playerDiceResult} label="Votre Dé" />}
                    </div>
                </div>

                 {/* Challenge Card Slot */}
                <div className="flex flex-col items-center space-y-2">
                    <h3 className="text-xl font-bold text-yellow-400">Défi Actuel</h3>
                    <Card card={challengeCard} />
                    {challengeCard && <p className="text-xs text-center max-w-[120px] text-gray-300 mt-1">{challengeCard.challengeText}</p>}
                </div>
                
                 {/* AI Side */}
                 <div className="flex flex-col items-center space-y-4">
                     <CardSlot label="Carte de l'IA">
                         <Card card={aiPlayedCard} />
                     </CardSlot>
                     <div className="h-28 w-28 flex items-center justify-center">
                        {showDice && aiDiceResult && <Dice value={aiDiceResult} label="Dé de l'IA" />}
                    </div>
                </div>
            </div>
            
            <GameStatus 
                message={gameMessage} 
                roundResult={roundResult} 
                phase={phase}
                onContinue={handleContinueToNextRound}
            />

            {/* Player Area */}
            <div className="w-full flex flex-col items-center">
                <div className="h-48 w-full">
                    <PlayerHand 
                        cards={player.hand} 
                        owner="PLAYER" 
                        onCardPlay={handlePlayerPlayCard}
                        phase={phase}
                    />
                </div>
                 <div className="flex justify-between w-full max-w-4xl items-center mt-2">
                    <InfoPlaque label="Votre Score" value={player.score} />
                     {phase === 'GAME_OVER' && (
                        <div className="flex items-center gap-4">
                            <button onClick={resetGame} className="bg-yellow-500 text-gray-900 font-bold py-2 px-6 rounded-lg hover:bg-yellow-400 transition-colors shadow-lg border-2 border-yellow-600">
                                Rejouer
                            </button>
                             <button onClick={handleQuit} className="bg-gray-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-gray-500 transition-colors shadow-lg border-2 border-gray-700">
                                Quitter
                            </button>
                        </div>
                    )}
                    <InfoPlaque label="Cartes" value={player.hand.length} />
                </div>
            </div>
        </div>
    );
};
