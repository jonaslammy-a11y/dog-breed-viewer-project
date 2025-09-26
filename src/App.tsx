import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import BreedViewer from './features/breeds/components/BreedViewer';
import FavoritesPage from './features/favorites/FavoritesPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<BreedViewer />} />
        <Route
          path="/favorites"
          element={
            <ProtectedRoute>
              <FavoritesPage />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;