import { useState } from 'react'
import './App.css'

// Test data - questions with messages
const questions = [
  {
    id: 1,
    text: 'Hi! Urgent: verify your account immediately at http://bit.ly/safe-bank. There was a login attempt from a new device. Use password: admin123',
    correct: true, // true = phishing (dangerous), false = legitimate
    explanation: 'This is phishing! Warning signs: urgent request to click link, asking for password, shortened URL used'
  },
  {
    id: 2,
    text: 'Dear Customer, due to scheduled server maintenance on April 15, the system will be unavailable from 02:00 to 04:00 UTC. Thank you for your understanding. Customer Support Team',
    correct: false, // this is a legitimate message
    explanation: 'Correct! This is legitimate: specific date, time, reason provided, official signature'
  },
  {
    id: 3,
    text: 'URGENT! You have won 1,000,000 dollars! Click here https://win-prize.com/?ref=123 to claim your prize',
    correct: true,
    explanation: 'Phishing! Too good to be true, suspicious link, sense of urgency used'
  }
]

function App() {
  // State - component memory that persists between renders
  const [currentIndex, setCurrentIndex] = useState(0) // which question to show
  const [showFeedback, setShowFeedback] = useState(false) // show result or not
  const [isCorrect, setIsCorrect] = useState(false) // correct answer or not
  const [score, setScore] = useState(0) // number of correct answers

  const current = questions[currentIndex]

  // Handle button click "Yes" or "No"
  const handleAnswer = (userGuess) => {
    // userGuess: true = answered "Yes, this is phishing"
    //           false = answered "No, this is legitimate"
    
    const correct = userGuess === current.correct
    setIsCorrect(correct)
    if (correct) {
      setScore(score + 1)
    }
    setShowFeedback(true)
  }

  // Move to next question
  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setShowFeedback(false)
    } else {
      // All questions are finished
      alert('Congratulations! You completed the quiz!')
      setCurrentIndex(0)
      setShowFeedback(false)
      setScore(0)
    }
  }

  return (
    <div className="app">
      <header className="header">
        <div className="header-top">
          <h1>🛡️ Phish or Legit</h1>
          <p>Test your security awareness skills</p>
        </div>
        <div className="header-stats">
          <span>Question {currentIndex + 1}/{questions.length}</span>
          <span>Score: {score}/{questions.length}</span>
        </div>
      </header>

      <main className="container">
        {/* If result is not shown - show question and buttons */}
        {!showFeedback && (
          <div className="card question-card">
            <div className="warning-icon">⚠️</div>
            <div className="card-title">Is this a phishing attempt?</div>
            <div className="question-text">{current.text}</div>
            <div className="buttons">
              <button className="btn btn-yes" onClick={() => handleAnswer(true)}>
                <span className="btn-icon">❌</span>
                <span className="btn-label">Phishing</span>
              </button>
              <button className="btn btn-no" onClick={() => handleAnswer(false)}>
                <span className="btn-icon">✓</span>
                <span className="btn-label">Legit</span>
              </button>
            </div>
          </div>
        )}

        {/* If result is shown - show feedback card */}
        {showFeedback && (
          <div className={`card feedback-card ${isCorrect ? 'correct' : 'incorrect'}`}>
            <div className="feedback-icon">
              {isCorrect ? '✓' : '✕'}
            </div>
            <div className={`feedback-title ${isCorrect ? 'success' : 'error'}`}>
              {isCorrect ? 'Correct!' : 'Not quite!'}
            </div>
            <div className="feedback-text">
              <div className="feedback-label">Explanation:</div>
              {current.explanation}
            </div>
            <button className="btn btn-next" onClick={handleNext}>
              {currentIndex === questions.length - 1 ? 'Restart Quiz' : 'Next Question'} →
            </button>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
