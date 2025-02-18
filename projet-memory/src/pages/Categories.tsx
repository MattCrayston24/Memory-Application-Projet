// /src/pages/Categories.tsx
import { useState, useEffect } from 'react';
import Themes, { Theme } from '../components/Themes';
import './categories.css';

export interface CategoryData {
  id: number;
  name: string;
  description: string;
  themes: Theme[];
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
          { id: 1, question: 'How do you say "chat" in English?', answer: 'cat' },
        ],
      },
      {
        id: 2,
        name: 'Français',
        description: 'Thème français',
        cards: [
          { id: 2, question: 'Quel est le synonyme de "rapide"?', answer: 'vite' },
        ],
      },
    ],
  },
  {
    id: 2,
    name: 'Mathématiques',
    description: 'Catégorie pour les mathématiques.',
    themes: [
      {
        id: 3,
        name: 'Arithmétique',
        description: 'Thème arithmétique',
        cards: [
          { id: 3, question: 'Combien font 2 + 2 ?', answer: '4' },
        ],
      },
    ],
  },
];

const Categories = () => {
  const [categories, setCategories] = useState<CategoryData[]>(() => {
    const saved = localStorage.getItem('categoriesData');
    if (saved) {
      return JSON.parse(saved);
    }
    return initialCategories;
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

  const handleDeleteCategory = (id: number) => {
    setCategories(prev => prev.filter(cat => cat.id !== id));
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

  const updateThemes = (categoryId: number, newThemes: Theme[]) => {
    setCategories(prev =>
      prev.map(cat => (cat.id === categoryId ? { ...cat, themes: newThemes } : cat))
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
            <Themes themes={cat.themes} onUpdateThemes={(newThemes) => updateThemes(cat.id, newThemes)} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
