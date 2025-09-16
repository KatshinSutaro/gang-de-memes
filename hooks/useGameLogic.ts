import { useState, useEffect, useCallback } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import type { GameState, Card, RoundResult } from '../types';
import { Gang, ChallengeType } from '../types';
import { CARDS } from '../constants';

// --- GEMINI API SETUP ---
// This function reads the API key securely from the meta tag in index.html
const getApiKey = (): string => {
  const meta = document.querySelector('meta[name="gemini-api-key"]');
  if (meta) {
    const key = (meta as HTMLMetaElement).content;
    // This check ensures the placeholder was replaced during deployment.
    if (key && key !== '__GEMINI_API_KEY__') {
      return key;
    }
  }
  // This error will be visible in the browser console if the key is missing.
  const errorMessage = "Clé API Gemini non trouvée. Vérifiez vos paramètres de déploiement Netlify et assurez-vous que la variable d'environnement API_KEY est définie et que la commande de construction est correcte.";
  console.error(errorMessage);
  // We can also display this message to the user in the UI.
  document.body.innerHTML = `<div style="color: white; padding: 20px; font-family: sans-serif; text-align: center;"><h1>Erreur de configuration</h1><p>${errorMessage}</p></div>`;
  throw new Error(errorMessage);
};

const genAI = new GoogleGenAI({ apiKey: getApiKey() });

// --- CONSTANTS ---
const INITIAL_HAND_SIZE = 7;
const ANIMATION_DELAY_CARD_REVEAL = 1000;
const ANIMATION_DELAY_DICE_ROLL = 4500; 

// --- HELPER FUNCTIONS ---
const shuffleDeck = (deck: Card[]): Card[] => [...deck].sort(() => Math.random() - 0.5);
const rollDice = () => Math.floor(Math.random() * 6) + 1;
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const getAiChoice = async (aiHand: Card[], challengeCard: Card): Promise<number> => {
  const formattedHand = aiHand.map(c => `- ID ${c.id}: ${c.name} (Power: ${c.basePower}, Gang: ${c.gang})`).join('\n');
  const prompt = `You are a strategic AI player for the card game 'Gang de Mémés'. Your goal is to win the current duel. Winning is achieved by having a higher final power than the opponent after the challenge rule is applied.

Context:
- Challenge Card: "${challengeCard.name}" (Power: ${challengeCard.basePower})
- Challenge Rule: "${challengeCard.challengeText}"

Your Hand:
${formattedHand}

Task:
Analyze the challenge's effect on each of your cards. Your opponent's card is unknown, so you must make the best strategic choice based on the cards in your hand and the active challenge. Choose the card that gives you the highest probability of winning. Return a JSON object with a single key "cardId", which is the ID of the card you choose to play.`;
  
  try {
    const responseSchema = {
      type: Type.OBJECT,
      properties: {
        cardId: { type: Type.NUMBER, description: "The ID of the chosen card." },
      },
      required: ["cardId"]
    };

    const response = await genAI.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema,
        temperature: 0.8,
      }
    });

    const result = JSON.parse(response.text);
    const chosenCard = aiHand.find(c => c.id === result.cardId);
    
    if (chosenCard) {
      return result.cardId;
    } else {
      console.warn(`AI chose an invalid card ID: ${result.cardId}. Falling back to random.`);
      return aiHand[Math.floor(Math.random() * aiHand.length)].id;
    }
  } catch (error) {
    console.error("Error fetching AI choice, falling back to random:", error);
    return aiHand[Math.floor(Math.random() * aiHand.length)].id;
  }
};


