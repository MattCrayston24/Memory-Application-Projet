// /src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Importer les composants nécessaires
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';

// Tes autres composants de page (exemple : Accueil, Catégories, etc.)
import Home from './pages/Home';
import Categories from './pages/Categories';
import Settings from './pages/Settings';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
}

export default App;
