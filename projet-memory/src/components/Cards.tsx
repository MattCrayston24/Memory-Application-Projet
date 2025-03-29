import { useState, useEffect } from 'react';
import './cards.css';

export interface Card {
  id: number;
  question: string;
  answer: string;
  interval: number; 
  nextReviewTime: number; 
}

interface CardsProps {
  cards: Card[];
  onUpdateCards: (cards: Card[]) => void;
}

const Cards = ({ cards, onUpdateCards }: CardsProps) => {
  const [flipped, setFlipped] = useState<number | null>(null);
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>({});
  const [activeCards, setActiveCards] = useState<Card[]>([]);

  // Mettre à jour les cartes actives au chargement ou changement de cartes

  useEffect(() => {
    const filteredCards = cards.filter(card => card.nextReviewTime <= Date.now());
    setActiveCards(filteredCards);
  }, [cards]);

  // Fonction pour réinitialiser une carte si la réponse est incorrecte

  const resetCard = (card: Card) => {
    return { ...card, interval: 0, nextReviewTime: Date.now() }; 
  };

  // Fonction pour gérer l'avancement des cartes

  const handleReview = (id: number) => {
    const userAnswer = userAnswers[id] ? userAnswers[id].trim().toLowerCase() : '';
    const card = cards.find(c => c.id === id);
    if (!card) return;
    const correctAnswer = card.answer.trim().toLowerCase();

    if (userAnswer === correctAnswer) {

      const nextInterval = card.interval === 0 ? 1 : card.interval * 2; 
      const nextReviewTime = Date.now() + nextInterval * 60000; 
      const updatedCard = { ...card, interval: nextInterval, nextReviewTime };
      const updatedCards = cards.map(c => c.id === card.id ? updatedCard : c);

      localStorage.setItem('cards', JSON.stringify(updatedCards));
      onUpdateCards(updatedCards);

      // Afficher le temps dans la console

      console.log(`Carte mise à jour : ${card.question}, Prochain réexamen dans ${nextInterval} minutes.`);
      alert('✅ Bonne réponse !');
    } else {

      // Réponse incorrecte, réinitialiser la carte

      const resetUpdatedCard = resetCard(card);
      const updatedCards = cards.map(c => c.id === card.id ? resetUpdatedCard : c);
      localStorage.setItem('cards', JSON.stringify(updatedCards)); // Sauvegarder dans le localStorage
      onUpdateCards(updatedCards);

      alert('❌ Mauvaise réponse ! Essayez encore.');
    }
  };

  const handleDelete = (id: number) => {
    const updatedCards = cards.filter(card => card.id !== id);
    localStorage.setItem('cards', JSON.stringify(updatedCards)); // Sauvegarder dans le localStorage
    onUpdateCards(updatedCards);
  };

  return (
    <div className="cards-container">
      {activeCards.map(card => (
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
            <div className="card-front">
              <p><strong>Révision Card</strong></p>
              <p>Question : {card.question}</p>
            </div>
            <div className="card-back">
              <p><strong>Question :</strong> {card.question}</p>
              <input
                type="text"
                value={userAnswers[card.id] || ''}
                onChange={(e) => setUserAnswers({ ...userAnswers, [card.id]: e.target.value })}
                placeholder="Votre réponse"
                onClick={(e) => e.stopPropagation()}
              />
              <div className="button-group">
                <button onClick={(e) => { e.stopPropagation(); handleReview(card.id); }}>Valider</button>
                <button onClick={(e) => { e.stopPropagation(); handleDelete(card.id); }}>Supprimer</button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cards;
