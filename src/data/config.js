// Game Configuration
// This file contains all the configurable constants for the game
// Edit these values to customize the game experience

export const GAME_CONFIG = {
  // Target score to reach
  TARGET_SCORE: 13000,

  // Risk button configuration
  RISK_BUTTON_MIN: 500,
  RISK_BUTTON_MAX: 2500,
  RISK_BUTTON_USES: 1,

  // Final reveal messages with delays (in milliseconds)
  REVEAL_MESSAGES: [
    { text: "You reached 13,000.", delay: 0 },
    { text: "Meters.", delay: 1500 },
    { text: "That's the altitude of your jump.", delay: 3000 },
  ],

  // Final personal message (shown after reveal)
  FINAL_MESSAGE: "Your skydiving adventure awaits!",

  // Gift card file path (in public folder)
  GIFT_CARD_PATH: "/skydiving-gift-card.pdf",

  // LocalStorage key for game state
  STORAGE_KEY: "reach13000_gameState",
};
