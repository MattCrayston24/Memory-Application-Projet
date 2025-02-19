import { useState } from 'react';
import Cards, { Card } from './Cards';
import './themes.css';

export interface Theme {
  id: number;
  name: string;
  description: string;
  cards: Card[];
}

interface ThemesProps {
  themes: Theme[];
  onUpdateThemes: (themes: Theme[]) => void;
  onAddFlashcard: (themeId: number) => void; // Ajout de la fonction d'ajout de carte
}

const Themes = ({ themes, onUpdateThemes, onAddFlashcard }: ThemesProps) => {
  const [editingThemeId, setEditingThemeId] = useState<number | null>(null);
  const [editedThemeName, setEditedThemeName] = useState('');
  const [editedThemeDescription, setEditedThemeDescription] = useState('');

  const handleThemeDelete = (id: number) => {
    const newThemes = themes.filter(theme => theme.id !== id);
    onUpdateThemes(newThemes);
  };

  const handleThemeEdit = (themeId: number) => {
    const theme = themes.find(t => t.id === themeId);
    if (!theme) return;
    setEditingThemeId(themeId);
    setEditedThemeName(theme.name);
    setEditedThemeDescription(theme.description);
  };

  const handleThemeSave = (id: number) => {
    const newThemes = themes.map(theme => {
      if (theme.id === id) {
        return { ...theme, name: editedThemeName, description: editedThemeDescription };
      }
      return theme;
    });
    onUpdateThemes(newThemes);
    setEditingThemeId(null);
  };

  const handleUpdateCards = (themeId: number, newCards: Card[]) => {
    const newThemes = themes.map(theme => {
      if (theme.id === themeId) {
        return { ...theme, cards: newCards };
      }
      return theme;
    });
    onUpdateThemes(newThemes);
  };

  return (
    <div className="themes-container">
      {themes.map(theme => (
        <div key={theme.id} className="theme">
          {editingThemeId === theme.id ? (
            <div className="theme-edit">
              <input
                type="text"
                value={editedThemeName}
                onChange={(e) => setEditedThemeName(e.target.value)}
                placeholder="Nom du thème"
              />
              <input
                type="text"
                value={editedThemeDescription}
                onChange={(e) => setEditedThemeDescription(e.target.value)}
                placeholder="Description du thème"
              />
              <button onClick={() => handleThemeSave(theme.id)}>Enregistrer</button>
            </div>
          ) : (
            <div className="theme-header">
              <h2>{theme.name}</h2>
              <p>{theme.description}</p>
              <button onClick={() => handleThemeEdit(theme.id)}>Éditer</button>
              <button onClick={() => handleThemeDelete(theme.id)}>Supprimer</button>
              <button onClick={() => onAddFlashcard(theme.id)}>Ajouter une carte</button> 
              {/* Utilisation de onAddFlashcard pour l'ajout des cartes */}
            </div>
          )}
          <Cards cards={theme.cards} onUpdateCards={(newCards) => handleUpdateCards(theme.id, newCards)} />
        </div>
      ))}
    </div>
  );
};

export default Themes;
