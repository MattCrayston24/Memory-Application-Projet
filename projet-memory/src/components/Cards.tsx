// /src/components/Cards.tsx
import { useState } from 'react';
import './Cards.css';

export interface Card {
  id: number;
  question: string;
  answer: string;
}

interface CardsProps {
  cards: Card[];
  onUpdateCards: (cards: Card[]) => void;
}

const Cards = ({ cards, onUpdateCards }: CardsProps) => {
  const [flipped, setFlipped] = useState<number | null>(null);
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>({});
  const [editingCardId, setEditingCardId] = useState<number | null>(null);
  const [editedQuestion, setEditedQuestion] = useState('');
  const [editedAnswer, setEditedAnswer] = useState('');

  const handleReview = (id: number) => {
    const userAnswer = userAnswers[id] ? userAnswers[id].trim().toLowerCase() : '';
    const card = cards.find(c => c.id === id);
    if (!card) return;
    const correctAnswer = card.answer.trim().toLowerCase();
    if (userAnswer === correctAnswer) {
      alert('✅ Bonne réponse !');
      setUserAnswers(prev => ({ ...prev, [id]: '' }));
    } else {
      alert('❌ Mauvaise réponse ! Essayez encore.');
    }
  };

  const handleDelete = (id: number) => {
    const newCards = cards.filter(card => card.id !== id);
    onUpdateCards(newCards);
  };

  const handleEdit = (card: Card) => {
    setEditingCardId(card.id);
    setEditedQuestion(card.question);
    setEditedAnswer(card.answer);
  };

  const handleSave = (id: number) => {
    const newCards = cards.map(card => {
      if (card.id === id) {
        return { ...card, question: editedQuestion, answer: editedAnswer };
      }
      return card;
    });
    onUpdateCards(newCards);
    setEditingCardId(null);
  };

  return (
    <div className="cards-container">
      {cards.map(card => (
        <div
          key={card.id}
          className={`card ${flipped === card.id ? 'flipped' : ''}`}
          onClick={(e) => {
            if (!(e.target as HTMLElement).closest('input, button')) {
              setFlipped(flipped === card.id ? null : card.id);
            }
          }}
        >
          <div className="card-inner">
            {editingCardId === card.id ? (
              <div className="card-edit">
                <input
                  type="text"
                  value={editedQuestion}
                  onChange={(e) => setEditedQuestion(e.target.value)}
                  placeholder="Question"
                />
                <input
                  type="text"
                  value={editedAnswer}
                  onChange={(e) => setEditedAnswer(e.target.value)}
                  placeholder="Réponse"
                />
                <button onClick={() => handleSave(card.id)}>Enregistrer</button>
              </div>
            ) : (
              <>
                <div className="card-front">
                  <p><strong>Révision Card</strong></p>
                  <p>Question : {card.question}</p>
                </div>
                <div className="card-back">
                  <p><strong>Question :</strong> {card.question}</p>
                  <input
                    type="text"
                    value={userAnswers[card.id] || ''}
                    onChange={(e) =>
                      setUserAnswers({ ...userAnswers, [card.id]: e.target.value })
                    }
                    placeholder="Votre réponse"
                    onClick={(e) => e.stopPropagation()}
                  />
                  <button onClick={(e) => { e.stopPropagation(); handleReview(card.id); }}>Valider</button>
                  <button onClick={(e) => { e.stopPropagation(); handleEdit(card); }}>Éditer</button>
                  <button onClick={(e) => { e.stopPropagation(); handleDelete(card.id); }}>Supprimer</button>
                </div>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cards;
