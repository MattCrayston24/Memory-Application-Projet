// /src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Importer les composants nécessaires
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';

// Tes autres composants de page (exemple : Accueil, Catégories, etc.)
import Home from './pages/Home';
import Categories from './pages/Categories';
import Settings from './pages/Settings';
import ThemesPage from './pages/ThemesPage';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/themespage" element={<ThemesPage/>} /> 
      </Routes>
    </Router>
  );
}

export default App;
