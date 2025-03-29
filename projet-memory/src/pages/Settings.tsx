import './settings.css';
import { useState } from 'react';

const Settings = () => {
  const [notifTime, setNotifTime] = useState(localStorage.getItem('notifTime') || '09:00');
  const [notifFrequency, setNotifFrequency] = useState(localStorage.getItem('notifFrequency') || '1');

  const handleSave = () => {
    localStorage.setItem('notifTime', notifTime);
    localStorage.setItem('notifFrequency', notifFrequency);
    alert('Paramètres enregistrés !');
  };

  return (
    <main className="settings">
      <h1>⚙️ Paramètres</h1>
      
      <section className="setting-section">
        <h2>🔔 Notifications</h2>
        <div className="setting-item">
          <label>Heure des notifications :</label>
          <input 
            type="time" 
            value={notifTime} 
            onChange={(e) => setNotifTime(e.target.value)}
          />
        </div>

        <div className="setting-item">
          <label>Fréquence des notifications :</label>
          <select 
            value={notifFrequency} 
            onChange={(e) => setNotifFrequency(e.target.value)}
          >
            <option value="1">Tous les jours</option>
            <option value="2">Tous les 2 jours</option>
            <option value="4">Tous les 4 jours</option>
            <option value="7">Chaque semaine</option>
          </select>
        </div>

        <button className="save-btn" onClick={handleSave}>💾 Enregistrer</button>
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
