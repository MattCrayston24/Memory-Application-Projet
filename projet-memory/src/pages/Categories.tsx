// /src/pages/Categories.tsx
import { useState, useEffect } from 'react';
import './Categories.css';

interface Category {
  id: number;
  name: string;
  description: string;
  lastReviewed: string | null;
  interval: number; // en minutes
  question: string;
  answer: string;
}

const initialCategories: Category[] = [
  {
    id: 1,
    name: 'Anglais',
    description: 'Révisez vos connaissances en anglais.',
    lastReviewed: null,
    interval: 1,
    question: 'How do you say "chat" in English?',
    answer: 'cat'
  },
  {
    id: 2,
    name: 'Français',
    description: 'Explorez la langue française.',
    lastReviewed: null,
    interval: 1,
    question: 'Quel est le synonyme de "rapide"?',
    answer: 'vite'
  },
  {
    id: 3,
    name: 'Mathématiques',
    description: 'Testez vos compétences en mathématiques.',
    lastReviewed: null,
    interval: 1,
    question: 'Combien font 2 + 2 ?',
    answer: '4'
  },
];

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>(() => {
    const savedData = localStorage.getItem('categories');
    if (savedData) {
      try {
        const parsedData: any[] = JSON.parse(savedData);
        // Vérifie que chaque catégorie possède bien la propriété 'answer'
        if (parsedData.every(category => typeof category.answer === 'string')) {
          return parsedData.map(category => ({
            ...category,
            lastReviewed: category.lastReviewed ? new Date(category.lastReviewed).toISOString() : null
          }));
        }
      } catch (error) {
        console.error('Erreur lors du parsing des données de localStorage :', error);
      }
    }
    return initialCategories;
  });

  const [flipped, setFlipped] = useState<number | null>(null);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    console.log('🔹 Sauvegarde des catégories :', categories);
    localStorage.setItem('categories', JSON.stringify(categories));
  }, [categories]);

  const handleReview = (id: number) => {
    const userAnswer = answers[id] ? answers[id].trim().toLowerCase() : '';
    const category = categories.find(c => c.id === id);
    if (!category) {
      console.error(`Aucune catégorie trouvée pour l'ID ${id}`);
      return;
    }
    // Si category.answer n'existe pas, on prend une chaîne vide
    const correctAnswer = category.answer ? category.answer.toLowerCase() : '';
    
    console.log(`Réponse utilisateur: "${userAnswer}", Réponse correcte: "${correctAnswer}"`);

    if (userAnswer && userAnswer === correctAnswer) {
      setCategories(prevCategories =>
        prevCategories.map(cat => {
          if (cat.id === id) {
            const now = new Date().toISOString();
            return { ...cat, lastReviewed: now, interval: cat.interval * 2 };
          }
          return cat;
        })
      );
      setFlipped(null);
      setAnswers(prev => ({ ...prev, [id]: '' }));
    } else {
      alert('❌ Mauvaise réponse ! Essayez encore.');
    }
  };

  const now = new Date();
  const categoriesToReview = categories.filter(category => {
    if (!category.lastReviewed) return true;
    
    const lastReviewedDate = new Date(category.lastReviewed);
    const nextReviewDate = new Date(lastReviewedDate);
    nextReviewDate.setMinutes(nextReviewDate.getMinutes() + category.interval);

    return nextReviewDate <= now;
  });

  return (
    <div className="page-categories">
      <h1>Catégories de révision</h1>
      <div className="categories-container">
        {categoriesToReview.length > 0 ? (
          categoriesToReview.map(category => (
            <div 
              className={`category-card ${flipped === category.id ? 'flipped' : ''}`} 
              key={category.id}
              onClick={(e) => {
                if (!(e.target as HTMLElement).closest('input, button')) {
                  setFlipped(flipped === category.id ? null : category.id);
                }
              }}
            >
              {flipped === category.id ? (
                <div className="card-back">
                  <p><strong>Question :</strong> {category.question}</p>
                  <input
                    type="text"
                    value={answers[category.id] || ''}
                    onChange={(e) => setAnswers({ ...answers, [category.id]: e.target.value })} 
                    placeholder="Votre réponse"
                    onClick={(e) => e.stopPropagation()}
                  />
                  <button onClick={(e) => { e.stopPropagation(); handleReview(category.id); }}>Valider</button>
                </div>
              ) : (
                <div className="card-front">
                  <h2>{category.name}</h2>
                  <p>{category.description}</p>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>✅ Toutes les révisions sont à jour.</p>
        )}
      </div>
    </div>
  );
}

export default Categories;
