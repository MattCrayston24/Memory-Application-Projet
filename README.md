# 📌 Projet Memory

## 📝 Introduction
Projet Memory est une application de mémorisation basée sur la répétition espacée. Elle permet d'organiser et de réviser des cartes de révision avec un mode hors ligne grâce à un service worker. L'application dispose de plusieurs fonctionnalités listées juste ci-dessous.

---

## 🚀 Déploiement
### Exécuter en local
```sh
git clone https://github.com/MattCrayston24/Memory-Application-Projet.git

cd .\projet-memory\

npm install

npm run dev
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

✅ **Création de cartes de révision** (Avec photo, vidéo et audio)

✅ **Système de répétition espacée** (Avec configuration personnalisée)

✅ **Notifications pour les révisions** (Avec fréquence et heure personnalisables)

✅ **Import / export des thèmes** (Pas complètement terminé)

✅ **Mode clair / sombre** (Répond à une demande design commune)

---

## 📂 Organisation principale du code
- **📁 `src/`**  
  - `components/` → Composants réutilisables (cartes, thèmes, etc...)  
  - `pages/` → Pages principales (Accueil, Paramètres, Révisions, etc.)  
- **📁 `public/`**  
  - `manifest.json` → Configuration du PWA  
  - `service-worker.js` → Gestion du cache et offline  

---
---

## ⚙️ Explication rapide des fonctionnalités (page par page)
### 📌 `Home.tsx`
- Présentation de l'application avec un accès rapide aux révisions et paramètres.

### ⚙️ `Settings.tsx`
- Configuration des notifications et de la fréquence de révision.

### 📚 `Themes.tsx`
- Interface utilisateur pour partager et récuperer les themes des autres utilisateurs (pas terminé)

### 📁 `Categories.tsx`
- Gestion des catégories et des thèmes de révision.

---

## 🛠️ Technologies utilisées
- **React + TypeScript**
- **PWA (Progressive Web App)**
- **Service Worker** (Mode hors ligne)
- **LocalStorage** (Sauvegarde des paramètres)

---

# Explication détaillée pour chaque fichier `.tsx`

# 🗂️ Sommaire

## 📂 /components

- [📂 Home.tsx](#home-tsx)
- [📂 Categories.tsx](#categories-tsx)
- [📂 ThemesPage.tsx](#themespage-tsx)
- [📂 Openapi.yaml](#openapi-yaml)
- [📂 Settings.tsx](#settings-tsx)

## 📂 /components
- [📂 Themes.tsx](#themes-tsx)
- [📂 Header.tsx](#header-tsx)
- [📂 Cards.tsx](#cards-tsx)
---
# 📂 /pages
---
## 📂 Home.tsx

### Présentation
Projet Memory est une application de mémorisation utilisant la répétition espacée pour optimiser l'apprentissage. Les utilisateurs peuvent créer des cartes de révision, configurer des notifications et utiliser l'application hors ligne.

### Déploiement
L'application peut être utilisée en PWA et fonctionne même en mode hors ligne grâce au Service Worker. Il suffit de l'ouvrir dans un navigateur compatible et de l'ajouter à l'écran d'accueil.

### Fonctionnalités
- Création, édition et suppression de catégories, thèmes et cartes avec texte et médias.
- Révision basée sur la répétition espacée.
- Notifications de rappel configurables.
- Fonctionnement hors ligne.

### Organisation du code

#### `home.tsx`
Cette page est la page d'accueil de l'application. Elle présente l'application et ses principales fonctionnalités.

#### Fonctionnalités incluses

- **Présentation du projet** avec un message d'accueil et une courte description :

  ```tsx
  <section className="hero">
    <h1>Bienvenue sur <span>Projet Memory</span> !</h1>
    <p>
      Optimise ta mémorisation avec la répétition espacée. 
      Crée des cartes, révise efficacement et booste ta mémoire !
    </p>
  </section>
  ```

- **Bouton pour explorer les catégories**, dirigeant les utilisateurs vers la section correspondante :

  ```tsx
  <Link to="/categories" className="cta-button">Explorer les catégories</Link>
  ```

- **Mise en avant des principales fonctionnalités** à travers une section dédiée :

  ```tsx
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
  ```

---

---

## 📂 Categories.tsx

### Présentation
La page `categories.tsx` permet aux utilisateurs de gérer les catégories et les thèmes liés aux cartes de révision. Elle offre la possibilité de créer, modifier et supprimer des catégories et des thèmes, ainsi que d'ajouter des cartes de révision.

### Fonctionnalités principales
- Affichage des catégories existantes.
- Création, modification et suppression de catégories.
- Ajout, modification et suppression de thèmes dans une catégorie.
- Ajout de cartes de révision à un thème.
- Sauvegarde automatique des données dans le `localStorage`.
- Gestion du système de répétition espacée en mettant à jour les cartes à réviser.

### Organisation du code

#### Déclaration des interfaces
Le fichier commence par la définition des interfaces `Card`, `ThemeData` et `CategoryData`, qui structurent les données utilisées dans l'application.

```tsx
export interface Card {
  id: number;
  question: string;
  answer: string;
  interval: number;
  nextReviewTime: number;
}

