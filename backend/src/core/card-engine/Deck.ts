/**
 * DECK MANAGER
 * 
 * Responsible for:
 * - Creating standard 24-card deck
 * - Shuffling
 * - Dealing cards to players
 * - Tracking dealt cards
 */

import { Card, CardRank, CardSuit } from '@shared/types/card.types';

export class Deck {
  private cards: Card[] = [];
  private dealtIndex: number = 0;

  constructor() {
    this.reset();
  }

  /**
   * Reset deck to full state
   * - 24 cards (A, K, Q, J, 10, 9 × 4 suits)
   */
  private reset(): void {
    this.cards = [];
    this.dealtIndex = 0;

    const ranks = [
      CardRank.ACE,
      CardRank.KING,
      CardRank.QUEEN,
      CardRank.JACK,
      CardRank.TEN,
      CardRank.NINE,
    ];

    const suits = [
      CardSuit.HEARTS,
      CardSuit.DIAMONDS,
      CardSuit.CLUBS,
      CardSuit.SPADES,
    ];

    for (const rank of ranks) {
      for (const suit of suits) {
        this.cards.push({ rank, suit });
      }
    }
  }

  /**
   * Fisher-Yates shuffle algorithm
   * Ensures random distribution
   */
  shuffle(): void {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
    this.dealtIndex = 0;
  }

  /**
   * Deal N cards from top of deck
   */
  dealCards(count: number): Card[] {
    if (this.dealtIndex + count > this.cards.length) {
      throw new Error('Not enough cards in deck');
    }

    const dealt = this.cards.slice(this.dealtIndex, this.dealtIndex + count);
    this.dealtIndex += count;
    return dealt;
  }

  /**
   * Deal 4 cards to each player
   * Returns array of hands for each player
   */
  dealHands(numPlayers: number): Card[][] {
    const hands: Card[][] = [];
    const cardsPerPlayer = 4;

    for (let i = 0; i < numPlayers; i++) {
      hands.push(this.dealCards(cardsPerPlayer));
    }

    return hands;
  }

  /**
   * Get remaining cards count
   */
  getRemainingCount(): number {
    return this.cards.length - this.dealtIndex;
  }

  /**
   * Get total deck size
   */
  getTotalSize(): number {
    return this.cards.length;
  }
}
