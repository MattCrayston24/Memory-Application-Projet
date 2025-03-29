import { useState } from 'react';
import { publishTheme } from '../api/api'; 

interface PublishThemeProps {
  onThemePublished: () => void;
}

const PublishTheme = ({ onThemePublished }: PublishThemeProps) => {
  const [newThemeName, setNewThemeName] = useState('');
  const [newThemeDescription, setNewThemeDescription] = useState('');

  const handleThemeSubmit = async () => {
    if (newThemeName && newThemeDescription) {
      const newTheme = {
        name: newThemeName,
        description: newThemeDescription,
        cards: [], 
      };
      try {
        await publishTheme(newTheme); 
        onThemePublished(); 
        setNewThemeName('');
        setNewThemeDescription('');
      } catch (error) {
        console.error("Erreur lors de la publication du thème", error);
      }
    }
  };

  return (
    <div className="theme-form">
      <h3>Publier un nouveau thème</h3>
      <input
        type="text"
        value={newThemeName}
        onChange={(e) => setNewThemeName(e.target.value)}
        placeholder="Nom du thème"
      />
      <input
        type="text"
        value={newThemeDescription}
        onChange={(e) => setNewThemeDescription(e.target.value)}
        placeholder="Description du thème"
      />
      <button onClick={handleThemeSubmit}>Publier</button>
    </div>
  );
};

export default PublishTheme;
