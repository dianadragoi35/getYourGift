import { useState, useEffect } from 'react';
import { GAME_CONFIG } from '../data/config.js';
import './FinalReveal.css';

export function FinalReveal({ onReset }) {
  const [visibleMessages, setVisibleMessages] = useState([]);
  const [showFinalMessage, setShowFinalMessage] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    // Sequentially reveal messages
    GAME_CONFIG.REVEAL_MESSAGES.forEach((message, index) => {
      setTimeout(() => {
        setVisibleMessages(prev => [...prev, message.text]);
      }, message.delay);
    });

    // Trigger confetti when "Tandem Skydive" message appears (second to last message)
    const tandemMessage = GAME_CONFIG.REVEAL_MESSAGES[GAME_CONFIG.REVEAL_MESSAGES.length - 1];
    setTimeout(() => {
      setShowConfetti(true);
    }, tandemMessage.delay);

    // Show final message after all reveal messages
    const lastMessage = GAME_CONFIG.REVEAL_MESSAGES[GAME_CONFIG.REVEAL_MESSAGES.length - 1];
    const finalMessageDelay = lastMessage.delay + 2000;
    setTimeout(() => {
      setShowFinalMessage(true);
    }, finalMessageDelay);
  }, []);

  return (
    <div className="final-reveal">
      {showConfetti && (
        <div className="confetti-container">
          {[...Array(50)].map((_, i) => (
            <div key={i} className="confetti" style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              backgroundColor: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7', '#a29bfe'][Math.floor(Math.random() * 6)]
            }}></div>
          ))}
        </div>
      )}
      <div className="reveal-container">
        <div className="reveal-messages">
          {visibleMessages.map((message, index) => (
            <div key={index} className="reveal-message fade-in">
              {message}
            </div>
          ))}
        </div>

        {showFinalMessage && (
          <div className="final-message fade-in">
            {GAME_CONFIG.FINAL_MESSAGE}
          </div>
        )}

        {showFinalMessage && (
          <button
            className="reset-button fade-in"
            onClick={onReset}
          >
            Play Again
          </button>
        )}
      </div>
    </div>
  );
}
