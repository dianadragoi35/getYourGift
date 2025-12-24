import { useState } from 'react';
import { getConstrainedRiskPoints } from '../utils/gameLogic.js';
import './RiskButton.css';

export function RiskButton({ currentScore, remainingChallenges, usesRemaining, onComplete, onUseRisk }) {
  const [isRevealing, setIsRevealing] = useState(false);
  const [revealedPoints, setRevealedPoints] = useState(null);

  const handleClick = () => {
    // Calculate constrained random points
    const points = getConstrainedRiskPoints(currentScore, remainingChallenges);

    if (points === null) {
      // Risk button should be disabled (this shouldn't happen if we disable properly)
      return;
    }

    // Use one risk button attempt
    onUseRisk();

    // Start reveal animation
    setIsRevealing(true);
    setRevealedPoints(points);

    // Complete after animation
    setTimeout(() => {
      onComplete(points);
    }, 2500);
  };

  // Check if risk button can be used safely
  const constrainedPoints = getConstrainedRiskPoints(currentScore, remainingChallenges);
  const isDisabled = usesRemaining <= 0 || constrainedPoints === null || isRevealing;

  return (
    <div className="risk-button-container">
      <div className="challenge-question">
        A mysterious opportunity appears...
      </div>

      <div className="risk-description">
        Take a chance and earn bonus points. But choose wisely.
      </div>

      {!isRevealing ? (
        <button
          className="risk-button"
          onClick={handleClick}
          disabled={isDisabled}
        >
          {usesRemaining > 0 ? 'Take a Risk?' : 'Already Used'}
        </button>
      ) : (
        <div className="risk-reveal">
          <div className="reveal-animation">
            <div className="reveal-text">You earned</div>
            <div className="reveal-points">+{revealedPoints?.toLocaleString()}</div>
            <div className="reveal-subtext">points!</div>
          </div>
        </div>
      )}

      {usesRemaining > 0 && !isRevealing && (
        <div className="risk-info">
          {usesRemaining === 1 ? 'One use only' : `${usesRemaining} uses remaining`}
        </div>
      )}
    </div>
  );
}
