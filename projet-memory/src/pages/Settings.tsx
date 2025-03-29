import './settings.css';
import { useState, useEffect } from 'react';

const Settings = () => {
  // Initialisation des états pour les paramètres de notification
  const [notifTime, setNotifTime] = useState<string>('');
  const [notifFrequency, setNotifFrequency] = useState<string>('1');

  // Récupérer les paramètres stockés dans le localStorage lors du chargement de la page
  useEffect(() => {
    const savedNotifTime = localStorage.getItem('notifTime');
    const savedNotifFrequency = localStorage.getItem('notifFrequency');

    if (savedNotifTime) {
      setNotifTime(savedNotifTime);
    }

    if (savedNotifFrequency) {
      setNotifFrequency(savedNotifFrequency);
    }
  }, []);

  // Sauvegarder les paramètres dans le localStorage
  const handleSave = () => {
    localStorage.setItem('notifTime', notifTime);
    localStorage.setItem('notifFrequency', notifFrequency);

    console.log('Données sauvegardées:', { notifTime, notifFrequency });

    alert('Paramètres enregistrés!');
  };

  return (
    <main className="settings">
      <h1>⚙️ Paramètres</h1>

      <section className="setting-section">
        <h2>🔔 Notifications</h2>
        <p>Votre bouton en haut à gauche de la page vous permet de visualiser toutes les cartes à réviser, de plus vous pouvez modifier les moments où vous souhaitez avoir ces notifications et à quelle fréquence !</p>
      </section>

      <section className="setting-section">
        <h2>🎨 Apparence</h2>
        <p>Bientôt disponible...</p>
      </section>
      
      <section className="setting-section">
        <h2>🛠 Autres</h2>
        <p>Plus d'options arriveront prochainement.</p>
      </section>
    </main>
  );
}

export default Settings;
