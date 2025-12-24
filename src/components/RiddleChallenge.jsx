import { useState } from 'react';
import { validateAnswer } from '../utils/gameLogic.js';
import './RiddleChallenge.css';

export function RiddleChallenge({ question, correctAnswer, hint, points, onComplete }) {
  const [userAnswer, setUserAnswer] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!userAnswer.trim()) {
      return;
    }

    const correct = validateAnswer(userAnswer, correctAnswer, 'riddle');

    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      // Delay to show success message, then complete
      setTimeout(() => {
        onComplete(points);
      }, 1500);
    } else {
      // Reset feedback after showing error
      setTimeout(() => {
        setShowFeedback(false);
        setUserAnswer('');
      }, 2000);
    }
  };

  return (
    <div className="riddle-challenge">
      <div className="challenge-question">{question}</div>

      <form onSubmit={handleSubmit} className="riddle-form">
        <input
          type="text"
          className="riddle-input"
          placeholder="Type your answer..."
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          disabled={showFeedback && isCorrect}
          autoFocus
        />

        <button
          type="submit"
          className="riddle-submit"
          disabled={!userAnswer.trim() || (showFeedback && isCorrect)}
        >
          Submit
        </button>
      </form>

      {hint && !showHint && !isCorrect && (
        <button
          className="hint-button"
          onClick={() => setShowHint(true)}
        >
          💡 Need a hint?
        </button>
      )}

      {showHint && hint && (
        <div className="hint">
          {hint}
        </div>
      )}

      {showFeedback && (
        <div className={`feedback ${isCorrect ? 'success' : 'error'}`}>
          {isCorrect ? (
            <>
              <span className="feedback-icon">✓</span>
              <span className="feedback-text">Correct! +{points.toLocaleString()} points</span>
            </>
          ) : (
            <>
              <span className="feedback-icon">✗</span>
              <span className="feedback-text">Not quite. Try again!</span>
            </>
          )}
        </div>
      )}
    </div>
  );
}
