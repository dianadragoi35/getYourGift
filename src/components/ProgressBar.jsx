import './ProgressBar.css';

export function ProgressBar({ currentScore, targetScore }) {
  const percentage = Math.min((currentScore / targetScore) * 100, 100);

  return (
    <div className="progress-bar-container">
      <div className="progress-bar-track">
        <div
          className="progress-bar-fill"
          style={{ width: `${percentage}%` }}
        >
          <span className="progress-bar-percentage">
            {Math.round(percentage)}%
          </span>
        </div>
      </div>
    </div>
  );
}
