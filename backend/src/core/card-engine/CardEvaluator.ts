/**
 * CARD EVALUATOR
 * 
 * Responsible for:
 * - Evaluating a 4-card hand
 * - Determining hand type and strength
 * - Comparing two hands
 * - Ranking multiple hands
 * - Determining winner
 * 
 * RULE: REPETITION BEATS HIGHER SINGLE CARD
 * Example: Pair 9 > High Card A
 */

import {
  Card,
  CardRank,
  Hand,
  HandType,
  CARD_RANK_ORDER,
  HandComparisonResult,
  RankedHand,
} from '@shared/types/card.types';

export class CardEvaluator {
  /**
   * Evaluate a 4-card hand and return Hand object
   * 
   * @throws Error if hand doesn't have exactly 4 cards
   */
  static evaluateHand(cards: Card[]): Hand {
    if (cards.length !== 4) {
      throw new Error('Hand must contain exactly 4 cards');
    }

    // Count occurrences of each rank
    const rankCounts = new Map<CardRank, number>();
    for (const card of cards) {
      rankCounts.set(card.rank, (rankCounts.get(card.rank) || 0) + 1);
    }

    // Sort counts in descending order to find hand type
    const counts = Array.from(rankCounts.values()).sort((a, b) => b - a);

    if (counts[0] === 4) {
      return this.evaluateFourOfAKind(cards, rankCounts);
    } else if (counts[0] === 3) {
      return this.evaluateThreeOfAKind(cards, rankCounts);
    } else if (counts[0] === 2) {
      return this.evaluatePair(cards, rankCounts);
    } else {
      return this.evaluateHighCard(cards);
    }
  }

  /**
   * Evaluate Four of a Kind
   * All 4 cards have same rank
   */
  private static evaluateFourOfAKind(
    cards: Card[],
    rankCounts: Map<CardRank, number>,
  ): Hand {
    const quadRank = Array.from(rankCounts.entries()).find(
      ([_, count]) => count === 4,
    )![0];

    return {
      type: HandType.FOUR_OF_A_KIND,
      cards: cards.filter((c) => c.rank === quadRank),
      primaryRank: quadRank,
      displayText: `Four ${this.getRankLabel(quadRank)}`,
      rankScore: HandType.FOUR_OF_A_KIND * 1000 + CARD_RANK_ORDER[quadRank],
    };
  }

  /**
   * Evaluate Three of a Kind
   * 3 cards have same rank
   */
  private static evaluateThreeOfAKind(
    cards: Card[],
    rankCounts: Map<CardRank, number>,
  ): Hand {
    const tripleRank = Array.from(rankCounts.entries()).find(
      ([_, count]) => count === 3,
    )![0];

    return {
      type: HandType.THREE_OF_A_KIND,
      cards: cards.filter((c) => c.rank === tripleRank),
      primaryRank: tripleRank,
      displayText: `Three ${this.getRankLabel(tripleRank)}`,
      rankScore:
        HandType.THREE_OF_A_KIND * 1000 + CARD_RANK_ORDER[tripleRank],
    };
  }

  /**
   * Evaluate Pair
   * 2 cards have same rank
   */
  private static evaluatePair(
    cards: Card[],
    rankCounts: Map<CardRank, number>,
  ): Hand {
    // Find pair rank (should be only one pair in 4 cards)
    const pairRank = Array.from(rankCounts.entries()).find(
      ([_, count]) => count === 2,
    )![0];

    return {
      type: HandType.PAIR,
      cards: cards.filter((c) => c.rank === pairRank),
      primaryRank: pairRank,
      displayText: `Pair ${this.getRankLabel(pairRank)}`,
      rankScore: HandType.PAIR * 1000 + CARD_RANK_ORDER[pairRank],
    };
  }

  /**
   * Evaluate High Card
   * No cards match (all different)
   */
  private static evaluateHighCard(cards: Card[]): Hand {
    const sortedCards = [...cards].sort((a, b) => b.rank.localeCompare(a.rank));
    const highCard = sortedCards[0];

    return {
      type: HandType.HIGH_CARD,
      cards: [highCard],
      primaryRank: highCard.rank,
      displayText: `High Card ${this.getRankLabel(highCard.rank)}`,
      rankScore: HandType.HIGH_CARD * 1000 + CARD_RANK_ORDER[highCard.rank],
    };
  }

  /**
   * Compare two hands
   * 
   * RULE: REPETITION BEATS HIGHER SINGLE CARD
   * 
   * Comparison order:
   * 1. Hand type (higher type wins, regardless of card rank)
   * 2. If same type, compare card ranks
   * 3. If completely identical, return 0 (tie)
   * 
   * @returns 1 if hand1 wins, -1 if hand2 wins, 0 if tie
   */
  static compareHands(hand1: Hand, hand2: Hand): HandComparisonResult {
    // RULE: Higher hand type ALWAYS wins
    // This is why Pair 9 > High Card A
    if (hand1.type !== hand2.type) {
      return hand1.type > hand2.type ? 1 : -1;
    }

    // Same type, compare primary rank
    const rank1Order = CARD_RANK_ORDER[hand1.primaryRank];
    const rank2Order = CARD_RANK_ORDER[hand2.primaryRank];

    if (rank1Order !== rank2Order) {
      return rank1Order > rank2Order ? 1 : -1;
    }

    // Completely identical
    return 0;
  }

  /**
   * Rank multiple hands (ascending, 1 = best)
   * Stable sort for deterministic ordering
   */
  static rankHands(hands: Hand[]): RankedHand[] {
    return hands
      .map((hand, idx) => ({ hand, originalIndex: idx }))
      .sort((a, b) => {
        const cmp = this.compareHands(a.hand, b.hand);
        if (cmp !== 0) return cmp * -1; // Descending (best first)
        return a.originalIndex - b.originalIndex; // Stable: original order
      })
      .map(({ hand }, rank) => ({ hand, rank: rank + 1 }));
  }

  /**
   * Determine single winner from multiple hands
   * Returns the best hand
   */
  static determineWinner(hands: Hand[]): Hand {
    if (hands.length === 0) {
      throw new Error('No hands to evaluate');
    }

    if (hands.length === 1) {
      return hands[0];
    }

    return hands.reduce((winner, current) => {
      const result = this.compareHands(winner, current);
      return result >= 0 ? winner : current;
    });
  }

  /**
   * Get human-readable rank label
   */
  private static getRankLabel(rank: CardRank): string {
    return rank;
  }
}
