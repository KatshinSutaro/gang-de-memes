export enum Gang {
    Knitters = 'Knitters',
    Bakers = 'Bakers',
}

export enum ChallengeType {
    BAKER_VS_KNITTER_ADD_DICE,
    WEAKER_ADD_3,
    EVEN_ADD_DICE,
    ODD_SUB_DICE,
    EQUAL_ADD_2_KNITTER,
    KNITTER_VS_BAKER_SUB_DICE,
    KNITTER_VS_KNITTER_DRAW,
    KNITTER_VS_BAKER_SUB_3_KNITTER,
    WEAKER_WINS,
    BAKER_VS_KNITTER_ADD_1_KNITTER,
    EQUAL_ADD_1_BAKER,
    STRONGER_ADD_DICE,
    KNITTER_VS_BAKER_ADD_1_BAKER,
    BAKER_VS_KNITTER_SUB_1_KNITTER,
    BAKER_VS_BAKER_DRAW,
    STRONGER_SUB_2,
}

export interface Card {
    id: number;
    name: string;
    gang: Gang;
    basePower: number;
    challenge: ChallengeType;
    challengeText: string;
}

export type GamePhase = 'START' | 'PLAYER_TURN' | 'AI_THINKING' | 'RESOLUTION' | 'WAIT_FOR_CONTINUE' | 'GAME_OVER';

export interface Player {
    hand: Card[];
    discard: Card[];
    score: number;
}

export interface RoundResult {
    winner: 'PLAYER' | 'AI' | 'DRAW';
    explanation: string;
    playerPower: number;
    aiPower: number;
    scoreGained: number;
}

export interface GameState {
    player: Player;
    ai: Player;
    deck: Card[];
    challengeCard: Card | null;
    phase: GamePhase;
    gameMessage: string;
    roundResult: RoundResult | null;
    playerPlayedCard: Card | null;
    aiPlayedCard: Card | null;
    playerDiceResult: number | null;
    aiDiceResult: number | null;
}