export interface ThemeData {
  id: number;
  name: string;
  description: string;
  cards: Card[];
}

export interface CategoryData {
  id: number;
  name: string;
  description: string;
  themes: ThemeData[];
}
```

#### Initialisation des catégories
Un jeu de données initial est défini pour assurer un contenu de base si aucune donnée n'est stockée dans le `localStorage`.

```tsx
const initialCategories: CategoryData[] = [
  {
    id: 1,
    name: 'Langues',
    description: 'Catégorie pour les langues.',
    themes: [
      {
        id: 1,
        name: 'Anglais',
        description: 'Thème anglais',
        cards: [
          {
            id: 1,
            question: 'How do you say "chat" in English?',
            answer: 'cat',
            interval: 1,
            nextReviewTime: Date.now() + 60000,
          },
        ],
      },
    ],
  },
];
```

#### Gestion de l'état des catégories
L'état des catégories est stocké dans un `useState`, en récupérant les données depuis le `localStorage` si elles existent.

```tsx
const [categories, setCategories] = useState<CategoryData[]>(() => {
  const saved = localStorage.getItem('categoriesData');
  return saved ? JSON.parse(saved) : initialCategories;
});
```

#### Sauvegarde automatique des données
Un `useEffect` permet d'enregistrer automatiquement les données à chaque modification.

```tsx
useEffect(() => {
  localStorage.setItem('categoriesData', JSON.stringify(categories));
  updateCardsToReview();
}, [categories]);
```

#### Fonction de mise à jour des cartes à réviser
La fonction `updateCardsToReview` extrait les cartes des différentes catégories et les stocke dans le `localStorage` pour assurer le suivi des révisions.

```tsx
const updateCardsToReview = () => {
  const allCards = categories.flatMap(category =>
    category.themes.flatMap(theme => theme.cards.map(card => ({
      id: card.id,
      category: category.name,
      nextReviewTime: card.nextReviewTime,
    })))
  );

  localStorage.setItem('cards', JSON.stringify(allCards));
};
```

#### Gestion des actions utilisateur
Le fichier implémente plusieurs fonctions permettant d'interagir avec les catégories, les thèmes et les cartes :
- `handleAddCategory()`: Ajoute une nouvelle catégorie.
- `handleEditCategory(id)`: Modifie une catégorie existante.
- `handleDeleteCategory(id)`: Supprime une catégorie.
- `handleAddTheme(categoryId)`: Ajoute un thème à une catégorie.
- `handleAddFlashcard(categoryId, themeId)`: Ajoute une carte de révision à un thème.

Exemple d'ajout d'une nouvelle catégorie :

```tsx
const handleAddCategory = () => {
  const name = prompt('Nom de la nouvelle catégorie:');
  if (!name) return;
  const description = prompt('Description de la catégorie:') || '';
  const newCategory: CategoryData = {
    id: Date.now(),
    name,
    description,
    themes: [],
  };
  setCategories(prev => [...prev, newCategory]);
};
```

#### Rendu du composant
Le rendu inclut :
- Un bouton pour ajouter une nouvelle catégorie.
- Une liste affichant chaque catégorie avec ses options d'édition et de suppression.
- Un bouton pour ajouter un thème à chaque catégorie.
- Un composant `Themes` pour gérer les thèmes et cartes associées.

```tsx
return (
  <div className="page-categories">
    <h1>Catégories</h1>
    <button className="btn-add-category" onClick={handleAddCategory}>
      Ajouter une catégorie
    </button>
    <div className="categories-list">
      {categories.map(cat => (
        <div key={cat.id} className="category-item">
          <div className="category-header">
            <h2 className='h22'>{cat.name}</h2>
            <div className="category-buttons">
              <button onClick={() => handleEditCategory(cat.id)}>Éditer</button>
              <button onClick={() => handleDeleteCategory(cat.id)}>Supprimer</button>
            </div>
          </div>
          <p>{cat.description}</p>
          <button className="btn-add-theme" onClick={() => handleAddTheme(cat.id)}>
            Ajouter un thème
          </button>
          <Themes
            themes={cat.themes}
            onUpdateThemes={(newThemes) =>
              setCategories(prev =>
                prev.map(c => (c.id === cat.id ? { ...c, themes: newThemes } : c))
              )
            }
            onAddFlashcard={(themeId) => handleAddFlashcard(cat.id, themeId)}
          />
        </div>
      ))}
    </div>
  </div>
);
```

### Conclusion
Le fichier `categories.tsx` est essentiel pour la gestion des catégories et des thèmes. Il assure :
✅ Une gestion complète des catégories et thèmes.
✅ Un stockage persistant via `localStorage`.
✅ Une mise à jour des cartes pour le système de répétition espacée.

C'est une des pages centrales du projet `Projet Memory`, assurant une navigation et une gestion intuitive des révisions.

---
---

## 📂 ThemesPage.tsx

### Présentation
Ce fichier gère l'affichage et la gestion des thèmes disponibles dans l'application. L'objectif est de permettre aux utilisateurs de publier, importer et consulter des thèmes de révision.

### Fonctionnalités prévues
- Récupération des thèmes depuis une API externe.
- Affichage des thèmes publiés.
- Publication d'un nouveau thème.
- Importation de thèmes existants.

### Implémentation actuelle
Ce morceau de code a été commencé mais n'est pas encore terminé. Il doit permettre :
- De charger les thèmes existants via `fetchThemes()`.
- D'afficher les thèmes dans une liste dynamique.
- D'intégrer les composants `PublishTheme` et `ImportThemes`.

### Explication du Code
```tsx
import { useState, useEffect } from 'react';
import PublishTheme from '../components/PublishTheme';
import ImportThemes from '../components/ImportThemes';
import { fetchThemes } from '../api/api';
import './themespage.css';
```
- Importation des hooks React (`useState`, `useEffect`) pour gérer l'état local et les effets de chargement.
- Importation des composants `PublishTheme` et `ImportThemes` pour la gestion des thèmes.
- Importation de `fetchThemes` pour récupérer les thèmes publiés.

```tsx
const [themes, setThemes] = useState<Theme[]>([]);
const [loading, setLoading] = useState<boolean>(false);
const [error, setError] = useState<string | null>(null);
```
- `themes` stocke la liste des thèmes récupérés.
- `loading` gère l'affichage d'un état de chargement.
- `error` gère l'affichage des erreurs éventuelles.

```tsx
useEffect(() => {
  const loadThemes = async () => {
    setLoading(true);
    try {
      const fetchedThemes = await fetchThemes();
      setThemes(fetchedThemes);
      setError(null);
    } catch (error) {
      setError("Erreur lors de la récupération des thèmes");
      console.error("Erreur lors de la récupération des thèmes", error);
    } finally {
      setLoading(false);
    }
  };
  loadThemes();
}, []);
```
- Cette fonction charge les thèmes dès l'affichage de la page et gère les erreurs éventuelles.

```tsx
const handleThemePublished = () => {
  const loadThemes = async () => {
    setLoading(true);
    try {
      const fetchedThemes = await fetchThemes();
      setThemes(fetchedThemes);
      setError(null);
    } catch (error) {
      setError("Erreur lors de la récupération des thèmes");
      console.error("Erreur lors de la récupération des thèmes", error);
    } finally {
      setLoading(false);
    }
  };
  loadThemes();
};
```
- Ce code doit permettre de rafraîchir la liste des thèmes après publication d'un nouveau thème, mais l'implémentation peut être améliorée.

```tsx
return (
  <div className="themes-page">
    <h1>🎨 Gestion des Thèmes</h1>
    <section className="publish-import-section">
      <PublishTheme onThemePublished={handleThemePublished} />
      <ImportThemes />
    </section>
    {loading && <p className="loading-message">Chargement des thèmes...</p>}
    {error && <p className="error-message">{error}</p>}
    <h2>📚 Thèmes publiés</h2>
    {themes.length === 0 ? (
      <p>Aucun thème publié.</p>
    ) : (
      <ul className="themes-list">
        {themes.map((theme) => (
          <li key={theme.id} className="theme-item">
            <h3>{theme.name}</h3>
            <p>{theme.description}</p>
          </li>
        ))}
      </ul>
    )}
  </div>
);
```
- Affichage de la gestion des thèmes avec un titre et des boutons d'action.
- Intégration des composants `PublishTheme` et `ImportThemes`.
- Gestion de l'affichage conditionnel en fonction de l'état (`loading`, `error`, `themes`).

### Améliorations possibles
- Ajouter un bouton de suppression et d'édition des thèmes.
- Gérer les erreurs de manière plus détaillée.
- Permettre la recherche et le filtrage des thèmes.


## 📂 Openapi.yaml

Ce fichier YAML décrit une ébauche de la spécification OpenAPI pour l'API de l'application Memory. L'objectif est de permettre la publication, l'importation et la gestion des thèmes de révision.

💡 **⚠️ Ce travail n'a pas été terminé.**
L'idée était de structurer les endpoints pour gérer les thèmes, mais l'intégration avec le frontend et la mise en place d'un backend effectif restent à finaliser.

---

## 🎯 Objectif
L'API vise à :
- Publier de nouveaux thèmes de révision.
- Récupérer les thèmes disponibles.
- Supprimer des thèmes si nécessaire.

## 🌍 Définition des serveurs
Le fichier spécifie deux environnements :
```yaml
servers:
  - url: https://memory-app.com/api
    description: Serveur de production
  - url: http://localhost:5173/api
    description: Serveur de développement
