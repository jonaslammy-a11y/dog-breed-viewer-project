# Dog Breed Viewer

A single-page application built with React, TypeScript, Nest.js + SQLite, Jest/Cypress and more.

## Overview
- Browse dog breeds with search and virtualization.
- View 3 random images per breed with lazy load/animations.
- Favorite images with full-stack persistence (Nest.js + SQLite).
- Secure auth with login/logout. 
    Test User : 
     Username : emilys
     Password : emilyspass
     (Any username & password combination from*      https://dummyjson.com/users )


## Architectural Decisions
- **React + Vite + TypeScript**: Fast dev, type safety.
- **Zustand**: Lightweight state management.
- **TanStack Query**: Server state with caching/offline.
- **Nest.js + TypeORM**: Scalable backend with SQLite.
- **Tailwind + MUI**: Rapid styling with customized components.
- **Testing**: Vitest for full coverage.

## Setup 
### Frontend
- Ensure you are on root folder
- `npm i`
- `npm run dev`[](http://localhost:5173)

### Backend
- `cd backend`
- `npm i`
- `npm run start`[](http://localhost:3001)


## Running Tests
- `npm test` (Vitest)
- `npx vitest --ui` (Vitest ui)

## Deployment
- **Frontend**: Vercel (env vars for API URL), `vercel --prod`.
- **Backend**: Render (SQLite persists, enable HTTPS), follow Render docs.

## Performance Metrics
- Lighthouse: [] 
- Bundle Size: [] (From build analyze).

## Submission
- GitHub repo link or zip file.
