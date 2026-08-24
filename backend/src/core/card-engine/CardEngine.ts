/**
 * CARD ENGINE (FACADE)
 * 
 * Public interface for card operations
 * Combines CardEvaluator and Deck
 */

import { Card, Hand, RankedHand } from '@shared/types/card.types';
import { CardEvaluator } from './CardEvaluator';
import { Deck } from './Deck';

export class CardEngine {
  /**
   * Evaluate a hand
   */
  static evaluateHand(cards: Card[]): Hand {
    return CardEvaluator.evaluateHand(cards);
  }

  /**
   * Compare two hands
   */
  static compareHands(hand1: Hand, hand2: Hand): number {
    return CardEvaluator.compareHands(hand1, hand2);
  }

  /**
   * Rank multiple hands
   */
  static rankHands(hands: Hand[]): RankedHand[] {
    return CardEvaluator.rankHands(hands);
  }

  /**
   * Determine winner from hands
   */
  static determineWinner(hands: Hand[]): Hand {
    return CardEvaluator.determineWinner(hands);
  }

  /**
   * Create new deck
   */
  static createDeck(): Deck {
    return new Deck();
  }
}
