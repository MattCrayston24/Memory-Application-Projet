# 📌 Projet Memory

## 📝 Introduction
Projet Memory est une application de mémorisation basée sur la répétition espacée. Elle permet d'organiser et de réviser des cartes de révision avec un mode hors ligne grâce à un service worker.

---

## 🚀 Déploiement
### Exécuter en local
```sh
git clone https://github.com/MattCrayston24/Memory-Application-Projet.git

cd projet-memory

npm install

npm start
```

---

## 🎯 Fonctionnalités Principales


### 1. Gestion des Catégories, Thèmes et Cartes
- Les utilisateurs peuvent créer, éditer et supprimer des **catégories**, **thèmes** et **cartes de révision**.
- Chaque carte peut contenir du **texte**, des **images**, des fichiers **mp3/mp4** pour enrichir l'expérience d'apprentissage.
- Interface fluide pour naviguer et organiser le contenu.

### 2. Révision et Répétition Espacée
- Implémentation du principe de **répétition espacée** permettant d’optimiser l’apprentissage.
- Configuration du nombre de **niveaux** et du **nombre de nouvelles cartes** à réviser par jour.
- Système intelligent qui ajuste les cartes à revoir en fonction des performances de l'utilisateur.

### 3. Notifications Quotidiennes
- L'utilisateur peut **configurer** un rappel quotidien pour la révision.
- Notifications envoyées via le **navigateur** à l’heure et fréquence définies par l’utilisateur.
- Persistance des préférences même après un rafraîchissement de la page.

### 4. Fonctionnement Hors-ligne
- L’application est totalement **fonctionnelle hors ligne** grâce à un **Service Worker** et un **fichier MANIFEST**.
- Mise en cache des fichiers essentiels pour garantir l’accès sans connexion Internet.
- Révision possible même sans accès réseau.

## 🎯 Fonctionnalités Supplémentaires

✅ **Gestion des catégories** (Ajout, modification, suppression)

✅ **Gestion des thèmes** (Ajout, modification, suppression, personnalisation)

✅ **Création de cartes de révision** (Avec texte, média MP3/MP4)

✅ **Système de répétition espacée** (Avec configuration personnalisée)

✅ **Mode hors ligne** (Grâce au Service Worker)

✅ **Notifications pour les révisions** (Avec fréquence et heure personnalisables)

✅ **Import / export des thèmes** (Pas colmplètement terminé)

✅ **Mode clair / sombre** (Répond à une demande design commune)

---

## 📂 Organisation du code
- **📁 `src/`**  
  - `components/` → Composants réutilisables (cartes, boutons, etc.)  
  - `pages/` → Pages principales (Accueil, Paramètres, Révisions, etc.)  
  - `services/` → Gestion du service worker et des notifications  
  - `utils/` → Fonctions utilitaires  
  - `styles/` → Fichiers CSS et thèmes  
- **📁 `public/`**  
  - `manifest.json` → Configuration du PWA  
  - `service-worker.js` → Gestion du cache et offline  

---

## ⚙️ Explication des fonctionnalités (page par page)
### 📌 `Accueil.tsx`
- Présentation de l'application avec un accès rapide aux révisions et paramètres.

### ⚙️ `Settings.tsx`
- Configuration des notifications et de la fréquence de révision.

### 📚 `Revision.tsx`
- Interface utilisateur pour réviser les cartes selon le système de répétition espacée.

### 📁 `Categories.tsx`
- Gestion des catégories et des thèmes de révision.

---

## 🛠️ Technologies utilisées
- **React + TypeScript**
- **PWA (Progressive Web App)**
- **Service Worker** (Mode hors ligne)
- **LocalStorage** (Sauvegarde des paramètres)

---

## 📖 Instructions pour contribuer
1. Fork le projet
2. Créer une branche `feature/nouvelle-fonctionnalite`
3. Soumettre une Pull Request

---

## 🏆 Auteur(s)
👤 **Matt**
