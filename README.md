# Dog Breed Viewer

A sophisticated full-stack application featuring a hybrid architecture with REST API for dog breed data and GraphQL for favorites management, built with React, TypeScript, Nest.js + SQLite, and modern web technologies.

## Overview
- Browse dog breeds with search and optimized rendering
- View random images per breed with lazy loading and smooth animations
- **GraphQL-powered favorites** with full-stack persistence (Nest.js + SQLite)
- **Mixed API Architecture**: REST for dog.ceo API + GraphQL for custom backend
- Secure authentication with JWT token validation
- Responsive design with Material-UI and Tailwind CSS

**Test User Credentials:**
- Username: `emilys`
- Password: `emilyspass`
- *Note: You can use any username & password combination from [dummyjson.com/users](https://dummyjson.com/users)*

## ?? Tech Stack Highlights

### Frontend
- **React 18** + **Vite** + **TypeScript** - Modern development with type safety
- **Apollo Client** - GraphQL state management for favorites
- **TanStack Query** - Advanced server state management with caching/offline support
- **Zustand** - Lightweight client state management
- **Material-UI (MUI)** + **Tailwind CSS** - Hybrid styling approach
- **Framer Motion** - Smooth animations and interactions
- **React Router** - Client-side routing with protected routes

### Backend
- **Nest.js** - Enterprise-grade Node.js framework
- **GraphQL** - Modern API for favorites operations (queries/mutations)
- **TypeORM** + **SQLite** - Database layer with type safety
- **Apollo Server** - GraphQL server implementation
- **JWT Authentication** - Token-based security with dummyjson validation
- **Rate Limiting** - Protected endpoints with throttling

### Development & Testing
- **Vitest** - Blazing fast unit testing
- **Testing Library** - Component testing utilities
- **ESLint** + **TypeScript** - Code quality and type checking

## ??? Architectural Decisions

### Hybrid API Strategy
- **REST API** (dog.ceo) - For breed listing and image fetching
- **GraphQL API** (Custom) - For favorites management with optimized queries
- **Mixed Client Setup** - Apollo Client for GraphQL + Axios for REST

### Authentication Flow
- **Frontend**: JWT tokens from dummyjson.com with Zustand persistence
- **Backend**: Token validation against dummyjson API with custom guards
- **Protected Routes**: GraphQL operations require valid authentication

### State Management
- **TanStack Query**: Server state (breeds, images) with intelligent caching
- **Apollo Client**: GraphQL state (favorites) with reactive updates
- **Zustand**: Client state (UI, auth) with persistence

## ?? Setup Instructions

### Prerequisites
- Node.js 18+ installed on your system
- npm or yarn package manager

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
   The backend will run on [http://localhost:3001](http://localhost:3001) with GraphQL playground available

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

## ?? Testing

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

## ?? Deployment

### Frontend
- **Platform**: Vercel
- **Command**: `vercel --prod`
- **Configuration**: Set environment variables for API URL

### Backend
- **Platform**: Render
- **Configuration**: SQLite persists, enable HTTPS
- **Setup**: Follow Render deployment documentation

## ?? API Endpoints

### REST Endpoints (dog.ceo)
- `GET /breeds/list/all` - Fetch all dog breeds
- `GET /breed/{breed}/images/random/{count}` - Fetch random breed images

### GraphQL Endpoints (Custom Backend)
- `Query favoritesUrls` - Get user's favorite images
- `Mutation addFavorite` - Add image to favorites
- `Mutation removeFavorite` - Remove image from favorites

## ?? Authentication Flow
1. User logs in with dummyjson credentials
2. Frontend stores JWT token in Zustand persistence
3. Apollo Client automatically attaches token to GraphQL requests
4. Backend validates token with dummyjson API on each protected operation
5. Protected routes and features require valid authentication

## ?? Performance Features
- Image lazy loading with optimized grid layout
- Debounced search with Lodash
- Query caching with TanStack Query (24h for breeds, 5min for images)
- Optimistic updates for favorites
- Virtualized breed list for large datasets

## ?? Performance Metrics
- Lighthouse: [] 
- Bundle Size: [] (From build analysis)

## ?? Submission
- GitHub repo link or zip file.