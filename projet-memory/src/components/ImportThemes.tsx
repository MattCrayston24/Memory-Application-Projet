import { useEffect, useState } from 'react';
import { fetchThemes } from '../api/api'; // Appel API pour récupérer les thèmes

const ImportThemes = () => {
  const [themes, setThemes] = useState<any[]>([]); // Liste des thèmes à importer

  useEffect(() => {
    const loadThemes = async () => {
      try {
        const fetchedThemes = await fetchThemes();
        setThemes(fetchedThemes);
      } catch (error) {
        console.error("Erreur lors de la récupération des thèmes", error);
      }
    };

    loadThemes();
  }, []);

  return (
    <div>
      <h3>Importer un thème</h3>
      <ul>
        {themes.map((theme) => (
          <li key={theme.id}>
            <h4>{theme.name}</h4>
            <p>{theme.description}</p>
            <button>Importer</button> {/* Ajoute ici la logique d'importation */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ImportThemes;
