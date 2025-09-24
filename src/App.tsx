import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.tsx';
// Import pages later; for now, placeholders
import BreedViewer from './features/breeds/components/BreedViewer.tsx'; // Create empty for now
import FavoritesPage from './pages/FavoritesPage.tsx'; // Create empty for now

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<BreedViewer />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Route>
    </Routes>
  );
}

export default App;