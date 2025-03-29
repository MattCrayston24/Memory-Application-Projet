import { useState, useEffect } from 'react';
import './cards.css';

export interface Card {
  id: number;
  question: string;
  answer: string;
  interval: number;
  nextReviewTime: number;
  mediaUrl?: string; // URL du fichier média (photo, vidéo ou audio) en base64
  mediaType?: 'image' | 'video' | 'audio'; // Type du fichier média
}

interface CardsProps {
  cards: Card[];
  onUpdateCards: (cards: Card[]) => void;
}

const Cards = ({ cards, onUpdateCards }: CardsProps) => {
  const [flipped, setFlipped] = useState<number | null>(null);
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>({});
  const [activeCards, setActiveCards] = useState<Card[]>([]);
  const [isAddingMedia, setIsAddingMedia] = useState<number | null>(null);

  useEffect(() => {
    const filteredCards = cards.filter(card => card.nextReviewTime <= Date.now());
    setActiveCards(filteredCards);
  }, [cards]);

  const resetCard = (card: Card) => {
    return { ...card, interval: 0, nextReviewTime: Date.now() };
  };

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
      alert('✅ Bonne réponse !');
    } else {
      const resetUpdatedCard = resetCard(card);
      const updatedCards = cards.map(c => c.id === card.id ? resetUpdatedCard : c);
      localStorage.setItem('cards', JSON.stringify(updatedCards));
      onUpdateCards(updatedCards);
      alert('❌ Mauvaise réponse ! Essayez encore.');
    }
  };

  const handleDelete = (id: number) => {
    const updatedCards = cards.filter(card => card.id !== id);
    localStorage.setItem('cards', JSON.stringify(updatedCards));
    onUpdateCards(updatedCards);
  };

  // Lire le fichier en base64 pour que le média soit persistant
  const handleAddMedia = (id: number, mediaFile: File, mediaType: 'image' | 'video' | 'audio') => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const updatedCard = { ...cards.find(c => c.id === id)!, mediaUrl: result, mediaType };
      const updatedCards = cards.map(c => c.id === id ? updatedCard : c);
      localStorage.setItem('cards', JSON.stringify(updatedCards));
      onUpdateCards(updatedCards);
      setIsAddingMedia(null);
    };
    reader.readAsDataURL(mediaFile);
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

              {/* Bouton "Contenu" pour ajouter un média */}
              {!card.mediaUrl && !isAddingMedia && (
                <button className="add-content-btn" onClick={() => setIsAddingMedia(card.id)}>
                  Ajouter un contenu
                </button>
              )}

              {/* Affichage du média ajouté */}
              {card.mediaUrl && (
                <div className="media-container">
                  {card.mediaType === 'image' && (
                    <img src={card.mediaUrl} alt="Média" className="media" />
                  )}
                  {card.mediaType === 'video' && (
                    <video controls className="media" preload="metadata">
                      <source src={card.mediaUrl} type="video/mp4" />
                      Votre navigateur ne supporte pas la vidéo.
                    </video>
                  )}
                  {card.mediaType === 'audio' && (
                    <audio controls className="media" preload="metadata">
                      <source src={card.mediaUrl} type="audio/mpeg" />
                      Votre navigateur ne supporte pas l'audio.
                    </audio>
                  )}
                </div>
              )}

              {/* Formulaire pour ajouter un fichier multimédia */}
              {isAddingMedia === card.id && (
                <div className="media-upload">
                  <input
                    type="file"
                    accept="image/*, video/*, audio/*"
                    onChange={(e) => {
                      if (e.target.files) {
                        const mediaFile = e.target.files[0];
                        const mediaType = mediaFile.type.split('/')[0] as 'image' | 'video' | 'audio';
                        handleAddMedia(card.id, mediaFile, mediaType);
                      }
                    }}
                  />
                  <button onClick={() => setIsAddingMedia(null)}>Annuler</button>
                </div>
              )}
            </div>

            <div className="card-back">
              <p><strong>Réponse :</strong> {card.answer}</p>
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
