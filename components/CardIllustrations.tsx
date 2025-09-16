import React from 'react';

// A mapping of card IDs to their SVG illustrations.
const illustrationMap: Record<number, React.FC> = {
  // --- GANG DES TRICOTEUSES (KNITTERS) ---
  1: () => ( // Honorine Padanlévier - Lunatic
    <svg viewBox="0 0 100 100"><g stroke="#262626" strokeWidth="1.5">
      <path d="M50 96 C 20 96, 10 70, 15 45 C 20 20, 40 5, 50 5 C 60 5, 80 20, 85 45 C 90 70, 80 96, 50 96 Z" fill="#F3E8D8" />
      <path d="M25 80 C 10 60, 10 30, 25 20 Q 50 -15, 75 20 C 90 30, 90 60, 75 80" fill="#E0F2FE" stroke="#0891B2" strokeWidth="2.5"/>
      <path d="M30 25 C 20 15, 30 5, 50 10 C 70 5, 80 15, 70 25" fill="#f0f9ff" stroke="#0891B2" />
      <circle cx="38" cy="45" r="12" fill="white"/><circle cx="62" cy="45" r="12" fill="white"/>
      <circle cx="38" cy="45" r="4" fill="#ef4444"><animateTransform attributeName="transform" type="rotate" from="0 38 45" to="360 38 45" dur="0.8s" repeatCount="indefinite"/></circle>
      <circle cx="62" cy="45" r="4" fill="#ef4444"><animateTransform attributeName="transform" type="rotate" from="360 62 45" to="0 62 45" dur="1s" repeatCount="indefinite"/></circle>
      <path d="M30 40 Q 38 32, 46 40" fill="none" strokeWidth="2"/>
      <path d="M54 40 Q 62 32, 70 40" fill="none" strokeWidth="2"/>
      <path d="M35 75 Q 50 55, 65 75" fill="#e11d48" strokeWidth="2"/>
    </g></svg>
  ),
  2: () => ( // Nicole Palebois - Weaker +3
    <svg viewBox="0 0 100 100"><g stroke="#262626" strokeWidth="1.5">
      <path d="M50 96 C 25 96, 20 75, 20 50 C 20 25, 35 8, 50 8 C 65 8, 80 25, 80 50 C 80 75, 75 96, 50 96 Z" fill="#F3E8D8"/>
      <path d="M25 50 C 20 30, 30 15, 50 15 C 70 15, 80 30, 75 50" fill="#D1D5DB" stroke="#4b5563"/>
      <path d="M48 48 l -18 -4" strokeWidth="2.5" />
      <path d="M52 48 l 18 -4" strokeWidth="2.5" />
      <rect x="38" y="44" width="24" height="12" fill="none" strokeWidth="2" rx="3"/>
      <ellipse cx="44" cy="50" rx="2" ry="4" fill="black"/><ellipse cx="56" cy="50" rx="2" ry="4" fill="black"/>
      <path d="M40 70 L 60 70" fill="none" strokeWidth="2"/>
      <path d="M50 58 L 50 64" fill="none" strokeWidth="1.5" />
    </g></svg>
  ),
  3: () => ( // Trudy Balle - Even + Dice
    <svg viewBox="0 0 100 100"><g stroke="#262626" strokeWidth="1.5">
      <rect x="20" y="10" width="60" height="85" rx="30" fill="#F3E8D8"/>
      <path d="M30 15 C 50 -5, 70 -5, 70 15 L 75 35 L 25 35 Z" fill="#4B5563" stroke="#1f2937"/>
      <circle cx="40" cy="50" r="6" fill="white"/><circle cx="40" cy="50" r="3" fill="black"/>
      <circle cx="60" cy="50" r="6" fill="white"/><circle cx="60" cy="50" r="3" fill="black"/>
      <path d="M35 40 Q 40 45, 45 40" strokeWidth="2" fill="none" />
      <path d="M55 40 Q 60 45, 65 40" strokeWidth="2" fill="none" />
      <path d="M35 70 A 15 10 0 0 0 65 70" fill="none" strokeWidth="3"/>
    </g></svg>
  ),
  4: () => ( // Odile Duchitte - Odd - Dice
    <svg viewBox="0 0 100 100"><g stroke="#262626" strokeWidth="1.5">
      <path d="M50 95 C 20 95, 15 70, 20 45 C 25 20, 40 5, 50 5 C 60 5, 75 20, 80 45 C 85 70, 80 95, 50 95 Z" fill="#F3E8D8"/>
      <path d="M20 55 C 30 20, 70 20, 80 55 C 70 65, 30 65, 20 55 Z" fill="#CFD8DC" stroke="#455a64"/>
      <path d="M40 48 L 45 42 L 50 48" strokeWidth="2" fill="none"/>
      <path d="M38 52 C 42 56, 46 56, 50 52" fill="none" />
      <path d="M60 48 L 65 42 L 70 48" strokeWidth="2" fill="none"/>
      <path d="M58 52 C 62 56, 66 56, 70 52" fill="none" />
      <path d="M40 70 Q 50 80, 60 70" fill="none" strokeWidth="2"/>
    </g></svg>
  ),
  5: () => ( // Esther Valley - Equal +2 Knitter
    <svg viewBox="0 0 100 100"><g stroke="#262626" strokeWidth="1.5">
      <path d="M50 98 C 20 98, 18 75, 20 50 C 22 25, 35 8, 50 8 C 65 8, 78 25, 80 50 C 82 75, 80 98, 50 98 Z" fill="#F3E8D8"/>
      <path d="M25 40 C 20 25, 30 15, 50 15 C 70 15, 80 25, 75 40" fill="#E5E7EB" stroke="#4B5563"/>
      <rect x="35" y="45" width="30" height="12" rx="2" fill="white" strokeWidth="2"/>
      <line x1="35" y1="51" x2="65" y2="51" strokeWidth="2.5" />
      <path d="M40 70 L 60 70" fill="none" strokeWidth="3" />
      <path d="M15 50 L 30 40 M 85 50 L 70 40" stroke="#06B6D4" strokeWidth="3" fill="none"/>
    </g></svg>
  ),
  6: () => ( // Annick Boucheur - Knitter vs Baker - Dice
     <svg viewBox="0 0 100 100"><g stroke="#262626" strokeWidth="1.5">
      <path d="M50 95 C 25 95, 20 75, 20 50 C 20 25, 35 10, 50 10 C 65 10, 80 25, 80 50 C 80 75, 75 95, 50 95 Z" fill="#F3E8D8"/>
      <path d="M20 50 C 30 25, 70 25, 80 50" fill="#A5F3FC" stroke="#0E7490"/>
      <path d="M35 55 Q 50 40, 65 55" fill="none" strokeWidth="2"/>
      <circle cx="40" cy="50" r="3" /><circle cx="60" cy="50" r="3" />
      <path d="M45 75 C 50 70, 55 70, 50 75 C 45 80, 55 80, 55 75" fill="#f43f5e" stroke="none"/>
    </g></svg>
  ),
  7: () => ( // Adelina Ottension - Knitter vs Knitter Draw
    <svg viewBox="0 0 100 100"><g stroke="#262626" strokeWidth="1.5">
      <path d="M50,95 C 30,95 20,80 20,55 C 20,30 35,10 50,10 C 65,10 80,30 80,55 C 80,80 70,95 50,95Z" fill="#F3E8D8"/>
      <path d="M30,30 C 25,20 35,10 50,15 C 65,10 75,20 70,30" fill="#6B7280" stroke="#1f2937"/>
      <circle cx="38" cy="50" r="8" fill="white" /><circle cx="62" cy="50" r="8" fill="white" />
      <circle cx="38" cy="52" r="4" fill="black" /><circle cx="62" cy="52" r="4" fill="black" />
      <path d="M30 45 L 70 45" fill="none" strokeWidth="2.5" />
      <path d="M40 70 C 45 65, 55 65, 60 70" fill="none" strokeWidth="2"/>
    </g></svg>
  ),
  8: () => ( // Fanny Revabois - Knitter vs Baker -3 Knitter
    <svg viewBox="0 0 100 100"><g stroke="#262626" strokeWidth="1.5">
      <path d="M50 95 C 20 95, 10 70, 15 45 C 20 20, 35 5, 50 5 C 65 5, 80 20, 85 45 C 90 70, 80 95, 50 95 Z" fill="#F3E8D8"/>
      <path d="M15 50 C 25 20, 75 20, 85 50" fill="#9CA3AF" stroke="#374151"/>
      <path d="M35 45 L 45 55" strokeWidth="2.5"/><path d="M45 45 L 35 55" strokeWidth="2.5"/>
      <path d="M55 45 L 65 55" strokeWidth="2.5"/><path d="M65 45 L 55 55" strokeWidth="2.5"/>
      <path d="M40 75 Q 50 65, 60 75" fill="none" strokeWidth="2"/>
      <path d="M10 20 L 30 40 M 90 20 L 70 40" stroke="#0891B2" strokeWidth="5" fill="none"/>
    </g></svg>
  ),
  // --- GANG DES PÂTISSIÈRES (BAKERS) ---
  9: () => ( // Sophie Lyss - Weaker Wins
    <svg viewBox="0 0 100 100"><g stroke="#262626" strokeWidth="1.5">
      <path d="M50 95 C 25 95, 20 70, 20 50 C 20 30, 35 10, 50 10 C 65 10, 80 30, 80 50 C 80 70, 75 95, 50 95 Z" fill="#F3E8D8"/>
      <path d="M20 50 Q 50 15, 80 50" fill="#FEF3C7" stroke="#D97706"/>
      <circle cx="40" cy="50" r="8" fill="white"/><circle cx="40" cy="48" r="4" fill="#34D399"/>
      <circle cx="60" cy="50" r="8" fill="white"/><circle cx="60" cy="48" r="4" fill="#34D399"/>
      <path d="M40 70 A 15 15 0 0 0 60 70" fill="none" strokeWidth="2"/>
      <circle cx="50" cy="25" r="8" fill="#FBBF24" stroke="white" strokeWidth="2"/>
    </g></svg>
  ),
  10: () => ( // Marie Rouanna - Baker vs Knitter +1 Knitter
    <svg viewBox="0 0 100 100"><g stroke="#262626" strokeWidth="1.5">
      <path d="M50 95 C 20 95, 15 70, 20 45 C 25 20, 40 5, 50 5 C 60 5, 75 20, 80 45 C 85 70, 80 95, 50 95 Z" fill="#F3E8D8"/>
      <path d="M25 25 L 75 25 L 75 40 L 25 40 Z" fill="white" stroke="#a16207"/>
      <path d="M25 40 C 25 55, 35 60, 50 60 C 65 60, 75 55, 75 40" fill="white" stroke="#a16207"/>
      <path d="M40 48 L 46 52" fill="none"/><path d="M40 54 L 46 50" fill="none"/>
      <ellipse cx="60" cy="51" rx="4" ry="6" fill="black"/>
      <path d="M45 70 Q 55 78, 65 70" fill="none" strokeWidth="2"/>
    </g></svg>
  ),
  11: () => ( // Alyson Leyklosh - Equal +1 Baker
    <svg viewBox="0 0 100 100"><g stroke="#262626" strokeWidth="1.5">
      <path d="M50,95 C 30,95 20,80 20,55 C 20,30 35,10 50,10 C 65,10 80,30 80,55 C 80,80 70,95 50,95Z" fill="#F3E8D8"/>
      <path d="M30 25 C 25 20, 35 10, 50 15 C 65 10, 75 20, 70 25" fill="#FDE68A" stroke="#f59e0b"/>
      <path d="M35 55 C 40 45, 45 45, 50 55" fill="none"/>
      <path d="M50 55 C 55 45, 60 45, 65 55" fill="none"/>
      <path d="M30 75 A 20 15 0 0 1 70 75 Z" fill="white"/>
      <path d="M35 75 L 65 75" fill="none"/>
    </g></svg>
  ),
  12: () => ( // Agatha Stroffe - Stronger + Dice
    <svg viewBox="0 0 100 100"><g stroke="#262626" strokeWidth="1.5">
      <path d="M50 95 C 20 95, 15 75, 20 50 C 25 25, 40 5, 50 5 C 60 5, 75 25, 80 50 C 85 75, 80 95, 50 95 Z" fill="#F3E8D8"/>
      <path d="M25 25 L 75 25 L 70 45 L 30 45 Z" fill="white" stroke="#a16207"/>
      <path d="M30 45 C 20 60, 30 70, 50 70 C 70 70, 80 60, 70 45" fill="white" stroke="#a16207"/>
      <path d="M38 50 L 48 45 M 52 45 L 62 50" strokeWidth="2"/>
      <path d="M40 60 Q 50 50, 60 60" fill="none" strokeWidth="2"/>
    </g></svg>
  ),
  13: () => ( // Ashley Menumenu - Knitter vs Baker +1 Baker
    <svg viewBox="0 0 100 100"><g stroke="#262626" strokeWidth="1.5">
      <path d="M50 98 C 20 98, 18 75, 20 50 C 22 25, 35 8, 50 8 C 65 8, 78 25, 80 50 C 82 75, 80 98, 50 98 Z" fill="#F3E8D8"/>
      <path d="M25 30 C 50 5, 50 5, 75 30" fill="#FDBA74" stroke="#c2410c"/>
      <path d="M38 50 A 5 5 0 0 1 48 50" fill="none"/><path d="M52 50 A 5 5 0 0 0 62 50" fill="none"/>
      <path d="M40 70 Q 50 80, 60 70" fill="none" strokeWidth="2"/>
      <circle cx="20" cy="50" r="5" fill="#FBBF24"/><circle cx="80" cy="50" r="5" fill="#FBBF24"/>
    </g></svg>
  ),
  14: () => ( // Sarah Vigotte - Baker vs Knitter -1 Knitter
    <svg viewBox="0 0 100 100"><g stroke="#262626" strokeWidth="1.5">
      <path d="M50 95 C 25 95, 20 75, 20 50 C 20 25, 35 10, 50 10 C 65 10, 80 25, 80 50 C 80 75, 75 95, 50 95 Z" fill="#F3E8D8"/>
      <path d="M25 25 L 75 25 L 75 40 Q 50 50, 25 40 Z" fill="white" stroke="#a16207"/>
      <circle cx="40" cy="50" r="6" fill="white" /><circle cx="40" cy="50" r="3" fill="#1d4ed8" />
      <circle cx="60" cy="50" r="6" fill="white" /><circle cx="60" cy="50" r="3" fill="#1d4ed8" />
      <path d="M40 70 Q 50 65, 60 70" fill="none" strokeWidth="2"/>
    </g></svg>
  ),
  15: () => ( // Lucie Kopatte - Baker vs Baker Draw
    <svg viewBox="0 0 100 100"><g stroke="#262626" strokeWidth="1.5">
      <path d="M50 95 C 25 95, 20 70, 20 50 C 20 30, 35 10, 50 10 C 65 10, 80 30, 80 50 C 80 70, 75 95, 50 95 Z" fill="#F3E8D8"/>
      <path d="M25 40 C 50 10, 50 10, 75 40" fill="#F97316" stroke="#7c2d12"/>
      <circle cx="40" cy="55" r="5" fill="#fff"/><circle cx="40" cy="55" r="2" fill="black"/>
      <circle cx="60" cy="55" r="5" fill="#fff"/><circle cx="60" cy="55" r="2" fill="black"/>
      <path d="M35 70 A 15 15 0 0 1 65 70" fill="none" strokeWidth="2"/>
    </g></svg>
  ),
  16: () => ( // Yvette Ferdumal - Stronger -2
    <svg viewBox="0 0 100 100"><g stroke="#262626" strokeWidth="1.5">
      <path d="M50 95 C 25 95, 20 70, 20 50 C 20 30, 35 10, 50 10 C 65 10, 80 30, 80 50 C 80 70, 75 95, 50 95 Z" fill="#F3E8D8"/>
      <path d="M20 35 L 80 35 L 75 20 L 25 20 Z" fill="#DC2626" stroke="#7f1d1d"/>
      <path d="M35 55 L 45 50 M 55 50 L 65 55" strokeWidth="2.5"/>
      <path d="M40 75 Q 50 65, 60 75" fill="none" strokeWidth="2"/>
      <path d="M80 50 L 70 50 C 65 50, 65 45, 70 45 L 75 45 Z" fill="none" strokeWidth="1" />
      <path d="M30 20 L 25 10" stroke="#7f1d1d" strokeWidth="3" />
    </g></svg>
  ),
};

export const Illustrations: React.FC<{cardId: number}> = ({ cardId }) => {
    const IllustrationComponent = illustrationMap[cardId] || (() => <div />);
    return <IllustrationComponent />;
};
