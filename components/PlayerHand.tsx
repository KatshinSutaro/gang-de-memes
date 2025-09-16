import React from 'react';
import type { Card as CardType, GamePhase } from '../types';
import { Card } from './Card';

interface PlayerHandProps {
  cards: CardType[];
  owner: 'PLAYER' | 'AI';
  onCardPlay?: (cardId: number) => void;
  phase?: GamePhase;
}

export const PlayerHand: React.FC<PlayerHandProps> = ({ cards, owner, onCardPlay, phase }) => {
  const cardCount = cards.length;
  const isPlayer = owner === 'PLAYER';

  const cardWidth = 112; // w-28 in pixels
  const maxHandWidth = 800; // max width of the hand area

  // Calculate overlap to fit cards within maxHandWidth
  const totalCardWidth = cardCount * cardWidth;
  let overlap = totalCardWidth > maxHandWidth 
    ? (totalCardWidth - maxHandWidth) / (cardCount - 1) 
    : -20; // negative overlap means spacing

  if (cardCount <= 1) overlap = 0;


  const handWidth = totalCardWidth - (cardCount > 1 ? (cardCount - 1) * overlap : 0);

  const isPlayable = isPlayer && phase === 'PLAYER_TURN';

  return (
    <div className="w-full flex justify-center items-center h-full">
      <div className="relative" style={{ width: `${handWidth}px`, height: '176px'}}>
        {cards.map((card, index) => {
          const rotationAngle = (index - (cardCount - 1) / 2) * 5; // Angle for the fan effect
          const yOffset = Math.abs(index - (cardCount - 1) / 2) * 5; // Vertical offset for the curve

          const playableClasses = isPlayable 
            ? 'hover:!z-50 hover:-translate-y-32 hover:!rotate-0 hover:scale-[2]' 
            : '';

          return (
            <div
              key={card.id}
              className={`absolute transition-all duration-300 ease-out ${playableClasses}`}
              style={{
                left: `${index * (cardWidth - overlap)}px`,
                bottom: `${yOffset}px`,
                transform: `rotate(${rotationAngle}deg)`,
                transformOrigin: 'bottom center',
              }}
            >
              <Card
                  card={card}
                  isFaceDown={!isPlayer}
                  onClick={isPlayable ? () => onCardPlay?.(card.id) : undefined}
                  isInteractive={isPlayable}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};