```
Un serveur en local et un en production sont prévus, mais l'API n'a pas encore été déployée.

## 📌 Endpoints définis

### 🔹 `/themes` - Gestion des thèmes

#### ➤ Récupérer la liste des thèmes publiés
```yaml
get:
  summary: Récupère la liste des thèmes publiés
  responses:
    '200':
      description: Liste des thèmes récupérée avec succès
```
💡 **Ce point d'accès doit permettre au frontend d'afficher les thèmes disponibles.**

#### ➤ Publier un nouveau thème
```yaml
post:
  summary: Publie un nouveau thème
  requestBody:
    required: true
    content:
      application/json:
        schema:
          $ref: '#/components/schemas/Theme'
```
💡 **L'idée était de permettre aux utilisateurs de soumettre leurs propres thèmes de révision.** Cependant, le stockage et la validation des données ne sont pas encore gérés.

### 🔹 `/themes/{id}` - Gestion d'un thème spécifique

#### ➤ Récupérer un thème
```yaml
get:
  summary: Récupère un thème spécifique
  parameters:
    - name: id
      in: path
      required: true
      schema:
        type: string
```
💡 **Ce point permet d'afficher un thème précis en fonction de son ID.**

#### ➤ Supprimer un thème
```yaml
delete:
  summary: Supprime un thème spécifique
  parameters:
    - name: id
      in: path
      required: true
      schema:
        type: string
