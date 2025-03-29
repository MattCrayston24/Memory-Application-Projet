import './settings.css';
import { useState, useEffect } from 'react';

const Settings = () => {
  const [notifTime, setNotifTime] = useState<string>('09:00');
  const [notifFrequency, setNotifFrequency] = useState<string>('1');
  const [baseInterval, setBaseInterval] = useState<number>(() => {
    const saved = localStorage.getItem('baseInterval');
    return saved ? Number(saved) : 1;
  });
  const [maxLevel, setMaxLevel] = useState<number>(() => {
    const saved = localStorage.getItem('maxLevel');
    return saved ? Number(saved) : 3;
  });
  
  // État pour le mode sombre (dark mode)

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });


  useEffect(() => {
    const savedNotifTime = localStorage.getItem('notifTime');
    const savedNotifFrequency = localStorage.getItem('notifFrequency');

    if (savedNotifTime) setNotifTime(savedNotifTime);
    if (savedNotifFrequency) setNotifFrequency(savedNotifFrequency);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  // Sauvegarder tous les paramètres dans le localStorage

  const handleSave = () => {
    localStorage.setItem('notifTime', notifTime);
    localStorage.setItem('notifFrequency', notifFrequency);
    localStorage.setItem('baseInterval', String(baseInterval));
    localStorage.setItem('maxLevel', String(maxLevel));
    alert('Paramètres enregistrés!');
  };

  // Bascule du mode sombre

  const handleToggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  return (
    <main className="settings">
      <h1>⚙️ Paramètres</h1>

      <section className="setting-section">
        <h2>🔔 Notifications</h2>
        <p>
          Votre bouton en haut à gauche de la page vous permet de visualiser toutes les cartes à réviser. 
          Vous pouvez modifier les moments où vous souhaitez recevoir ces notifications et leur fréquence.
        </p>
      </section>

      <section className="setting-section">
        <h2>📅 Révision</h2>
        <p>
          Configurez la répétition espacée pour vos cartes. Définissez le temps de base (en jours) et le nombre maximum de niveaux. 
          Par exemple, avec un temps de base de 1 jour et 3 niveaux, vos intervalles seront 1, 2 et 4 jours.
        </p>
        <div className="setting-item">
          <label>Temps de base (en jours) :</label>
          <input
            type="number"
            value={baseInterval}
            onChange={(e) => setBaseInterval(Number(e.target.value))}
            min="1"
          />
        </div>
        <div className="setting-item">
          <label>Nombre maximum de niveaux :</label>
          <input
            type="number"
            value={maxLevel}
            onChange={(e) => setMaxLevel(Number(e.target.value))}
            min="1"
          />
        </div>
      </section>

      <section className="setting-section">
        <h2>🌗 Mode Clair/Sombre</h2>
        <p>Activez ou désactivez le mode sombre pour l'affichage de l'application.</p>
        <button className="toggle-dark-btn" onClick={handleToggleDarkMode}>
          {darkMode ? 'Passer en mode clair' : 'Passer en mode sombre'}
        </button>
      </section>

      <section className="setting-section">
        <h2>🎨 Apparence</h2>
        <p>Bientôt disponible...</p>
      </section>
      
      <section className="setting-section">
        <h2>🛠 Autres</h2>
        <p>Plus d'options arriveront prochainement.</p>
      </section>

      <button className="save-btn" onClick={handleSave}>💾 Enregistrer</button>
    </main>
  );
}

export default Settings;
