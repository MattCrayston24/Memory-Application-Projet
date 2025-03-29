import './home.css';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <main className="home">
      <section className="hero">
        <h1>Bienvenue sur <span>Projet Memory</span> !</h1>
        <p>
          Optimise ta mémorisation avec la répétition espacée. 
          Crée des cartes, révise efficacement et booste ta mémoire !
        </p>
        <Link to="/categories" className="cta-button">Explorer les catégories</Link>
      </section>

      <section className="features">
        <div className="feature">
          <h2>📚 Crée tes propres cartes</h2>
          <p>Personnalise tes révisions avec tes propres contenus.</p>
        </div>
        <div className="feature">
          <h2>⏳ Répétition espacée</h2>
          <p>Optimise ton apprentissage avec un algorithme intelligent.</p>
        </div>
        <div className="feature">
          <h2>🔔 Notifications intelligentes</h2>
          <p>Ne rate jamais une session grâce aux rappels automatiques.</p>
        </div>
      </section>
    </main>
  );
}

export default Home;