```
💡 **Prévu pour permettre la suppression d'un thème, mais non encore implémenté côté backend.**

## 📂 Schémas de données

### 🔹 `Theme` (Thème de révision)
```yaml
components:
  schemas:
    Theme:
      type: object
      required:
        - title
        - description
        - cards
      properties:
        id:
          type: string
        title:
          type: string
        description:
          type: string
        cards:
          type: array
          items:
            $ref: '#/components/schemas/Card'
```
💡 **L'idée était d'avoir des thèmes contenant plusieurs cartes.**

### 🔹 `Card` (Carte de révision)
```yaml
Card:
  type: object
  required:
    - question
    - answer
  properties:
    id:
      type: string
    question:
      type: string
    answer:
      type: string
```
💡 **Ce modèle devait servir à structurer les cartes de révision.**

## 🚧 Ce qu'il reste à faire
✅ Compléter l'intégration de l'API avec le frontend.  
✅ Définir où et comment seront stockées les données des thèmes.  
✅ Implémenter un backend pour gérer réellement les requêtes.  
✅ Sécuriser l'API avec une authentification.  

---

🔍 **Conclusion**
Ce fichier YAML pose les bases de l'API, mais il reste du travail pour la rendre fonctionnelle. L'ajout d'un backend et d'une gestion des données est indispensable pour finaliser cette partie du projet.

---
---

## 📂 Settings.tsx

### Présentation
Ce fichier gère l'affichage et la gestion des paramètres de l'application, permettant à l'utilisateur de configurer les notifications, les paramètres de révision et le mode d'affichage (sombre ou clair).

### Fonctionnalités prévues
- Configuration des horaires et de la fréquence des notifications.
- Paramétrage des intervalles de répétition espacée et du nombre maximum de niveaux.
- Activation/désactivation du mode sombre pour l'interface de l'application.
- Sauvegarde des paramètres dans le `localStorage` pour les conserver après un rafraîchissement de la page.

### Implémentation actuelle
Le code met en place les éléments suivants :
- La gestion des paramètres de notification (heure et fréquence).
- La configuration des paramètres de révision, y compris le temps de base et le nombre maximum de niveaux.
- La gestion du mode sombre via un état local et un effet de mise à jour de l'interface.

### Explication du Code
```tsx
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

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });
```
- Utilisation des hooks `useState` pour stocker et gérer les paramètres de notification, de révision et le mode sombre.
- Les paramètres sont initialisés à partir du `localStorage` s'ils existent, permettant de conserver les configurations après un rafraîchissement de la page.

```tsx
useEffect(() => {
  const savedNotifTime = localStorage.getItem('notifTime');
  const savedNotifFrequency = localStorage.getItem('notifFrequency');

  if (savedNotifTime) setNotifTime(savedNotifTime);
  if (savedNotifFrequency) setNotifFrequency(savedNotifFrequency);
}, []);
```
- Cet effet `useEffect` charge les paramètres de notification sauvegardés dans le `localStorage` lors du premier rendu de la page.

```tsx
useEffect(() => {
  if (darkMode) {
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
  }
  localStorage.setItem('darkMode', JSON.stringify(darkMode));
}, [darkMode]);
```
- Cet effet `useEffect` applique ou retire la classe CSS `dark-mode` du `body` en fonction de l'état `darkMode`, permettant ainsi de basculer entre le mode sombre et clair.
- Le changement de mode est également sauvegardé dans le `localStorage`.

```tsx
const handleSave = () => {
  localStorage.setItem('notifTime', notifTime);
  localStorage.setItem('notifFrequency', notifFrequency);
  localStorage.setItem('baseInterval', String(baseInterval));
  localStorage.setItem('maxLevel', String(maxLevel));
  alert('Paramètres enregistrés!');
};
```
- La fonction `handleSave` permet de sauvegarder tous les paramètres dans le `localStorage` et affiche un message de confirmation.

```tsx
const handleToggleDarkMode = () => {
  setDarkMode(prev => !prev);
};
```
- La fonction `handleToggleDarkMode` permet de basculer entre le mode sombre et le mode clair.

```tsx
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
```
- Affichage de la page des paramètres avec des sections pour les notifications, la révision, le mode sombre, et des sections à venir pour l'apparence et autres options.
- Le bouton "Enregistrer" permet de sauvegarder les configurations actuelles.

### Améliorations possibles
- Ajouter des options supplémentaires de personnalisation (par exemple, le choix du thème, des notifications personnalisées par catégorie).
- Ajouter une fonctionnalité de réinitialisation des paramètres par défaut.
- Intégrer une validation des entrées pour garantir que les utilisateurs ne saisissent pas des valeurs incorrectes (par exemple, des intervalles négatifs ou des valeurs non entières).

---

---
-

# 📂 /components
-

# 📂 Themes.tsx

## Description

Le composant `Themes` gère l'affichage, l'édition et la suppression de thèmes, ainsi que l'ajout de cartes de révision. Il permet également la personnalisation de l'image de fond de chaque thème.

## 📜 Props

| Prop              | Type                              | Description |
|------------------|--------------------------------|-------------|
| `themes`        | `Theme[]`                      | Liste des thèmes affichés |
| `onUpdateThemes` | `(themes: Theme[]) => void`    | Fonction de mise à jour des thèmes |
| `onAddFlashcard` | `(themeId: number) => void`    | Fonction pour ajouter une carte dans un thème |

## 🎨 Interfaces

### `Card`
```ts
export interface Card {
  id: number;
  question: string;
  answer: string;
  interval: number;
  nextReviewTime: number;
}
```

### `Theme`
```ts
export interface Theme {
  id: number;
  name: string;
  description: string;
  cards: Card[];
  backgroundImage?: string;
}
```

## 📌 Fonctionnalités

- **Affichage des thèmes** avec leur titre, description et image de fond.
- **Édition d'un thème** (nom et description).
- **Suppression d'un thème**.
- **Ajout de cartes** dans un thème.
- **Personnalisation de l'image de fond** via un bouton dédié.

## 📜 Gestion des Actions

### 🎨 Changer le fond d'un thème
Lorsqu'un utilisateur clique sur "Personnaliser", il peut uploader une image qui remplacera l'image par défaut du thème.

### 🗑️ Suppression d'un thème
La fonction `handleThemeDelete` filtre la liste des thèmes pour en supprimer un spécifique.

### 📝 Édition d'un thème
Lorsqu'un utilisateur clique sur "Éditer", il peut modifier le nom et la description d'un thème.

### ➕ Ajouter une carte
Un bouton "Ajouter une carte" permet d'ajouter une carte de révision dans un thème spécifique.

## 🛠️ Exemple d'utilisation
```tsx
<Themes 
  themes={themes} 
  onUpdateThemes={setThemes} 
  onAddFlashcard={handleAddFlashcard} 
