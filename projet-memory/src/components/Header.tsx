// /src/components/Header.tsx

import './Header.css'; // Importation du fichier CSS pour le header

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <img src="/assets/logo.png" alt="Logo Projet Memory" />
      </div>
      <h1>Projet Memory</h1>
      <nav>
        <ul>
          <li><a href="/">Accueil</a></li>
          <li><a href="/categories">Catégories</a></li>
          <li><a href="/settings">Paramètres</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
