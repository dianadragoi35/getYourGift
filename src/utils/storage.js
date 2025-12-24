import { GAME_CONFIG } from '../data/config.js';

/**
 * Save game state to localStorage
 *
 * @param {Object} state - Game state to save
 */
export function saveGameState(state) {
  try {
    const serialized = JSON.stringify(state);
    localStorage.setItem(GAME_CONFIG.STORAGE_KEY, serialized);
  } catch (error) {
    console.error('Failed to save game state to localStorage:', error);
  }
}

/**
 * Load game state from localStorage
 *
 * @returns {Object|null} - Saved game state, or null if not found/invalid
 */
export function loadGameState() {
  try {
    const serialized = localStorage.getItem(GAME_CONFIG.STORAGE_KEY);
    if (serialized === null) {
      return null;
    }
    return JSON.parse(serialized);
  } catch (error) {
    console.error('Failed to load game state from localStorage:', error);
    return null;
  }
}

/**
 * Clear game state from localStorage
 */
export function clearGameState() {
  try {
    localStorage.removeItem(GAME_CONFIG.STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear game state from localStorage:', error);
  }
}
