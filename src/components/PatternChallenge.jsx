import { useState } from 'react';
import { validateAnswer } from '../utils/gameLogic.js';
import './PatternChallenge.css';

export function PatternChallenge({ question, options, correctAnswer, points, onComplete }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleSelect = (option) => {
    const correct = validateAnswer(option, correctAnswer, 'pattern');

    setSelectedAnswer(option);
    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      // Delay to show success message, then complete
      setTimeout(() => {
        onComplete(points);
      }, 1000);
    } else {
      // Reset feedback after showing error so user can try again
      setTimeout(() => {
        setShowFeedback(false);
        setSelectedAnswer(null);
      }, 800);
    }
  };

  return (
    <div className="pattern-challenge">
      <div className="challenge-question">{question}</div>

      <div className="pattern-options">
        {options.map((option, index) => (
          <button
            key={index}
            className={`pattern-option ${
              selectedAnswer === option
                ? isCorrect
                  ? 'correct'
                  : 'incorrect'
                : ''
            }`}
            onClick={() => handleSelect(option)}
            disabled={isCorrect}
          >
            {option}
          </button>
        ))}
      </div>

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
              <span className="feedback-text">Try another option</span>
            </>
          )}
        </div>
      )}
    </div>
  );
}
