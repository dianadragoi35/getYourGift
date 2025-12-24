import { useGameState } from './hooks/useGameState.js';
import { GAME_CONFIG } from './data/config.js';
import { ScoreDisplay } from './components/ScoreDisplay.jsx';
import { ProgressBar } from './components/ProgressBar.jsx';
import { ChallengeCard } from './components/ChallengeCard.jsx';
import { FinalReveal } from './components/FinalReveal.jsx';
import './App.css';

function App() {
  const {
    currentScore,
    isGameComplete,
    riskButtonUsesRemaining,
    completeChallenge,
    useRiskButton,
    getCurrentChallenge,
    getRemainingChallenges,
    resetGame,
  } = useGameState();

  const currentChallenge = getCurrentChallenge();
  const remainingChallenges = getRemainingChallenges();

  // Show final reveal when game is complete
  if (isGameComplete) {
    return <FinalReveal onReset={resetGame} />;
  }

  // Handle challenge completion
  const handleChallengeComplete = (points) => {
    completeChallenge(currentChallenge.id, points);
  };

  return (
    <div className="app">
      <div className="container">
        <header className="app-header">
          <h1 className="app-title">Reach 13,000</h1>
          <p className="app-subtitle">Complete challenges to unlock your reward</p>
        </header>

        <ScoreDisplay
          currentScore={currentScore}
          targetScore={GAME_CONFIG.TARGET_SCORE}
        />

        <ProgressBar
          currentScore={currentScore}
          targetScore={GAME_CONFIG.TARGET_SCORE}
        />

        {currentChallenge ? (
          <ChallengeCard
            challenge={currentChallenge}
            currentScore={currentScore}
            remainingChallenges={remainingChallenges}
            riskButtonUsesRemaining={riskButtonUsesRemaining}
            onComplete={handleChallengeComplete}
            onUseRisk={useRiskButton}
          />
        ) : (
          <div className="no-challenges">
            <p>No more challenges available.</p>
          </div>
        )}

        <footer className="app-footer">
          <button className="reset-link" onClick={resetGame}>
            Start Over
          </button>
        </footer>
      </div>
    </div>
  );
}

export default App;
