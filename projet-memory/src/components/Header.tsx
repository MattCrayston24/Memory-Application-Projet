import './Header.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [cardsToReview, setCardsToReview] = useState<{ category: string; count: number }[]>([]);
  const [notificationTime, setNotificationTime] = useState<string>(() => {
    return localStorage.getItem('notificationTime') || '09:00';
  });
  const [notificationFrequency, setNotificationFrequency] = useState<number>(() => {
    return Number(localStorage.getItem('notificationFrequency')) || 1;
  });

  // Fonction pour récupérer les cartes à réviser depuis le localStorage
  
  const getCardsToReview = () => {
    const storedData = localStorage.getItem('cards');
    if (!storedData) return;

    const cards = JSON.parse(storedData) as {
      id: string;
      category: string;
      nextReviewTime: number;
    }[];

    const now = Date.now();
    const cardsToReview = cards.filter(
      (card) => card.nextReviewTime <= now
    );

    const groupedByCategory = cardsToReview.reduce(
      (acc: Record<string, number>, card) => {
        acc[card.category] = (acc[card.category] || 0) + 1;
        return acc;
      },
      {}
    );

    const groupedData = Object.entries(groupedByCategory).map(
      ([category, count]) => ({
        category,
        count,
      })
    );

    setCardsToReview(groupedData);
  };

  // Fonction pour programmer la notification

  const scheduleNotification = () => {
    const [hours, minutes] = notificationTime.split(':').map(Number);
    const now = new Date();
    const targetTime = new Date();

    targetTime.setHours(hours, minutes, 0, 0);

    if (now > targetTime) {
      targetTime.setDate(targetTime.getDate() + 1);
    }

    const timeUntilNextNotification = targetTime.getTime() - now.getTime();

    setTimeout(() => {
      getCardsToReview();

      // Vérification des permissions de notification

      if (Notification.permission === 'granted') {
        const totalCards = cardsToReview.reduce((total, item) => total + item.count, 0);
        if (totalCards > 0) {
          new Notification('Révision de cartes', {
            body: `Vous avez ${totalCards} carte(s) à réviser.`,
          });
        }
      }

      // Reprogrammer en fonction de la fréquence choisie

      setTimeout(scheduleNotification, notificationFrequency * 24 * 60 * 60 * 1000); 
    }, timeUntilNextNotification);
  };

  useEffect(() => {

    // Vérifier la permission pour les notifications

    if (Notification.permission !== 'granted') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          scheduleNotification(); 
        }
      });
    } else {
      scheduleNotification(); 
    }

    getCardsToReview();
  }, [notificationTime, notificationFrequency]);

  const toggleNav = () => setIsNavOpen((prev) => !prev);
  const toggleNotification = () => setIsNotificationOpen((prev) => !prev);

  // Fermer le menu au clic à l'extérieur
  
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        !target.closest('.notification-container') &&
        !target.closest('.notification-btn')
      ) {
        setIsNotificationOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  // Pour enregistrer l'heure et la fréquence

  const handleSaveSettings = () => {
    localStorage.setItem('notificationTime', notificationTime);
    localStorage.setItem('notificationFrequency', String(notificationFrequency));
    scheduleNotification();
    alert('Paramètres enregistrés !');
  };

  return (
    <header className={`header ${isNavOpen ? 'open' : ''}`}>
      <div className="notification-container">
        <button className="notification-btn" onClick={toggleNotification}>
          Notifs :&nbsp;
          {cardsToReview.length > 0 && (
            <span className="notification-badge">
              {cardsToReview.reduce((total, item) => total + item.count, 0)}
            </span>
          )}
        </button>

        {isNotificationOpen && (
          <div className="notification-dropdown">
            <p>
              {cardsToReview.reduce((total, item) => total + item.count, 0)} carte(s) à réviser :
            </p>
            <ul>
              {cardsToReview.map((item) => (
                <li key={item.category}>
                  {item.category} : {item.count} cartes
                </li>
              ))}
            </ul>

            <div className="notification-settings notif">
              <label className='label-head'>Heure de notification :</label>
              <input
                className='time-head'
                type="time"
                value={notificationTime}
                onChange={(e) => setNotificationTime(e.target.value)}
              />

              <label className='label-head'>Fréquence de notification :</label>
              <select
              className='time-head'
                value={notificationFrequency}
                onChange={(e) => setNotificationFrequency(Number(e.target.value))}
              >
                <option value={1}>1 jour</option>
                <option value={2}>2 jours</option>
                <option value={4}>4 jours</option>
                <option value={7}>1 semaine</option>
              </select>

              <button className="buttonw" onClick={handleSaveSettings}>Enregistrer</button>
            </div>
          </div>
        )}
      </div>

      <div className="container">
        <h1 className="title">Projet Memory</h1>
        <button
          className={`burger-btn ${isNavOpen ? 'open' : ''}`}
          onClick={toggleNav}
        >
          ☰
        </button>

        <nav className={`nav-menu ${isNavOpen ? 'open' : ''}`}>
          <ul>
            <li>
              <Link to="/" className="nav-link">
                Accueil
              </Link>
            </li>
            <li>
              <Link to="/categories" className="nav-link">
                Catégories
              </Link>
            </li>
            <li>
              <Link to="/settings" className="nav-link">
                Paramètres
              </Link>
            </li>
            <li>
              <Link to="/ThemesPage" className="nav-link">
                Thèmes
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
