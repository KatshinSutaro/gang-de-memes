import React from 'react';
import type { Card as CardType } from '../types';
import { Gang } from '../types';
import { Illustrations } from './CardIllustrations';


interface CardProps {
  card: CardType | null;
  isFaceDown?: boolean;
  onClick?: () => void;
  isInteractive?: boolean;
}

const GangIcon: React.FC<{ gang: Gang }> = ({ gang }) => {
  const iconClasses = "w-6 h-6 absolute top-2 right-2 rounded-full flex items-center justify-center text-white shadow-md";
  if (gang === Gang.Bakers) {
    return <div className={`${iconClasses} bg-orange-500`}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M2.899 4.233c.254-.34.45-.702.596-1.096a1 1 0 011.812-.004c.143.39.336.745.584 1.08.26.348.563.66.896.936.33.273.682.51 1.047.699.368.19.74.332 1.12.418.38.087.76.12 1.14.12s.76-.033 1.14-.12c.38-.086.752-.228 1.12-.418.365-.189.717-.426 1.047-.699.333-.275.637-.588.896-.936.248-.335.44-.69.584-1.08a1 1 0 011.812.004c.146.394.342.756.596 1.096.255.34.54.65.845.92.31.27.63.49.96.66a1 1 0 01.32 1.579c-1.22 1.402-2.91 2.545-5.08 2.545s-3.86-1.143-5.08-2.545a1 1 0 01.32-1.58c.33-.17.65-.39.96-.66.305-.27.59-.58.845-.92zM10 18a.75.75 0 00.75-.75V9.43l5.07-5.914a1 1 0 00-1.64-1.414L10 7.43 5.82 2.101a1 1 0 00-1.64 1.414L9.25 9.43v7.82c0 .414.336.75.75.75z" /></svg>
    </div>; // Rolling pin icon
  }
  return <div className={`${iconClasses} bg-cyan-500`}>
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-7.536 5.879a1 1 0 001.415 0 3 3 0 014.242 0 1 1 0 001.415-1.415 5 5 0 00-7.072 0 1 1 0 000 1.415z" clipRule="evenodd" /></svg>
  </div>; // Yarn ball icon
};


export const Card: React.FC<CardProps> = ({ card, isFaceDown = false, onClick, isInteractive = false }) => {
  if (isFaceDown) {
    return (
      <div className="w-28 h-44 bg-slate-800 rounded-lg shadow-lg flex items-center justify-center p-1 transform transition-transform duration-300 relative overflow-hidden border-2 border-black">
         <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-900"></div>
         {/* New Ornate Card Back */}
         <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 opacity-80" viewBox="0 0 112 176">
            <rect width="112" height="176" fill="#1e3a8a"/>
            <rect x="4" y="4" width="104" height="168" fill="none" stroke="#fef08a" strokeWidth="2"/>
            <rect x="8" y="8" width="96" height="160" fill="none" stroke="#fef08a" strokeOpacity="0.5" strokeWidth="1"/>
            
            {/* Corner flourishes */}
            <path d="M 12 12 C 20 12, 12 20, 12 28" fill="none" stroke="#fef08a" strokeWidth="1.5"/>
            <path d="M 100 12 C 92 12, 100 20, 100 28" fill="none" stroke="#fef08a" strokeWidth="1.5"/>
            <path d="M 12 164 C 20 164, 12 156, 12 148" fill="none" stroke="#fef08a" strokeWidth="1.5"/>
            <path d="M 100 164 C 92 164, 100 156, 100 148" fill="none" stroke="#fef08a" strokeWidth="1.5"/>

            {/* Center Monogram */}
            <text x="56" y="98" textAnchor="middle" fontSize="40" fontFamily="Creepster" fill="#fef08a" className="opacity-90">GM</text>

            {/* Symmetrical patterns */}
            <g transform="translate(56, 88)">
                <path d="M -30 -30 C -50 -10, -50 10, -30 30" stroke="#fef08a" strokeWidth="1.5" fill="none" strokeOpacity="0.7"/>
                <path d="M 30 -30 C 50 -10, 50 10, 30 30" stroke="#fef08a" strokeWidth="1.5" fill="none" strokeOpacity="0.7"/>
                 <path d="M -20 -40 C 0 -60, 0 -60, 20 -40" stroke="#fef08a" strokeWidth="1.5" fill="none" strokeOpacity="0.7"/>
                 <path d="M -20 40 C 0 60, 0 60, 20 40" stroke="#fef08a" strokeWidth="1.5" fill="none" strokeOpacity="0.7"/>
            </g>
        </svg>
      </div>
    );
  }

  if (!card) {
    return <div className="w-28 h-44 bg-black/20 border-2 border-dashed border-gray-600 rounded-lg" />;
  }
  
  const gangColor = card.gang === Gang.Bakers ? 'border-orange-400' : 'border-cyan-400';
  const gangBg = card.gang === Gang.Bakers ? 'from-orange-900/50 to-gray-800/60' : 'from-cyan-900/50 to-gray-800/60';
  const interactiveClasses = isInteractive ? 'cursor-pointer group' : 'cursor-default';

  return (
    <div
      onClick={onClick}
      className={`w-28 h-44 rounded-lg shadow-lg flex flex-col justify-between relative text-white transition-all duration-300 border-2 ${gangColor} bg-gray-800 ${interactiveClasses}`}
    >
        {/* Background Gradient & Texture */}
        <div className={`absolute inset-0 bg-gradient-to-b ${gangBg} rounded-lg`}></div>
        <div 
            className="absolute inset-0 opacity-[0.03] rounded-lg" 
            style={{backgroundImage: "url('https://www.transparenttextures.com/patterns/subtle-zebra-3d.png')"}}
        ></div>
        {/* Inner Bevel Effect */}
        <div className="absolute inset-0 rounded-lg border border-white/10"></div>
        
        {/* Illustration Area */}
        <div className="absolute inset-x-2 top-10 h-20 bg-black/20 rounded-md overflow-hidden border border-black/30 flex items-center justify-center">
             <div className="w-full h-full p-1"><Illustrations cardId={card.id} /></div>
        </div>
        
        {/* Power Seal */}
        <div className="absolute top-1 left-1 w-12 h-12 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="absolute w-full h-full text-black/50">
                <polygon points="50,0 90,25 90,75 50,100 10,75 10,25" fill="currentColor" />
            </svg>
             <span className="relative font-creepster text-5xl text-yellow-300 drop-shadow-[0_2px_1px_rgba(0,0,0,1)]">
                {card.basePower === -1 ? '?' : card.basePower}
            </span>
        </div>
        
        <GangIcon gang={card.gang} />

        <div className="absolute bottom-1 left-0 right-0 px-1 text-center">
             <p className="font-bold text-xs leading-tight truncate text-shadow-lg" style={{textShadow: '1px 1px 2px #000'}}>{card.name}</p>
        </div>

        {/* Hover Overlay for Interactive Cards */}
        {isInteractive && (
            <div className="absolute inset-0 bg-black/90 rounded-lg flex flex-col items-center justify-center p-2 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 border-2 border-yellow-400">
                <h3 className="font-bold text-lg text-yellow-300 leading-tight drop-shadow-lg">{card.name}</h3>
                <p className="text-xs text-gray-200 mt-2">{card.challengeText}</p>
            </div>
        )}
    </div>
  );
};