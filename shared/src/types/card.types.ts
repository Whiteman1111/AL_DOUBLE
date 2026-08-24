/**
 * Card Types
 * 
 * Core card data structures used throughout the game
 */

export interface Card {
  rank: CardRank;
  suit: CardSuit;
}

export enum CardRank {
  ACE = 'A',
  KING = 'K',
  QUEEN = 'Q',
  JACK = 'J',
  TEN = '10',
  NINE = '9',
}

export enum CardSuit {
  HEARTS = '♥',
  DIAMONDS = '♦',
  CLUBS = '♣',
  SPADES = '♠',
}

export interface Hand {
  type: HandType;
  cards: Card[];
  primaryRank: CardRank;
  secondaryRank?: CardRank;
  displayText: string;
  rankScore: number;
}

export enum HandType {
  FOUR_OF_A_KIND = 4,
  THREE_OF_A_KIND = 3,
  PAIR = 2,
  HIGH_CARD = 1,
}

export const CARD_RANK_ORDER: Record<CardRank, number> = {
  [CardRank.ACE]: 6,
  [CardRank.KING]: 5,
  [CardRank.QUEEN]: 4,
  [CardRank.JACK]: 3,
  [CardRank.TEN]: 2,
  [CardRank.NINE]: 1,
};

export const CARD_RANK_NUMERIC: Record<CardRank, number> = {
  [CardRank.ACE]: 14,
  [CardRank.KING]: 13,
  [CardRank.QUEEN]: 12,
  [CardRank.JACK]: 11,
  [CardRank.TEN]: 10,
  [CardRank.NINE]: 9,
};

/**
 * Hand Comparison Result
 * 
 * 1 = hand1 wins
 * -1 = hand2 wins
 * 0 = tie
 */
export type HandComparisonResult = 1 | -1 | 0;

/**
 * Ranked Hand (used when sorting multiple hands)
 */
export interface RankedHand {
  hand: Hand;
  rank: number;
}