/>
```
---
---
# 📂 Header.tsx

## Description
Le composant `Header` gère l'affichage de l'en-tête de l'application, incluant la navigation et les notifications de révision des cartes.

## Fonctionnalités principales
- Affichage du titre de l'application et menu de navigation.
- Gestion des notifications de cartes à réviser.
- Planification des notifications basées sur une heure et une fréquence définies par l'utilisateur.
- Enregistrement des paramètres de notification dans `localStorage`.
- Gestion de l'affichage et de la fermeture des notifications et du menu.

## Structure du Code

### Importations
- `useState` et `useEffect` pour gérer l'état et les effets secondaires.
- `Link` de `react-router-dom` pour la navigation.
- `Header.css` pour le style.

### États
- `isNavOpen` : Indique si le menu est ouvert.
- `isNotificationOpen` : Indique si la fenêtre de notifications est ouverte.
- `cardsToReview` : Stocke les cartes à réviser regroupées par catégorie.
- `notificationTime` : Heure de notification (stockée en localStorage).
- `notificationFrequency` : Fréquence de notification (stockée en localStorage).

### Fonctions principales

#### Récupération des cartes à réviser
```tsx
const getCardsToReview = () => {
  const storedData = localStorage.getItem('cards');
  if (!storedData) return;

  const cards = JSON.parse(storedData) as {
    id: string;
    category: string;
    nextReviewTime: number;
  }[];

  const now = Date.now();
  const cardsToReview = cards.filter(
    (card) => card.nextReviewTime <= now
  );

  const groupedByCategory = cardsToReview.reduce(
    (acc: Record<string, number>, card) => {
      acc[card.category] = (acc[card.category] || 0) + 1;
      return acc;
    },
    {}
  );

  const groupedData = Object.entries(groupedByCategory).map(
    ([category, count]) => ({ category, count })
  );

  setCardsToReview(groupedData);
};
```

#### Planification des notifications
```tsx
const scheduleNotification = () => {
  const [hours, minutes] = notificationTime.split(':').map(Number);
  const now = new Date();
  const targetTime = new Date();
  targetTime.setHours(hours, minutes, 0, 0);

  if (now > targetTime) {
    targetTime.setDate(targetTime.getDate() + 1);
  }

  const timeUntilNextNotification = targetTime.getTime() - now.getTime();

  setTimeout(() => {
    getCardsToReview();
    if (Notification.permission === 'granted') {
      const totalCards = cardsToReview.reduce((total, item) => total + item.count, 0);
      if (totalCards > 0) {
        new Notification('Révision de cartes', {
          body: `Vous avez ${totalCards} carte(s) à réviser.`,
        });
      }
    }
    setTimeout(scheduleNotification, notificationFrequency * 24 * 60 * 60 * 1000);
  }, timeUntilNextNotification);
};
```

#### Enregistrement des paramètres de notification
```tsx
const handleSaveSettings = () => {
  localStorage.setItem('notificationTime', notificationTime);
  localStorage.setItem('notificationFrequency', String(notificationFrequency));
  scheduleNotification();
  alert('Paramètres enregistrés !');
};
```

### Utilisation des Hooks
- `useEffect` est utilisé pour récupérer les cartes à réviser et programmer les notifications dès le chargement du composant.
- `useEffect` est également utilisé pour gérer la fermeture du menu notifications lorsqu'on clique en dehors.

### Interface utilisateur
- Bouton de notification affichant le nombre de cartes à réviser.
- Menu déroulant avec liste des cartes à réviser.
- Formulaire permettant de configurer l'heure et la fréquence des notifications.
- Menu de navigation accessible via un bouton burger.

## Conclusion
Le composant `Header` est essentiel pour la navigation et la gestion des révisions dans le projet Memory. Il s'appuie sur `localStorage` pour stocker les paramètres utilisateur et utilise les notifications natives pour rappeler les révisions.

---
---

# 📂 Cards.tsx

## Description
Le composant `Cards` gère l'affichage des cartes de révision avec un système de répétition espacée, permettant à l'utilisateur de réviser des cartes avec des questions et réponses. Il prend également en charge l'ajout de médias (image, vidéo, audio) aux cartes et gère l'interaction utilisateur pour valider ou supprimer des cartes.

## Fonctionnalités principales
- Affichage des cartes à réviser basées sur la date de révision suivante (`nextReviewTime`).
- Gestion des réponses utilisateur et mise à jour de l'intervalle de révision en fonction de la bonne réponse (répétition espacée).
- Réinitialisation des cartes en cas de mauvaise réponse.
- Ajout de médias (image, vidéo, audio) à chaque carte.
- Suppression des cartes.
- Stockage des cartes et des mises à jour dans `localStorage` pour persistance des données.

## Structure du Code

### Importations
- `useState` et `useEffect` pour gérer l'état local et les effets secondaires.
- `Cards.css` pour les styles du composant.

### États
- `flipped` : Indique si la carte est retournée ou non.
- `userAnswers` : Stocke les réponses de l'utilisateur par carte.
- `activeCards` : Liste des cartes actives à réviser (celles qui doivent être révisées).
- `isAddingMedia` : Indique si l'utilisateur est en train d'ajouter un média à la carte.

### Fonctions principales

#### Récupération des cartes à réviser
```tsx
useEffect(() => {
  const filteredCards = cards.filter(card => card.nextReviewTime <= Date.now());
  setActiveCards(filteredCards);
}, [cards]);
```
Cette fonction filtre les cartes dont la `nextReviewTime` est inférieure ou égale à l'heure actuelle pour afficher uniquement les cartes à réviser.

#### Validation de la réponse de l'utilisateur
```tsx
const handleReview = (id: number) => {
  const userAnswer = userAnswers[id] ? userAnswers[id].trim().toLowerCase() : '';
  const card = cards.find(c => c.id === id);
  if (!card) return;

  const correctAnswer = card.answer.trim().toLowerCase();
  if (userAnswer === correctAnswer) {
    // Mise à jour de l'intervalle et de la prochaine révision
  } else {
    // Réinitialisation de la carte
  }
};
```
Cette fonction valide la réponse donnée par l'utilisateur et met à jour l'intervalle de révision en fonction de la bonne ou mauvaise réponse.

#### Ajout de médias à une carte
```tsx
const handleAddMedia = (id: number, mediaFile: File, mediaType: 'image' | 'video' | 'audio') => {
  const reader = new FileReader();
  reader.onload = () => {
    const result = reader.result as string;
    const updatedCard = { ...cards.find(c => c.id === id)!, mediaUrl: result, mediaType };
    // Mise à jour des cartes dans localStorage et appel de la fonction onUpdateCards
  };
  reader.readAsDataURL(mediaFile);
};
```
Cette fonction permet à l'utilisateur d'ajouter un média à la carte en sélectionnant un fichier depuis son appareil.

#### Suppression d'une carte
```tsx
const handleDelete = (id: number) => {
  const updatedCards = cards.filter(card => card.id !== id);
  // Mise à jour des cartes dans localStorage et appel de la fonction onUpdateCards
};
```
Cette fonction permet à l'utilisateur de supprimer une carte de révision.

### Utilisation des Hooks
- `useEffect` est utilisé pour filtrer et afficher les cartes à réviser à chaque changement de l'état des cartes.
- `useState` est utilisé pour gérer l'état des cartes, des réponses, et des médias.

### Interface utilisateur
- Les cartes sont affichées avec une question et une zone pour entrer la réponse.
- Des boutons permettent de valider la réponse, d'ajouter un média ou de supprimer la carte.
- Les cartes peuvent être retournées pour afficher la réponse et l'option de validation.

## Conclusion
Le composant `Cards` est essentiel pour gérer les révisions des cartes avec un système de répétition espacée. Il permet d'afficher les cartes, de gérer les réponses de l'utilisateur, d'ajouter des médias et de mettre à jour les cartes dans le stockage local pour persister les données même après un rafraîchissement de la page.


## 🏆 Auteur(s)
👤 **Matt**
