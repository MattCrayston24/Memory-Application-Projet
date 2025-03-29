import { useState, useEffect } from 'react';
import PublishTheme from '../components/PublishTheme';
import ImportThemes from '../components/ImportThemes';
import { fetchThemes } from '../api/api';
import './themespage.css';

interface Theme {
  id: string;
  name: string;
  description: string;
  cards: any[];
}

const ThemesPage = () => {
  const [themes, setThemes] = useState<Theme[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Charger les thèmes depuis l'API au moment où le composant se charge

  useEffect(() => {
    const loadThemes = async () => {
      setLoading(true);
      try {
        const fetchedThemes = await fetchThemes();
        setThemes(fetchedThemes);
        setError(null);
      } catch (error) {
        setError("Erreur lors de la récupération des thèmes");
        console.error("Erreur lors de la récupération des thèmes", error);
      } finally {
        setLoading(false);
      }
    };

    loadThemes();
  }, []);

  // Mettre à jour la liste des thèmes après publication d'un nouveau thème

  const handleThemePublished = () => {
    const loadThemes = async () => {
      setLoading(true);
      try {
        const fetchedThemes = await fetchThemes();
        setThemes(fetchedThemes);
        setError(null);
      } catch (error) {
        setError("Erreur lors de la récupération des thèmes");
        console.error("Erreur lors de la récupération des thèmes", error);
      } finally {
        setLoading(false);
      }
    };

    loadThemes();
  };

  return (
    <div className="themes-page">
      <h1>🎨 Gestion des Thèmes</h1>

      <section className="publish-import-section">
        <PublishTheme onThemePublished={handleThemePublished} />
        <ImportThemes />
      </section>

      {loading && <p className="loading-message">Chargement des thèmes...</p>}
      {error && <p className="error-message">{error}</p>}
      
      <h2>📚 Thèmes publiés</h2>
      {themes.length === 0 ? (
        <p>Aucun thème publié.</p>
      ) : (
        <ul className="themes-list">
          {themes.map((theme) => (
            <li key={theme.id} className="theme-item">
              <h3>{theme.name}</h3>
              <p>{theme.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ThemesPage;
