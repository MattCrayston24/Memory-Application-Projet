import { useState, useEffect } from 'react';
import PublishTheme from '../components/PublishTheme'; // Formulaire pour publier un thème
import ImportThemes from '../components/ImportThemes'; // Liste des thèmes à importer
import { fetchThemes } from '../api/api'; // Appel à l'API pour récupérer les thèmes

interface Theme {
  id: string;
  name: string;
  description: string;
  cards: any[];
}

const ThemesPage = () => {
  const [themes, setThemes] = useState<Theme[]>([]); // Liste des thèmes publiés
  const [loading, setLoading] = useState<boolean>(false); // État de chargement
  const [error, setError] = useState<string | null>(null); // État pour les erreurs

  // Charger les thèmes depuis l'API
  useEffect(() => {
    const loadThemes = async () => {
      setLoading(true); // Démarre le chargement
      try {
        const fetchedThemes = await fetchThemes();
        setThemes(fetchedThemes);
        setError(null); // Réinitialise l'erreur
      } catch (error) {
        setError("Erreur lors de la récupération des thèmes");
        console.error("Erreur lors de la récupération des thèmes", error);
      } finally {
        setLoading(false); // Arrête le chargement
      }
    };

    loadThemes();
  }, []);

  // Fonction pour mettre à jour la liste des thèmes après publication
  const handleThemePublished = () => {
    // Rafraîchir la liste des thèmes après publication
    const loadThemes = async () => {
      setLoading(true); // Démarre le chargement
      try {
        const fetchedThemes = await fetchThemes();
        setThemes(fetchedThemes);
        setError(null); // Réinitialise l'erreur
      } catch (error) {
        setError("Erreur lors de la récupération des thèmes");
        console.error("Erreur lors de la récupération des thèmes", error);
      } finally {
        setLoading(false); // Arrête le chargement
      }
    };

    loadThemes();
  };

  return (
    <div className="themes-page">
      <h1>Gestion des Thèmes</h1>

      <PublishTheme onThemePublished={handleThemePublished} /> {/* Formulaire de publication */}
      <ImportThemes /> {/* Liste des thèmes à importer */}

      {loading && <p>Chargement des thèmes...</p>} {/* Affiche le message de chargement */}
      {error && <p>{error}</p>} {/* Affiche l'erreur s'il y en a */}
      
      <h2>Thèmes publiés</h2>
      {themes.length === 0 ? (
        <p>Aucun thème publié.</p>
      ) : (
        <ul>
          {themes.map((theme) => (
            <li key={theme.id}>
              <h3>{theme.name}</h3>
              <p>{theme.description}</p>
              {/* Ajoute ici une logique d'affichage des cartes ou autres actions */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ThemesPage;
