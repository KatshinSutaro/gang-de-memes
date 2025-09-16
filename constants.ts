import type { Card } from './types';
import { Gang, ChallengeType } from './types';

export const CARDS: Card[] = [
    // --- GANG DES TRICOTEUSES (KNITTERS) ---
    {
        id: 1,
        name: 'Honorine Padanlévier',
        gang: Gang.Knitters,
        basePower: -1, // Lunatic
        challenge: ChallengeType.BAKER_VS_KNITTER_ADD_DICE,
        challengeText: 'Pâtissière vs Tricoteuse : Ajoute le résultat d\'un dé à la valeur de chaque carte.'
    },
    {
        id: 2,
        name: 'Nicole Palebois',
        gang: Gang.Knitters,
        basePower: 1,
        challenge: ChallengeType.WEAKER_ADD_3,
        challengeText: 'Carte plus faible : +3 points à sa valeur.'
    },
    {
        id: 3,
        name: 'Trudy Balle',
        gang: Gang.Knitters,
        basePower: 2,
        challenge: ChallengeType.EVEN_ADD_DICE,
        challengeText: 'Carte de valeur paire : Ajoute le résultat d\'un dé à sa valeur.'
    },
    {
        id: 4,
        name: 'Odile Duchitte',
        gang: Gang.Knitters,
        basePower: 3,
        challenge: ChallengeType.ODD_SUB_DICE,
        challengeText: 'Carte de valeur impaire : Soustrait le résultat d\'un dé de sa valeur.'
    },
    {
        id: 5,
        name: 'Esther Valley',
        gang: Gang.Knitters,
        basePower: 4,
        challenge: ChallengeType.EQUAL_ADD_2_KNITTER,
        challengeText: 'Valeurs égales : +2 points à la valeur de la Tricoteuse.'
    },
    {
        id: 6,
        name: 'Annick Boucheur',
        gang: Gang.Knitters,
        basePower: 5,
        challenge: ChallengeType.KNITTER_VS_BAKER_SUB_DICE,
        challengeText: 'Tricoteuse vs Pâtissière : Soustrait le résultat d\'un dé de la valeur de chaque carte.'
    },
    {
        id: 7,
        name: 'Adélina Ottension',
        gang: Gang.Knitters,
        basePower: 6,
        challenge: ChallengeType.KNITTER_VS_KNITTER_DRAW,
        challengeText: 'Tricoteuse vs Tricoteuse : Match nul, les deux cartes sont défaussées.'
    },
    {
        id: 8,
        name: 'Fanny Revabois',
        gang: Gang.Knitters,
        basePower: 7,
        challenge: ChallengeType.KNITTER_VS_BAKER_SUB_3_KNITTER,
        challengeText: 'Tricoteuse vs Pâtissière : -3 points à la valeur de la Tricoteuse.'
    },
    // --- GANG DES PÂTISSIÈRES (BAKERS) ---
    {
        id: 9,
        name: 'Sophie Lyss',
        gang: Gang.Bakers,
        basePower: 0,
        challenge: ChallengeType.WEAKER_WINS,
        challengeText: 'Carte plus faible : Remporte le duel.'
    },
    {
        id: 10,
        name: 'Marie Rouanna',
        gang: Gang.Bakers,
        basePower: 1,
        challenge: ChallengeType.BAKER_VS_KNITTER_ADD_1_KNITTER,
        challengeText: 'Pâtissière vs Tricoteuse : +1 point à la valeur de la Tricoteuse.'
    },
    {
        id: 11,
        name: 'Alyson Leyklosh',
        gang: Gang.Bakers,
        basePower: 2,
        challenge: ChallengeType.EQUAL_ADD_1_BAKER,
        challengeText: 'Valeurs égales : +1 point à la valeur de la Pâtissière.'
    },
    {
        id: 12,
        name: 'Agatha Stroffe',
        gang: Gang.Bakers,
        basePower: 3,
        challenge: ChallengeType.STRONGER_ADD_DICE,
        challengeText: 'Carte plus forte : Ajoute le résultat d\'un dé à sa valeur.'
    },
    {
        id: 13,
        name: 'Ashley Menumenu',
        gang: Gang.Bakers,
        basePower: 4,
        challenge: ChallengeType.KNITTER_VS_BAKER_ADD_1_BAKER,
        challengeText: 'Tricoteuse vs Pâtissière : +1 point à la valeur de la Pâtissière.'
    },
    {
        id: 14,
        name: 'Sarah Vigotte',
        gang: Gang.Bakers,
        basePower: 5,
        challenge: ChallengeType.BAKER_VS_KNITTER_SUB_1_KNITTER,
        challengeText: 'Pâtissière vs Tricoteuse : -1 point à la valeur de la Tricoteuse.'
    },
    {
        id: 15,
        name: 'Lucie Kopatte',
        gang: Gang.Bakers,
        basePower: 6,
        challenge: ChallengeType.BAKER_VS_BAKER_DRAW,
        challengeText: 'Pâtissière vs Pâtissière : Match nul, les deux cartes sont défaussées.'
    },
    {
        id: 16,
        name: 'Yvette Ferdumal',
        gang: Gang.Bakers,
        basePower: 7,
        challenge: ChallengeType.STRONGER_SUB_2,
        challengeText: 'Carte plus forte : -2 points à sa valeur.'
    },
];
