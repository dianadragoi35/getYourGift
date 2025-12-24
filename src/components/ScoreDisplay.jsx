import './ScoreDisplay.css';

export function ScoreDisplay({ currentScore, targetScore }) {
  return (
    <div className="score-display">
      <div className="score-label">Progress</div>
      <div className="score-value">
        <span className="current-score">{currentScore.toLocaleString()}</span>
        <span className="score-separator"> / </span>
        <span className="target-score">{targetScore.toLocaleString()}</span>
      </div>
    </div>
  );
}
