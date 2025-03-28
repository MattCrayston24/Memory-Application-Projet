import './Header.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [cardsToReview, setCardsToReview] = useState<{ category: string; count: number }[]>([]);

  // Fonction pour récupérer les cartes à réviser depuis le localStorage
  const getCardsToReview = () => {
    const storedData = localStorage.getItem('cards');
    if (!storedData) return;

    const cards = JSON.parse(storedData) as {
      id: string;
      category: string;
      nextReviewTime: number;
    }[];

    // Filtrer les cartes prêtes à être révisées
    const now = Date.now();
    const cardsToReview = cards.filter(
      (card) => card.nextReviewTime <= now
    );

    // Regrouper par catégorie
    const groupedByCategory = cardsToReview.reduce(
      (acc: Record<string, number>, card) => {
        acc[card.category] = (acc[card.category] || 0) + 1;
        return acc;
      },
      {}
    );

    // Mettre à jour le state avec le regroupement par catégorie
    const groupedData = Object.entries(groupedByCategory).map(
      ([category, count]) => ({
        category,
        count,
      })
    );

    setCardsToReview(groupedData);
  };

  useEffect(() => {
    // Vérification toutes les 24h à 9h du matin
    const checkNotifications = () => {
      const now = new Date();
      const targetTime = new Date();
      targetTime.setHours(9, 0, 0, 0);

      // Si l'heure est déjà passée aujourd'hui, planifier pour demain
      if (now > targetTime) {
        targetTime.setDate(targetTime.getDate() + 1);
      }

      const timeUntilNextCheck = targetTime.getTime() - now.getTime();

      // Lancer le premier check à l'heure cible
      const timer = setTimeout(() => {
        getCardsToReview();

        // Ensuite, vérifier toutes les 24 heures
        const interval = setInterval(() => {
          getCardsToReview();
        }, 24 * 60 * 60 * 1000); // 24h

        return () => clearInterval(interval);
      }, timeUntilNextCheck);

      return () => clearTimeout(timer);
    };

    checkNotifications();

    // Vérification initiale au chargement
    getCardsToReview();
  }, []);

  // Toggle du menu burger
  const toggleNav = () => setIsNavOpen((prev) => !prev);

  // Toggle du menu des notifications
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

  return (
    <header className={`header ${isNavOpen ? 'open' : ''}`}>
      {/* Bouton Notification */}
      <div className="notification-container">
        <button className="notification-btn" onClick={toggleNotification}>
          Notifs :&nbsp;
          {cardsToReview.length > 0 && (
            <span className="notification-badge">
              {cardsToReview.reduce((total, item) => total + item.count, 0)}
            </span>
          )}
        </button>

        {/* Menu déroulant des notifications */}
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
          </div>
        )}
      </div>

      {/* Titre */}
      <div className="container">
        <h1 className="title">Projet Memory</h1>

        {/* Menu burger */}
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
