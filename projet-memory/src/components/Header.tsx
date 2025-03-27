import './Header.css';
import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [cardsToReview, setCardsToReview] = useState<{ category: string; count: number }[]>([]);

  // Simuler la récupération des cartes à réviser
  useEffect(() => {
    // Exemple de données simulées :
    const mockData = [
      { category: 'Math', count: 5 },
      { category: 'Histoire', count: 3 },
      { category: 'Science', count: 7 },
    ];

    setCardsToReview(mockData);
  }, []);

  // Toggle du menu burger
  const toggleNav = () => setIsNavOpen((prev) => !prev);

  // Toggle du menu des notifications
  const toggleNotification = () => setIsNotificationOpen((prev) => !prev);

  // Fermer le menu au clic à l'extérieur
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.notification-container') && !target.closest('.notification-btn')) {
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
          Notifs
        </button>

        {/* Menu déroulant des notifications */}
        {isNotificationOpen && (
          <div className="notification-dropdown">
            <p>
              {cardsToReview.reduce((total, item) => total + item.count, 0)} cartes à réviser :
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
        <button className={`burger-btn ${isNavOpen ? 'open' : ''}`} onClick={toggleNav}>
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
                Themes
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