// --- HOOK ---
export const useGameLogic = () => {
  const [gameState, setGameState] = useState<GameState>({
    player: { hand: [], discard: [], score: 0 },
    ai: { hand: [], discard: [], score: 0 },
    deck: [],
    challengeCard: null,
    phase: 'START',
    gameMessage: 'Préparez-vous pour le duel des Mémés !',
    roundResult: null,
    playerPlayedCard: null,
    aiPlayedCard: null,
    playerDiceResult: null,
    aiDiceResult: null,
  });

  const resetGame = useCallback(() => {
    const shuffledDeck = shuffleDeck(CARDS);
    const challengeCard = shuffledDeck.pop()!;
    const playerHand = shuffledDeck.slice(0, INITIAL_HAND_SIZE);
    const aiHand = shuffledDeck.slice(INITIAL_HAND_SIZE, INITIAL_HAND_SIZE * 2);

    setGameState({
      player: { hand: playerHand, discard: [], score: 0 },
      ai: { hand: aiHand, discard: [], score: 0 },
      deck: shuffledDeck.slice(INITIAL_HAND_SIZE * 2),
      challengeCard,
      phase: 'PLAYER_TURN',
      gameMessage: 'À vous de jouer ! Choisissez une carte.',
      roundResult: null,
      playerPlayedCard: null,
      aiPlayedCard: null,
      playerDiceResult: null,
      aiDiceResult: null,
    });
  }, []);

  useEffect(() => {
    // A small try-catch block here prevents the app from crashing if the API key logic fails
    try {
      getApiKey(); // This will throw an error if the key is not set up, stopping execution.
      resetGame();
    } catch (error) {
      // The error is already handled inside getApiKey(), so we just need to catch it here.
    }
  }, [resetGame]);

  const runResolutionSequence = async (playerCard: Card, aiCard: Card) => {
    // 1. Set resolution phase and reveal cards
    setGameState(prev => ({
      ...prev,
      phase: 'RESOLUTION',
      aiPlayedCard: aiCard,
      gameMessage: 'Les mémés s\'affrontent...',
    }));

    await delay(ANIMATION_DELAY_CARD_REVEAL);

    // 2. Determine dice requirements and roll dice
    const challengeCard = gameState.challengeCard!;
    const { player: playerNeedsDice, ai: aiNeedsDice } = getDiceRequirements(playerCard, aiCard, challengeCard);
    
    const playerDice = playerNeedsDice ? rollDice() : null;
    const aiDice = aiNeedsDice ? rollDice() : null;

    if (playerDice || aiDice) {
      setGameState(prev => ({
        ...prev,
        playerDiceResult: playerDice,
        aiDiceResult: aiDice,
        gameMessage: 'Lancer de dés !'
      }));
      await delay(ANIMATION_DELAY_DICE_ROLL);
    }
    
    // 3. Calculate result and wait for user to continue
    const result = calculateRoundResult(playerCard, aiCard, challengeCard, playerDice, aiDice);
    setGameState(prev => ({
      ...prev,
      roundResult: result,
      phase: 'WAIT_FOR_CONTINUE',
      gameMessage: `Round terminé. ${result.winner === 'PLAYER' ? 'Vous avez gagné' : result.winner === 'AI' ? "L'IA a gagné" : 'Match nul'}.`,
      playerDiceResult: null, // Hide dice after rolling
      aiDiceResult: null,
    }));
  };
  
  // Effect to handle AI's turn after player makes a move
  useEffect(() => {
    if (gameState.phase === 'AI_THINKING' && gameState.playerPlayedCard && gameState.challengeCard) {
      const makeAiMove = async () => {
        await delay(500); // UX delay for AI "thinking"
        
        const aiCardId = await getAiChoice(gameState.ai.hand, gameState.challengeCard);
        const aiCard = gameState.ai.hand.find(c => c.id === aiCardId)!; // Fallback inside getAiChoice ensures it's valid
        
        // Remove AI card from hand before starting resolution
        setGameState(prev => ({
            ...prev,
            ai: { ...prev.ai, hand: prev.ai.hand.filter(c => c.id !== aiCard.id) },
        }));
        
        runResolutionSequence(gameState.playerPlayedCard!, aiCard);
      };
      makeAiMove();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState.phase]);


  const handleContinueToNextRound = () => {
    if (gameState.phase !== 'WAIT_FOR_CONTINUE') return;
    
    const { roundResult, playerPlayedCard, aiPlayedCard } = gameState;
    if (!roundResult || !playerPlayedCard || !aiPlayedCard) return;

    // Update scores and prepare for next round
    const isGameOver = gameState.player.hand.length === 0;
    
    const finalPlayerScore = gameState.player.score + (roundResult.winner === 'PLAYER' ? roundResult.scoreGained : 0);
    const finalAiScore = gameState.ai.score + (roundResult.winner === 'AI' ? roundResult.scoreGained : 0);
    
    const nextPhase = isGameOver ? 'GAME_OVER' : 'PLAYER_TURN';
    let finalGameMessage;

    if (isGameOver) {
        const scoreSummary = `Score final : Vous ${finalPlayerScore} - IA ${finalAiScore}`;
        if(finalPlayerScore > finalAiScore) finalGameMessage = `Vous avez gagné ! ${scoreSummary}`;
        else if(finalAiScore > finalPlayerScore) finalGameMessage = `L'IA a gagné. ${scoreSummary}`;
        else finalGameMessage = `Égalité ! ${scoreSummary}`;
    } else {
        finalGameMessage = "Round suivant ! À vous de jouer.";
    }
    
    setGameState(prev => {
        let newPlayerDiscard = [...prev.player.discard];
        let newAiDiscard = [...prev.ai.discard];
        let newChallengeCard = prev.challengeCard;

        if (roundResult.winner === 'PLAYER') {
            newChallengeCard = playerPlayedCard;
            newAiDiscard.push(aiPlayedCard);
        } else if (roundResult.winner === 'AI') {
            newChallengeCard = aiPlayedCard;
            newPlayerDiscard.push(playerPlayedCard);
        } else { // DRAW - Rule: highest base power becomes new challenge
            if (playerPlayedCard.basePower > aiPlayedCard.basePower) {
                newChallengeCard = playerPlayedCard;
                newAiDiscard.push(aiPlayedCard);
            } else if (aiPlayedCard.basePower > playerPlayedCard.basePower) {
                newChallengeCard = aiPlayedCard;
                newPlayerDiscard.push(playerPlayedCard);
            } else { // Base powers are equal, player wins the tie-break for the challenge
                newChallengeCard = playerPlayedCard;
                newAiDiscard.push(aiPlayedCard);
            }
        }
        
        return {
          ...prev,
          player: { ...prev.player, score: finalPlayerScore, discard: newPlayerDiscard },
          ai: { ...prev.ai, score: finalAiScore, discard: newAiDiscard },
          challengeCard: newChallengeCard,
          phase: nextPhase,
          playerPlayedCard: null,
          aiPlayedCard: null,
          roundResult: null,
          gameMessage: finalGameMessage,
        }
    });
  }

  const handlePlayerPlayCard = (cardId: number) => {
    if (gameState.phase !== 'PLAYER_TURN') return;

    const playerCard = gameState.player.hand.find(c => c.id === cardId);
    if (!playerCard) return;
    
    // Set AI_THINKING phase, which triggers the useEffect to make the AI move
    setGameState(prev => ({
      ...prev,
      player: { ...prev.player, hand: prev.player.hand.filter(c => c.id !== cardId) },
      playerPlayedCard: playerCard,
      phase: 'AI_THINKING',
      gameMessage: "L'IA réfléchit...",
    }));
  };

  return { gameState, handlePlayerPlayCard, resetGame, handleContinueToNextRound };
};

// --- LOGIC FUNCTIONS (moved outside hook for clarity) ---

const getDiceRequirements = (playerCard: Card, aiCard: Card, challenge: Card) => {
    const requirements = { player: false, ai: false };
    if (!playerCard || !aiCard || !challenge) return requirements;

    if (playerCard.basePower === -1) requirements.player = true;
    if (aiCard.basePower === -1) requirements.ai = true;

    const playerPowerForCheck = playerCard.basePower;
    const aiPowerForCheck = aiCard.basePower;

    switch (challenge.challenge) {
        case ChallengeType.BAKER_VS_KNITTER_ADD_DICE:
        case ChallengeType.KNITTER_VS_BAKER_SUB_DICE:
            if (playerCard.gang !== aiCard.gang) {
                requirements.player = true;
                requirements.ai = true;
            }
            break;
        case ChallengeType.EVEN_ADD_DICE:
            if(playerPowerForCheck !== -1 && playerPowerForCheck % 2 === 0) requirements.player = true;
            if(aiPowerForCheck !== -1 && aiPowerForCheck % 2 === 0) requirements.ai = true;
            break;
        case ChallengeType.ODD_SUB_DICE:
            if (playerPowerForCheck % 2 !== 0) requirements.player = true;
            if (aiPowerForCheck % 2 !== 0) requirements.ai = true;
            break;
        case ChallengeType.STRONGER_ADD_DICE:
            if (playerPowerForCheck > aiPowerForCheck) requirements.player = true;
            else if (aiPowerForCheck > playerPowerForCheck) requirements.ai = true;
            break;
    }
    return requirements;
};

const calculateRoundResult = (
    playerPlayedCard: Card,
    aiPlayedCard: Card,
    challengeCard: Card,
    playerDiceResult: number | null,
    aiDiceResult: number | null
): RoundResult => {
    let playerPower = playerPlayedCard.basePower === -1 ? playerDiceResult! : playerPlayedCard.basePower;
    let aiPower = aiPlayedCard.basePower === -1 ? aiDiceResult! : aiPlayedCard.basePower;

    let explanation = `Défi: ${challengeCard.challengeText}\n`;
    explanation += `Vous jouez ${playerPlayedCard.name} (base ${playerPlayedCard.basePower}), IA joue ${aiPlayedCard.name} (base ${aiPlayedCard.basePower}).\n`;
    if(playerPlayedCard.basePower === -1) explanation += `Votre dé pour Honorine : ${playerDiceResult}. Puissance = ${playerPower}.\n`;
    if(aiPlayedCard.basePower === -1) explanation += `Dé de l'IA pour Honorine : ${aiDiceResult}. Puissance = ${aiPower}.\n`;

    const applyChallenge = () => {
        let p = playerPower;
        let a = aiPower;

        switch (challengeCard.challenge) {
            case ChallengeType.BAKER_VS_KNITTER_ADD_DICE:
                if (playerPlayedCard.gang !== aiPlayedCard.gang) {
                    if(playerDiceResult) p += playerDiceResult; if(aiDiceResult) a += aiDiceResult;
                    explanation += `Pâtissière vs Tricoteuse: +${playerDiceResult} pour vous, +${aiDiceResult} pour l'IA.\n`;
                }
                break;
            case ChallengeType.WEAKER_ADD_3:
                if (p < a) { p += 3; explanation += `${playerPlayedCard.name} est plus faible: +3 points.\n`; } 
                else if (a < p) { a += 3; explanation += `${aiPlayedCard.name} est plus faible: +3 points.\n`; }
                break;
            case ChallengeType.EVEN_ADD_DICE:
                if(playerPlayedCard.basePower !== -1 && playerPlayedCard.basePower % 2 === 0 && playerDiceResult) { p += playerDiceResult; explanation += `${playerPlayedCard.name} est paire: +${playerDiceResult} points.\n`; }
                if(aiPlayedCard.basePower !== -1 && aiPlayedCard.basePower % 2 === 0 && aiDiceResult) { a += aiDiceResult; explanation += `${aiPlayedCard.name} est paire: +${aiDiceResult} points.\n`; }
                break;
            case ChallengeType.ODD_SUB_DICE:
                if(playerPlayedCard.basePower % 2 !== 0 && playerDiceResult) { p -= playerDiceResult; explanation += `${playerPlayedCard.name} est impaire: -${playerDiceResult} points.\n`; }
                if(aiPlayedCard.basePower % 2 !== 0 && aiDiceResult) { a -= aiDiceResult; explanation += `${aiPlayedCard.name} est impaire: -${aiDiceResult} points.\n`; }
                break;
            case ChallengeType.EQUAL_ADD_2_KNITTER:
                 if (playerPlayedCard.basePower === aiPlayedCard.basePower && playerPlayedCard.gang === Gang.Knitters) { p += 2; explanation += `Égalité, ${playerPlayedCard.name} (Tricoteuse) gagne +2.\n`; }
                 if (playerPlayedCard.basePower === aiPlayedCard.basePower && aiPlayedCard.gang === Gang.Knitters) { a += 2; explanation += `Égalité, ${aiPlayedCard.name} (Tricoteuse) gagne +2.\n`; }
                break;
            case ChallengeType.KNITTER_VS_BAKER_SUB_DICE:
                if (playerPlayedCard.gang !== aiPlayedCard.gang) {
                    if(playerDiceResult) p -= playerDiceResult; if(aiDiceResult) a -= aiDiceResult;
                    explanation += `Tricoteuse vs Pâtissière: -${playerDiceResult} pour vous, -${aiDiceResult} pour l'IA.\n`;
                }
                break;
            case ChallengeType.KNITTER_VS_KNITTER_DRAW:
                if(playerPlayedCard.gang === Gang.Knitters && aiPlayedCard.gang === Gang.Knitters){ p = a; explanation += `Tricoteuse vs Tricoteuse: Match nul.\n`; }
                break;
            case ChallengeType.KNITTER_VS_BAKER_SUB_3_KNITTER:
                if(playerPlayedCard.gang === Gang.Knitters && aiPlayedCard.gang === Gang.Bakers) { p -= 3; explanation += `${playerPlayedCard.name} (Tricoteuse) perd 3 points.\n`; }
                if(aiPlayedCard.gang === Gang.Knitters && playerPlayedCard.gang === Gang.Bakers) { a -= 3; explanation += `${aiPlayedCard.name} (Tricoteuse) perd 3 points.\n`; }
                break;
            case ChallengeType.WEAKER_WINS:
                explanation += `Règle spéciale: la carte la plus faible gagne.\n`;
                break;
            case ChallengeType.BAKER_VS_KNITTER_ADD_1_KNITTER:
                if(playerPlayedCard.gang === Gang.Bakers && aiPlayedCard.gang === Gang.Knitters) { a += 1; explanation += `${aiPlayedCard.name} (Tricoteuse) gagne +1.\n`; }
                if(aiPlayedCard.gang === Gang.Bakers && playerPlayedCard.gang === Gang.Knitters) { p += 1; explanation += `${playerPlayedCard.name} (Tricoteuse) gagne +1.\n`; }
                break;
            case ChallengeType.EQUAL_ADD_1_BAKER:
                if (playerPlayedCard.basePower === aiPlayedCard.basePower && playerPlayedCard.gang === Gang.Bakers) { p += 1; explanation += `Égalité, ${playerPlayedCard.name} (Pâtissière) gagne +1.\n`; }
                if (playerPlayedCard.basePower === aiPlayedCard.basePower && aiPlayedCard.gang === Gang.Bakers) { a += 1; explanation += `Égalité, ${aiPlayedCard.name} (Pâtissière) gagne +1.\n`; }
                break;
            case ChallengeType.STRONGER_ADD_DICE:
                if (playerPlayedCard.basePower > aiPlayedCard.basePower && playerDiceResult) { p += playerDiceResult; explanation += `${playerPlayedCard.name} est plus forte: +${playerDiceResult} points.\n`; } 
                else if (aiPlayedCard.basePower > playerPlayedCard.basePower && aiDiceResult) { a += aiDiceResult; explanation += `${aiPlayedCard.name} est plus forte: +${aiDiceResult} points.\n`; }
                break;
            case ChallengeType.KNITTER_VS_BAKER_ADD_1_BAKER:
                 if(playerPlayedCard.gang === Gang.Bakers && aiPlayedCard.gang === Gang.Knitters) { p += 1; explanation += `${playerPlayedCard.name} (Pâtissière) gagne +1.\n`; }
                 if(aiPlayedCard.gang === Gang.Bakers && playerPlayedCard.gang === Gang.Knitters) { a += 1; explanation += `${aiPlayedCard.name} (Pâtissière) gagne +1.\n`; }
                break;
            case ChallengeType.BAKER_VS_KNITTER_SUB_1_KNITTER:
                if(playerPlayedCard.gang === Gang.Bakers && aiPlayedCard.gang === Gang.Knitters) { a -= 1; explanation += `${aiPlayedCard.name} (Tricoteuse) perd 1 point.\n`; }
                if(aiPlayedCard.gang === Gang.Bakers && playerPlayedCard.gang === Gang.Knitters) { p -= 1; explanation += `${playerPlayedCard.name} (Tricoteuse) perd 1 point.\n`; }
                break;
            case ChallengeType.BAKER_VS_BAKER_DRAW:
                if(playerPlayedCard.gang === Gang.Bakers && aiPlayedCard.gang === Gang.Bakers){ p = a; explanation += `Pâtissière vs Pâtissière: Match nul.\n`; }
                break;
            case ChallengeType.STRONGER_SUB_2:
                if (playerPlayedCard.basePower > aiPlayedCard.basePower) { p -= 2; explanation += `${playerPlayedCard.name} est plus forte: -2 points.\n`; }
                else if (aiPlayedCard.basePower > playerPlayedCard.basePower) { a -= 2; explanation += `${aiPlayedCard.name} est plus forte: -2 points.\n`; }
                break;
        }
        return { p, a };
    };

    const { p: finalPlayerPower, a: finalAiPower } = applyChallenge();

    let winner: 'PLAYER' | 'AI' | 'DRAW';
    let scoreGained = 0;
    
    let playerWins = finalPlayerPower > finalAiPower;
    if(challengeCard.challenge === ChallengeType.WEAKER_WINS && finalPlayerPower !== finalAiPower) {
        playerWins = finalPlayerPower < finalAiPower;
    }

    if (finalPlayerPower === finalAiPower) {
        winner = 'DRAW';
        explanation += `\nRésultat Final: Match nul !`;
    } else if (playerWins) {
        winner = 'PLAYER';
        scoreGained = Math.abs(finalPlayerPower - finalAiPower);
        explanation += `\nRésultat Final: Vous gagnez le round et ${scoreGained} cookie(s).`;
    } else {
        winner = 'AI';
        scoreGained = Math.abs(finalPlayerPower - finalAiPower);
        explanation += `\nRésultat Final: L'IA gagne le round et ${scoreGained} cookie(s).`;
    }
    
    return { winner, explanation, playerPower: finalPlayerPower, aiPower: finalAiPower, scoreGained };
}