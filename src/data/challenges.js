// Challenge Definitions
// This file contains all the challenges for the game
// Edit these to customize challenge questions, answers, and point values

export const challenges = [
  // Pattern Challenge 1
  {
    id: 'pattern-1',
    type: 'pattern',
    question: 'Complete the sequence: 2, 4, 8, 16, ?',
    options: ['24', '32', '34'],
    correctAnswer: '32',
    points: 1300,
    order: 1
  },

  // Riddle Challenge 1
  {
    id: 'riddle-1',
    type: 'riddle',
    question: 'I go up but never come down. What am I?',
    correctAnswer: 'age',
    hint: 'Think about something that increases with time and can never decrease.',
    points: 1500,
    order: 2
  },

  // Risk Button Challenge
  {
    id: 'risk-1',
    type: 'risk',
    question: 'Take a risk?',
    minPoints: 500,
    maxPoints: 2500,
    order: 3
  },

  // Pattern Challenge 2
  {
    id: 'pattern-2',
    type: 'pattern',
    question: 'What comes next: A, C, E, G, ?',
    options: ['H', 'I', 'J'],
    correctAnswer: 'I',
    points: 1800,
    order: 4
  },

  // Riddle Challenge 2
  {
    id: 'riddle-2',
    type: 'riddle',
    question: 'What has keys but no locks, space but no room, and you can enter but not go inside?',
    correctAnswer: 'keyboard',
    hint: 'This is a device you use to type on your computer.',
    points: 1200,
    order: 5
  },

  // Pattern Challenge 3
  {
    id: 'pattern-3',
    type: 'pattern',
    question: 'Which number completes the pattern: 1, 1, 2, 3, 5, 8, ?',
    options: ['11', '13', '15'],
    correctAnswer: '13',
    points: 1600,
    order: 6
  },

  // Riddle Challenge 3
  {
    id: 'riddle-3',
    type: 'riddle',
    question: 'The more you take, the more you leave behind. What am I?',
    correctAnswer: 'steps',
    hint: 'Think about walking or moving forward.',
    points: 1400,
    order: 7
  },

  // Teaser screen before final challenge
  {
    id: 'final-teaser',
    type: 'final-teaser',
    question: 'Ready to complete your journey?',
    points: 0, // No points, just transitions to final question
    order: 8
  },

  // Final Challenge (dynamic points - awards exact remaining points)
  {
    id: 'final',
    type: 'pattern',
    question: 'Why did the astronaut break up with his girlfriend before going to space?',
    options: [
      'He wanted to see other planets',
      'She was a black hole',
      'He needed more space 🚀',
      'He lost gravity in the relationship'
    ],
    correctAnswer: 'He needed more space 🚀',
    points: 0, // This will be calculated dynamically
    order: 9
  }
];

// Total fixed points: 1300 + 1500 + 1800 + 1200 + 1600 + 1400 = 8800
// After risk (500-2500): 9300 - 11300
// Final challenge fills the gap: 1700 - 3700
// Result: Always exactly 13000
