import { useState, useEffect, useCallback } from 'react';
import { challenges } from '../data/challenges.js';
import { GAME_CONFIG } from '../data/config.js';
import { saveGameState, loadGameState, clearGameState } from '../utils/storage.js';
import {
  getNextChallenge,
  getRemainingChallenges,
  isGameComplete
} from '../utils/gameLogic.js';

const INITIAL_STATE = {
  currentScore: 0,
  completedChallengeIds: [],
  isGameComplete: false,
  riskButtonUsesRemaining: GAME_CONFIG.RISK_BUTTON_USES,
};

/**
 * Custom hook for managing game state
 * Handles score tracking, challenge progression, and localStorage persistence
 */
export function useGameState() {
  const [state, setState] = useState(() => {
    // Try to load saved state from localStorage on mount
    const savedState = loadGameState();
    return savedState || INITIAL_STATE;
  });

  // Save state to localStorage whenever it changes
  useEffect(() => {
    saveGameState(state);
  }, [state]);

  /**
   * Complete a challenge and award points
   */
  const completeChallenge = useCallback((challengeId, pointsAwarded) => {
    setState(prevState => {
      const newScore = prevState.currentScore + pointsAwarded;
      const newCompletedIds = [...prevState.completedChallengeIds, challengeId];

      // Check if we've reached the target
      const gameComplete = isGameComplete(newScore);

      return {
        ...prevState,
        currentScore: newScore,
        completedChallengeIds: newCompletedIds,
        isGameComplete: gameComplete,
      };
    });
  }, []);

  /**
   * Use one risk button attempt
   */
  const useRiskButton = useCallback(() => {
    setState(prevState => ({
      ...prevState,
      riskButtonUsesRemaining: Math.max(0, prevState.riskButtonUsesRemaining - 1),
    }));
  }, []);

  /**
   * Get the current challenge to display
   */
  const getCurrentChallenge = useCallback(() => {
    return getNextChallenge(challenges, state.completedChallengeIds);
  }, [state.completedChallengeIds]);

  /**
   * Get all remaining challenges
   */
  const getRemainingChallengesList = useCallback(() => {
    return getRemainingChallenges(challenges, state.completedChallengeIds);
  }, [state.completedChallengeIds]);

  /**
   * Reset the game to initial state
   */
  const resetGame = useCallback(() => {
    setState(INITIAL_STATE);
    clearGameState();
  }, []);

  return {
    // State
    currentScore: state.currentScore,
    completedChallengeIds: state.completedChallengeIds,
    isGameComplete: state.isGameComplete,
    riskButtonUsesRemaining: state.riskButtonUsesRemaining,

    // Methods
    completeChallenge,
    useRiskButton,
    getCurrentChallenge,
    getRemainingChallenges: getRemainingChallengesList,
    resetGame,
  };
}
