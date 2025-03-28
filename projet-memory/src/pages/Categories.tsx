import { useState, useEffect } from 'react';
import Themes from '../components/Themes';
import './categories.css';

export interface Card {
  id: number;
  question: string;
  answer: string;
  interval: number;
  nextReviewTime: number;
}

export interface ThemeData {
  id: number;
  name: string;
  description: string;
  cards: Card[];
}

export interface CategoryData {
  id: number;
  name: string;
  description: string;
  themes: ThemeData[];
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
          {
            id: 1,
            question: 'How do you say "chat" in English?',
            answer: 'cat',
            interval: 1,
            nextReviewTime: Date.now() + 60000,
          },
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

  // Sauvegarder automatiquement dans le localStorage lors d'un changement
  useEffect(() => {
    localStorage.setItem('categoriesData', JSON.stringify(categories));
    updateCardsToReview();
  }, [categories]);

  // Mettre à jour le localStorage pour les cartes à réviser
  const updateCardsToReview = () => {
    const allCards = categories.flatMap(category =>
      category.themes.flatMap(theme => theme.cards.map(card => ({
        id: card.id,
        category: category.name,
        nextReviewTime: card.nextReviewTime,
      })))
    );

    localStorage.setItem('cards', JSON.stringify(allCards));
  };

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
        cat.id === id
          ? { ...cat, name: name || cat.name, description: description || cat.description }
          : cat
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
      nextReviewTime: Date.now(),
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
