# Dog Breed Viewer

A single-page application built with React, TypeScript, Nest.js + SQLite, Vitest and more.

## Overview
- Browse dog breeds with search and virtualization.
- View 3 random images per breed with lazy load/animations.
- Favorite images with full-stack persistence (Nest.js + SQLite).
- Secure auth with login/logout.

**Test User Credentials:**
- Username: `emilys`
- Password: `emilyspass`
- *Note: You can use any username & password combination from [dummyjson.com/users](https://dummyjson.com/users)*

## Architectural Decisions
- **React + Vite + TypeScript**: Fast dev, type safety.
- **Zustand**: Lightweight state management.
- **TanStack Query**: Server state with caching/offline.
- **Nest.js + TypeORM**: Scalable backend with SQLite.
- **Tailwind + MUI**: Rapid styling with customized components.
- **Testing**: Vitest for full coverage.

## Setup Instructions

### Prerequisites
- Node.js installed on your system
- npm package manager

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the backend server:
   ```bash
   npm run start:dev
   ```
   The backend will run on [http://localhost:3001](http://localhost:3001)

4. **To stop the backend server:** Press `Ctrl + C` in the terminal

### Frontend Setup
1. Ensure you are in the root project folder

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the frontend development server:
   ```bash
   npm run dev
   ```
   The frontend will run on [http://localhost:5173](http://localhost:5173)

4. **To stop the frontend server:** Press `Ctrl + C` in the terminal

### Running Both Servers Simultaneously
For development, you'll need both servers running:
- Open two separate terminal windows/tabs
- Run the backend in one terminal
- Run the frontend in another terminal
- Access the application at [http://localhost:5173](http://localhost:5173)

## Running Tests

### Unit Tests
```bash
npm test
```

### Vitest UI (Interactive Test Runner)
```bash
npx vitest --ui
```
The Vitest UI will open in your browser for interactive testing.

**To stop the Vitest UI:** Press `Ctrl + C` in the terminal where Vitest is running, or type `q` and press Enter in the terminal.

## Deployment

### Frontend
- **Platform**: Vercel
- **Command**: `vercel --prod`
- **Configuration**: Set environment variables for API URL

### Backend
- **Platform**: Render
- **Configuration**: SQLite persists, enable HTTPS
- **Setup**: Follow Render deployment documentation

## Performance Metrics
- Lighthouse: [] 
- Bundle Size: [] (From build analysis)

## Submission
- GitHub repo link or zip file.