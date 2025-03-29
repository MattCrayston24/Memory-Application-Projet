import './settings.css';
import { useState, useEffect } from 'react';

const Settings = () => {
  // Récupérer les données de notification depuis localStorage avec valeurs par défaut
  const [notifTime, setNotifTime] = useState<string>(''); // Par défaut vide
  const [notifFrequency, setNotifFrequency] = useState<string>('1'); // Par défaut tous les jours

  // Récupérer les paramètres stockés au chargement de la page
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

  // Fonction pour sauvegarder les paramètres dans localStorage
  const handleSave = () => {
    // Sauvegarder les paramètres dans localStorage
    localStorage.setItem('notifTime', notifTime);
    localStorage.setItem('notifFrequency', notifFrequency);

    // Log pour vérifier l'enregistrement dans localStorage
    console.log('Données sauvegardées:', { notifTime, notifFrequency });

    alert('Paramètres enregistrés!');
  };

  return (
    <main className="settings">
      <h1>⚙️ Paramètres</h1>

      <section className="setting-section">
        <h2>🔔 Notifications</h2>

        {/* Bouton Modifier pour rediriger vers la section de notifications dans le header */}
        <button className="modify-btn" onClick={() => window.location.href = '#notifications'}>
          Modifier Notifications
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
    </main>
  );
}

export default Settings;
