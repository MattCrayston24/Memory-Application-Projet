import { useState } from 'react';
import Cards from './Cards'; 
import './themes.css';

export interface Card {
  id: number;
  question: string;
  answer: string;
  interval: number;
  nextReviewTime: number;
}

export interface Theme {
  id: number;
  name: string;
  description: string;
  cards: Card[];
  backgroundImage?: string; 
}

interface ThemesProps {
  themes: Theme[];
  onUpdateThemes: (themes: Theme[]) => void;
  onAddFlashcard: (themeId: number) => void;
}

const DEFAULT_BACKGROUND = '/images/default-theme-bg.jpg'; 

const Themes = ({ themes, onUpdateThemes, onAddFlashcard }: ThemesProps) => {
  const [editingThemeId, setEditingThemeId] = useState<number | null>(null);
  const [editedThemeName, setEditedThemeName] = useState('');
  const [editedThemeDescription, setEditedThemeDescription] = useState('');
  const [backgroundSelectionInProgress, setBackgroundSelectionInProgress] = useState<{ [key: number]: boolean }>({});
  const [tempBackgroundImage, setTempBackgroundImage] = useState<{ [key: number]: string | null }>({});

  // Suppression d'un thème

  const handleThemeDelete = (id: number) => {
    const newThemes = themes.filter(theme => theme.id !== id);
    onUpdateThemes(newThemes);
  };

  // Édition d'un thème

  const handleThemeEdit = (themeId: number) => {
    const theme = themes.find(t => t.id === themeId);
    if (theme) {
      setEditingThemeId(themeId);
      setEditedThemeName(theme.name);
      setEditedThemeDescription(theme.description);
    }
  };

  // Enregistrement des modifications d'un thème

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

  // Mise à jour des cartes dans un thème

  const handleUpdateCards = (themeId: number, newCards: Card[]) => {
    const newThemes = themes.map(theme => {
      if (theme.id === themeId) {
        return { ...theme, cards: newCards };
      }
      return theme;
    });
    onUpdateThemes(newThemes);
  };

  // Personnalisation du fond du thème (via le bouton "Personnaliser")

  const handleBackgroundChange = (themeId: number, file: File) => {
    const reader = new FileReader();

    reader.onload = () => {
      const result = reader.result as string;
      setTempBackgroundImage(prev => ({
        ...prev,
        [themeId]: result
      }));

      setBackgroundSelectionInProgress(prev => ({ ...prev, [themeId]: false }));
    };

    reader.readAsDataURL(file);
  };

  // Réinitialiser le fond du thème

  const resetBackground = (themeId: number) => {
    setTempBackgroundImage(prev => {
      const updated = { ...prev };
      delete updated[themeId]; 
      return updated;
    });

    setBackgroundSelectionInProgress(prev => ({ ...prev, [themeId]: false }));
  };

  // Gérer l'action du bouton Personnaliser

  const handlePersonalizeClick = (themeId: number) => {
    if (!backgroundSelectionInProgress[themeId]) {
      setBackgroundSelectionInProgress(prev => ({ ...prev, [themeId]: true }));
    } else {
      resetBackground(themeId);
    }
  };

  return (
    <div className="themes-container">
      {themes.map(theme => (
        <div
          key={theme.id}
          className="theme"
          style={{
            backgroundImage: `url(${tempBackgroundImage[theme.id] || theme.backgroundImage || DEFAULT_BACKGROUND})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {editingThemeId === theme.id ? (
            <div className="theme-edit">
              <input
                className='typetxt'
                type="text"
                value={editedThemeName}
                onChange={(e) => setEditedThemeName(e.target.value)}
                placeholder="Nom du thème"
              />
              <input
                className='typetxt'
                type="text"
                value={editedThemeDescription}
                onChange={(e) => setEditedThemeDescription(e.target.value)}
                placeholder="Description du thème"
              />
              <button className="buttonvv" onClick={() => handleThemeSave(theme.id)}>Enregistrer</button>
            </div>
          ) : (
            <div className="theme-header">
              {/* Section Titre / Description */}
              <div className="theme-title-description">
                <h2>{theme.name}</h2>
                <p className="pp">{theme.description}</p>
              </div>

              {/* Section Boutons (Éditer / Supprimer / Personnaliser) */}
              <div className={`theme-buttons ${backgroundSelectionInProgress[theme.id] ? 'column' : ''}`}>
                {!backgroundSelectionInProgress[theme.id] && (
                  <>
                    <button className="buttonv" onClick={() => handleThemeEdit(theme.id)}>Éditer</button>
                    <button className="buttonv" onClick={() => handleThemeDelete(theme.id)}>Supprimer</button>
                  </>
                )}
                {backgroundSelectionInProgress[theme.id] ? (
                  <div className='themev2'>
                    <input
                      className="buttonchoose"
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        e.target.files && handleBackgroundChange(theme.id, e.target.files[0])
                      }
                    />
                    <button
                      className="buttonv"
                      onClick={() => handlePersonalizeClick(theme.id)} // Pour revenir
                    >
                      Retour
                    </button>
                  </div>
                ) : (
                  <button
                    className="buttonv"
                    onClick={() => handlePersonalizeClick(theme.id)} // Pour activer la personnalisation
                  >
                    Personnaliser
                  </button>
                )}
              </div>

              {/* Section Ajouter une carte */}
              <div className="theme-add-card">
                <button className="btn-add-theme" onClick={() => onAddFlashcard(theme.id)}>Ajouter une carte</button>
              </div>
            </div>
          )}
          <Cards
            cards={theme.cards}
            onUpdateCards={(newCards) => handleUpdateCards(theme.id, newCards)}
          />
        </div>
      ))}
    </div>
  );
};

export default Themes;
