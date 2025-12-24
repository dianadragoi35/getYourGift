📱 App Description: “Reach 13,000”
Goal

Create a small, mobile-friendly web game that lets the user unlock a digital gift by reaching exactly 13,000 points.
The meaning of the number must NOT be revealed until the final screen.

Core Concept

The user starts at 0 / 13,000

They must complete small challenges to gain points

Each completed challenge increases the total

Once the total reaches exactly 13,000, the gift is revealed (pdf gift card - skydiving)

Only at the very end is the significance of the number explained

Game Rules

The total score is displayed at all times (e.g. 7,450 / 13,000)

Challenges are presented one at a time

Each challenge can only be completed once

The game should always reach exactly 13,000 (no overshooting)

Challenge Types
1. Pattern / Logic Challenge

Simple number or shape patterns

Multiple-choice or short input

Easy to medium difficulty

Correct answer → fixed point reward

Example

Question: 2, 4, 8, 16, ?
Options: 24, 32, 34
Correct: 32
Reward: +1,300

2. Easy Riddle Challenge

Very accessible riddles

One-word answers

No trick questions

Example

Riddle: I go up but never come down. What am I?
Answer: age
Reward: +1,500

3. Risk Button 😈

A special challenge type that introduces randomness and excitement.

Behavior

Button text: “Take a risk?”

When clicked:

Randomly award points between +500 and +2,500

Show the awarded number with a short animation

Can only be used a limited number of times (e.g. 1–2)

Important

The game logic must ensure that the final score can still reach exactly 13,000

Risk button should be disabled if it could cause overshooting

Progression Logic

Challenges are pre-defined with specific point values

Risk button uses random values but must be constrained

Final challenge awards the exact remaining points needed to reach 13,000

UI / UX Guidelines

Minimal, clean design

No skydiving references until the end

Calm, slightly mysterious tone

No timers, no pressure

Mobile-first layout

Subtle transitions (fade, slide)

Final Reveal Screen

Once the score reaches 13,000 / 13,000:

Display the following sequence (with short delays):

“You reached 13,000.”

“Meters.”

“That’s the altitude of your jump.”

Reveal the skydiving gift card (code / image / link)

Optional personal message

This should be the first and only time the meaning of the number is revealed.

Technical Requirements

Single-page web app (will be use don mobile)

React or Next.js

No backend required

State stored in memory (or localStorage optional)

Deterministic logic (same challenges every time)

Randomness only for the risk button

Non-Goals

No drag & drop

No animations requiring canvas or WebGL

No login or persistence across devices

Deliverables

Fully functional interactive game

Clean, readable code

Easy way to change:

Challenge text

Point values

Final message

Notes for Implementation

The meaning of 13,000 must remain hidden until the final screen

Avoid words like “height”, “altitude”, “sky”, “jump”, “fly” before the reveal

The experience should feel like a mysterious challenge, not a puzzle app