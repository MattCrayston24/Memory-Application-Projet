import { useState, useEffect } from 'react';
import Themes from '../components/Themes';
import './categories.css';

export interface Card {  // Changement ici, on redéfinit 'Card' pour être utilisé de manière cohérente dans toute l'app
  id: number;
  question: string;
  answer: string;
  interval: number;  // Intervalle de répétition
  nextReviewTime: number;  // Horodatage pour le moment suivant où la carte doit être révisée
}

export interface ThemeData {
  id: number;
  name: string;
  description: string;
  cards: Card[];  // Utilisation de Card ici, pour correspondre avec le type attendu dans Themes
}

export interface CategoryData {
  id: number;
  name: string;
  description: string;
  themes: ThemeData[];  // Ajout de ThemeData pour la cohérence avec l'utilisation dans Categories
}

const initialCategories: CategoryData[] = [
  {
    id: 1,
    name: 'Langues',
    description: 'Catégorie pour les langues.',
    themes: [
      {
        id: 1,
        name: 'Anglais',
        description: 'Thème anglais',
        cards: [
          { id: 1, question: 'How do you say "chat" in English?', answer: 'cat', interval: 1, nextReviewTime: Date.now() + 60000 },
        ],
      },
    ],
  },
];

const Categories = () => {
  const [categories, setCategories] = useState<CategoryData[]>(() => {
    const saved = localStorage.getItem('categoriesData');
    return saved ? JSON.parse(saved) : initialCategories;
  });

  useEffect(() => {
    localStorage.setItem('categoriesData', JSON.stringify(categories));
  }, [categories]);

  const handleAddCategory = () => {
    const name = prompt('Nom de la nouvelle catégorie:');
    if (!name) return;
    const description = prompt('Description de la catégorie:') || '';
    const newCategory: CategoryData = {
      id: Date.now(),
      name,
      description,
      themes: [],
    };
    setCategories(prev => [...prev, newCategory]);
  };

  const handleEditCategory = (id: number) => {
    const name = prompt('Nouveau nom:');
    const description = prompt('Nouvelle description:');
    setCategories(prev =>
      prev.map(cat =>
        cat.id === id ? { ...cat, name: name || cat.name, description: description || cat.description } : cat
      )
    );
  };

  const handleDeleteCategory = (id: number) => {
    setCategories(prev => prev.filter(cat => cat.id !== id));
  };

  const handleAddTheme = (categoryId: number) => {
    const name = prompt('Nom du nouveau thème:');
    if (!name) return;
    const description = prompt('Description du thème:') || '';
    const newTheme: ThemeData = {
      id: Date.now(),
      name,
      description,
      cards: [],
    };
    setCategories(prev =>
      prev.map(cat =>
        cat.id === categoryId ? { ...cat, themes: [...cat.themes, newTheme] } : cat
      )
    );
  };

  const handleAddFlashcard = (categoryId: number, themeId: number) => {
    const question = prompt('Question de la carte:');
    if (!question) return;
    const answer = prompt('Réponse de la carte:');
    if (!answer) return;
    const newCard: Card = {
      id: Date.now(),
      question,
      answer,
      interval: 1,
      nextReviewTime: Date.now(),  // Définir un délai initial de révision
    };
    setCategories(prev =>
      prev.map(cat =>
        cat.id === categoryId
          ? {
              ...cat,
              themes: cat.themes.map(theme =>
                theme.id === themeId ? { ...theme, cards: [...theme.cards, newCard] } : theme
              ),
            }
          : cat
      )
    );
  };

  return (
    <div className="page-categories">
      <h1>Catégories</h1>
      <button className="btn-add-category" onClick={handleAddCategory}>
        Ajouter une catégorie
      </button>
      <div className="categories-list">
        {categories.map(cat => (
          <div key={cat.id} className="category-item">
            <div className="category-header">
              <h2>{cat.name}</h2>
              <div className="category-buttons">
                <button onClick={() => handleEditCategory(cat.id)}>Éditer</button>
                <button onClick={() => handleDeleteCategory(cat.id)}>Supprimer</button>
              </div>
            </div>
            <p>{cat.description}</p>
            <button className="btn-add-theme" onClick={() => handleAddTheme(cat.id)}>
              Ajouter un thème
            </button>
            <Themes
              themes={cat.themes}
              onUpdateThemes={(newThemes) =>
                setCategories(prev =>
                  prev.map(c => (c.id === cat.id ? { ...c, themes: newThemes } : c))
                )
              }
              onAddFlashcard={(themeId) => handleAddFlashcard(cat.id, themeId)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
