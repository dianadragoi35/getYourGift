# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

"Reach 13,000" is a mobile-friendly web game where users unlock a digital gift (skydiving gift card) by reaching exactly 13,000 points through completing challenges. The number's significance (13,000 meters - altitude of the skydiving jump) must remain hidden until the final reveal screen.

## Core Game Mechanics

**Critical Constraints:**
- Score must reach EXACTLY 13,000 (no overshooting allowed)
- Challenge point values are deterministic (same challenges every time)
- Only the "Risk Button" uses randomness, but must be constrained to prevent overshooting
- Final challenge always awards the exact remaining points needed

**Challenge Types:**
1. Pattern/Logic Challenge - Multiple choice, fixed point rewards
2. Easy Riddle Challenge - One-word answers, fixed point rewards
3. Risk Button - Random points between +500 and +2,500, limited uses (1-2 times)

**Hidden Theme Rule:**
Avoid words like "height", "altitude", "sky", "jump", "fly" in UI/copy before the final reveal screen. The experience should feel mysterious, not aviation-themed.

## Tech Stack

- React or Next.js
- Single-page web app, mobile-first
- No backend required
- State management: in-memory or localStorage (optional)

## Build Commands

Once the project is initialized, common commands will typically be:

**Next.js:**
```bash
npm run dev          # Development server
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Lint code
```

**React (Create React App):**
```bash
npm start            # Development server
npm run build        # Production build
npm test             # Run tests
```

## Code Organization

Structure the codebase to allow easy modification of:
- Challenge text and questions
- Point values for each challenge
- Final reveal message content
- Risk button constraints (min/max points, usage limit)

Keep challenge definitions in a separate data file or constants module for easy editing without touching game logic.

## Final Reveal Sequence

Display with short delays between each line:
1. "You reached 13,000."
2. "Meters."
3. "That's the altitude of your jump."
4. Show skydiving gift card
5. Optional personal message

This is the ONLY place where the meaning of 13,000 should be revealed.
