import { useState, useEffect } from 'react';
import { GAME_CONFIG } from '../data/config.js';
import './FinalReveal.css';

export function FinalReveal({ onReset }) {
  const [visibleMessages, setVisibleMessages] = useState([]);
  const [showGiftCard, setShowGiftCard] = useState(false);
  const [showFinalMessage, setShowFinalMessage] = useState(false);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = GAME_CONFIG.GIFT_CARD_PATH;
    link.download = 'skydiving-gift-card.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    // Sequentially reveal messages
    GAME_CONFIG.REVEAL_MESSAGES.forEach((message, index) => {
      setTimeout(() => {
        setVisibleMessages(prev => [...prev, message.text]);
      }, message.delay);
    });

    // Show gift card after all messages
    const lastMessage = GAME_CONFIG.REVEAL_MESSAGES[GAME_CONFIG.REVEAL_MESSAGES.length - 1];
    const giftCardDelay = lastMessage.delay + 2000;
    setTimeout(() => {
      setShowGiftCard(true);
    }, giftCardDelay);

    // Show final message
    setTimeout(() => {
      setShowFinalMessage(true);
    }, giftCardDelay + 1000);
  }, []);

  return (
    <div className="final-reveal">
      <div className="reveal-container">
        <div className="reveal-messages">
          {visibleMessages.map((message, index) => (
            <div key={index} className="reveal-message fade-in">
              {message}
            </div>
          ))}
        </div>

        {showGiftCard && (
          <div className="gift-card-container fade-in">
            <div className="gift-card-frame">
              <img
                src={GAME_CONFIG.GIFT_CARD_PATH}
                alt="Skydiving Gift Card"
                className="gift-card-image"
              />
            </div>
            <button
              className="download-button"
              onClick={handleDownload}
            >
              Download Your Gift
            </button>
          </div>
        )}

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
