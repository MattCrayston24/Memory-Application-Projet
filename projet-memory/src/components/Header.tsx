import './Header.css';
import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

// Importer les images pour le logo et le bouton du menu burger
import logoImage from '/assets/logo.png';
import burgerIconImage from '/assets/burger-icon.png';

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false); // Etat pour gérer l'ouverture/fermeture du menu burger

  // Fermeture du menu burger lorsque l'on clique sur un lien
  const closeNav = () => setIsNavOpen(false);

  // Ouvrir/fermer le menu burger
  const toggleNav = () => setIsNavOpen((prev) => !prev);

  // Gérer le changement d'état d'écran
  const checkScreenSize = useCallback(() => {
    // Vérifier si l'écran est mobile (<= 768px)
    if (window.innerWidth <= 768) {
      setIsNavOpen(false); // Fermer le menu si mobile
    }
  }, []);

  // Ajouter un écouteur d'événements pour vérifier la taille de l'écran
  useEffect(() => {
    checkScreenSize(); // Vérifier la taille de l'écran au montage
    window.addEventListener('resize', checkScreenSize); // Mettre à jour à chaque redimensionnement

    return () => {
      window.removeEventListener('resize', checkScreenSize); // Nettoyer l'écouteur d'événements
    };
  }, [checkScreenSize]);

  // Gérer la fermeture du menu quand on clique à l'extérieur
  useEffect(() => {
    const closeMenuOnClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement; // Cast pour dire à TypeScript que c'est un élément DOM
      if (isNavOpen && target && !target.closest('.header')) { // Vérifier que le clic est à l'extérieur du header
        setIsNavOpen(false);
      }
    };
    document.addEventListener('click', closeMenuOnClickOutside);

    return () => {
      document.removeEventListener('click', closeMenuOnClickOutside); // Nettoyer l'événement
    };
  }, [isNavOpen]);

  return (
    <header className={`header ${isNavOpen ? 'open' : ''}`}>
      <div className="container">
        {/* Logo */}
        <div className="logo">
          <img src={logoImage} alt="Logo Projet Memory" />
        </div>

        {/* Titre */}
        <h1 className="title">Projet Memory</h1>

        {/* Menu burger */}
        <button className={`burger-btn ${isNavOpen ? 'open' : ''}`} onClick={toggleNav}>
          <img src={burgerIconImage} alt="Menu burger" />
        </button>

        {/* Menu de navigation */}
        <nav className={`nav-menu ${isNavOpen ? 'open' : ''}`}>
          <ul>
            <li>
              <Link to="/" className="nav-link" onClick={closeNav}>
                Accueil
              </Link>
            </li>
            <li>
              <Link to="/categories" className="nav-link" onClick={closeNav}>
                Catégories
              </Link>
            </li>
            <li>
              <Link to="/settings" className="nav-link" onClick={closeNav}>
                Paramètres
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
