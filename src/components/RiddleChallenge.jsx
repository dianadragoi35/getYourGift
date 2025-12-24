import { useState } from 'react';
import { validateAnswer } from '../utils/gameLogic.js';
import './RiddleChallenge.css';

export function RiddleChallenge({ question, correctAnswer, points, onComplete }) {
  const [userAnswer, setUserAnswer] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!userAnswer.trim()) {
      return;
    }

    const correct = validateAnswer(userAnswer, correctAnswer, 'riddle');

    setIsCorrect(correct);
    setShowFeedback(true);
    setAttempts(attempts + 1);

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

  const showHint = attempts >= 2 && !isCorrect;

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

      {showHint && (
        <div className="hint">
          Hint: The answer starts with "{correctAnswer.charAt(0).toUpperCase()}"
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
