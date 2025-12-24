import { GAME_CONFIG } from '../data/config.js';

/**
 * Calculate constrained random points for the risk button
 * Ensures the game can still reach exactly 13,000 without overshooting
 *
 * @param {number} currentScore - Current total score
 * @param {Array} remainingChallenges - Challenges not yet completed
 * @returns {number|null} - Random points to award, or null if risk would cause overshooting
 */
export function getConstrainedRiskPoints(currentScore, remainingChallenges) {
  const remainingPoints = GAME_CONFIG.TARGET_SCORE - currentScore;

  // Calculate minimum points still needed from non-risk, non-current challenges
  const minNeededAfter = remainingChallenges
    .filter(c => c.type !== 'risk')
    .reduce((sum, c) => sum + (c.points || 0), 0);

  // Maximum we can award without making it impossible to reach exactly 13,000
  const maxAllowable = remainingPoints - minNeededAfter;

  // Standard risk range
  const riskMin = GAME_CONFIG.RISK_BUTTON_MIN;
  const riskMax = GAME_CONFIG.RISK_BUTTON_MAX;

  // If we can't award even the minimum, risk button should be disabled
  if (maxAllowable < riskMin) {
    return null;
  }

  // Constrain the maximum to what's safe
  const constrainedMax = Math.min(riskMax, maxAllowable);
  const constrainedMin = Math.min(riskMin, constrainedMax);

  // Generate random number in the constrained range
  return Math.floor(Math.random() * (constrainedMax - constrainedMin + 1)) + constrainedMin;
}

/**
 * Calculate exact points needed for final challenge
 * This ensures the score reaches exactly 13,000
 *
 * @param {number} currentScore - Current total score
 * @returns {number} - Exact points needed to reach target
 */
export function calculateFinalChallengePoints(currentScore) {
  return GAME_CONFIG.TARGET_SCORE - currentScore;
}

/**
 * Validate user answer for pattern and riddle challenges
 *
 * @param {string} userAnswer - User's submitted answer
 * @param {string} correctAnswer - The correct answer
 * @param {string} type - Challenge type ('pattern' or 'riddle')
 * @returns {boolean} - Whether the answer is correct
 */
export function validateAnswer(userAnswer, correctAnswer, type) {
  // Trim whitespace
  const trimmedUser = userAnswer.trim();
  const trimmedCorrect = correctAnswer.trim();

  if (type === 'riddle') {
    // Case-insensitive for riddles
    return trimmedUser.toLowerCase() === trimmedCorrect.toLowerCase();
  } else {
    // Exact match for pattern challenges
    return trimmedUser === trimmedCorrect;
  }
}

/**
 * Check if the game is complete
 *
 * @param {number} currentScore - Current total score
 * @returns {boolean} - Whether the target score has been reached
 */
export function isGameComplete(currentScore) {
  return currentScore >= GAME_CONFIG.TARGET_SCORE;
}

/**
 * Get the next incomplete challenge from a list
 *
 * @param {Array} allChallenges - All challenges
 * @param {Array} completedIds - IDs of completed challenges
 * @returns {Object|null} - Next challenge to complete, or null if all done
 */
export function getNextChallenge(allChallenges, completedIds) {
  // Sort by order
  const sortedChallenges = [...allChallenges].sort((a, b) => a.order - b.order);

  // Find first challenge that hasn't been completed
  return sortedChallenges.find(challenge => !completedIds.includes(challenge.id)) || null;
}

/**
 * Get all remaining challenges (not yet completed)
 *
 * @param {Array} allChallenges - All challenges
 * @param {Array} completedIds - IDs of completed challenges
 * @returns {Array} - Remaining challenges
 */
export function getRemainingChallenges(allChallenges, completedIds) {
  return allChallenges.filter(challenge => !completedIds.includes(challenge.id));
}
