import { PatternChallenge } from './PatternChallenge.jsx';
import { RiddleChallenge } from './RiddleChallenge.jsx';
import { RiskButton } from './RiskButton.jsx';
import { calculateFinalChallengePoints } from '../utils/gameLogic.js';
import './ChallengeCard.css';

export function ChallengeCard({
  challenge,
  currentScore,
  remainingChallenges,
  riskButtonUsesRemaining,
  onComplete,
  onUseRisk
}) {
  const renderChallenge = () => {
    switch (challenge.type) {
      case 'pattern':
        return (
          <PatternChallenge
            question={challenge.question}
            options={challenge.options}
            correctAnswer={challenge.correctAnswer}
            points={challenge.points}
            onComplete={onComplete}
          />
        );

      case 'riddle':
        return (
          <RiddleChallenge
            question={challenge.question}
            correctAnswer={challenge.correctAnswer}
            hint={challenge.hint}
            points={challenge.points}
            onComplete={onComplete}
          />
        );

      case 'risk':
        return (
          <RiskButton
            currentScore={currentScore}
            remainingChallenges={remainingChallenges}
            usesRemaining={riskButtonUsesRemaining}
            onComplete={onComplete}
            onUseRisk={onUseRisk}
          />
        );

      case 'final':
        const finalPoints = calculateFinalChallengePoints(currentScore);
        return (
          <div className="final-challenge">
            <div className="challenge-question">{challenge.question}</div>
            <div className="final-description">
              You're almost there. One final step to unlock your reward.
            </div>
            <button
              className="final-button"
              onClick={() => onComplete(finalPoints)}
            >
              Complete Journey
            </button>
            <div className="final-points-preview">
              +{finalPoints.toLocaleString()} points
            </div>
          </div>
        );

      default:
        return <div>Unknown challenge type</div>;
    }
  };

  return (
    <div className="challenge-card fade-in">
      {renderChallenge()}
    </div>
  );
}
