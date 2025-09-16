
import React from 'react';

interface RulesModalProps {
  isVisible: boolean;
  onClose: () => void;
}

export const RulesModal: React.FC<RulesModalProps> = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div 
        className="bg-gray-800 text-gray-200 rounded-lg shadow-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto border-2 border-yellow-500" 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-4xl font-creepster text-yellow-300">Règles du jeu</h2>
            <button onClick={onClose} className="text-3xl text-gray-400 hover:text-white">&times;</button>
        </div>

        <div className="space-y-4 text-sm">
            <section>
                <h3 className="font-bold text-lg text-orange-400">But du jeu</h3>
                <p>Accumulez le plus de "Cookies" (points) en remportant des duels. La partie se joue en 7 rounds.</p>
            </section>

            <section>
                <h3 className="font-bold text-lg text-orange-400">Les Gangs et le Deck</h3>
                <p>Le jeu utilise un seul deck commun qui mélange les deux gangs : les <strong>Tricoteuses</strong> et les <strong>Pâtissières</strong>. Chaque joueur pioche dans ce même deck. Votre main sera donc composée d'un mélange de mémés des deux camps ! Le 'gang' d'une carte est important car de nombreuses règles de Défi s'appliquent différemment selon qu'une mémé est une Tricoteuse ou une Pâtissière.</p>
            </section>

            <section>
                <h3 className="font-bold text-lg text-orange-400">Déroulement d'un Duel</h3>
                <ol className="list-decimal list-inside space-y-1 pl-2">
                    <li>Chaque joueur choisit secrètement une Mémé de sa main et la joue.</li>
                    <li>Les cartes sont révélées en même temps.</li>
                    <li>La Mémé la plus forte, après application de la règle du <strong>Défi</strong>, remporte le duel.</li>
                    <li>Le gagnant remporte un nombre de Cookies égal à la différence de force entre les deux Mémés.</li>
                </ol>
            </section>

            <section>
                <h3 className="font-bold text-lg text-orange-400">Le Défi</h3>
                <p>Le duel est influencé par la carte au sommet de la pile "Défi". Chaque carte a une règle unique qui modifie la puissance des Mémés jouées pour le round. Lisez bien le texte sous la carte Défi !</p>
            </section>

            <section>
                <h3 className="font-bold text-lg text-orange-400">Fin d'un Duel</h3>
                 <ul className="list-disc list-inside space-y-1 pl-2">
                    <li>La carte <strong>gagnante</strong> devient le nouveau Défi pour le round suivant.</li>
                    <li>La carte <strong>perdante</strong> est envoyée au "Dortoir" (défausse).</li>
                    <li>En cas d'égalité, la carte avec la plus haute puissance de base devient le nouveau Défi.</li>
                 </ul>
            </section>
            
            <section>
                <h3 className="font-bold text-lg text-orange-400">Cartes Spéciales</h3>
                 <ul className="list-disc list-inside space-y-1 pl-2">
                    <li><strong>Sophie Lyss (0):</strong> Une Pâtissière avec une puissance de 0.</li>
                    <li><strong>Honorine Padanlévier (?):</strong> Une Tricoteuse "lunatique". Sa puissance est déterminée par un lancer de dé à chaque fois qu'elle est jouée.</li>
                 </ul>
            </section>
        </div>
      </div>
    </div>
  );
};
