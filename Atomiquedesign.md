# 📂 Documentation Atomic Design

Ce document décrit l'implémentation des composants `Themes.tsx`, `Header.tsx` et `Cards.tsx` en suivant la méthodologie **Atomic Design**.

## ⚛️ Atomic Design

L'Atomic Design divise l'interface en **cinq niveaux** :  
1. **Atomes** : Composants les plus basiques (boutons, icônes, inputs…).  
2. **Molécules** : Assemblage de plusieurs atomes pour former une unité fonctionnelle.  
3. **Organismes** : Groupes de molécules créant des sections complètes d'interface.  
4. **Templates** : Mise en page générique définissant la structure.  
5. **Pages** : Implémentation finale avec du contenu dynamique.  

---

## 📂 `Themes.tsx` – Organisme

### 📝 Description  
Le composant **`Themes`** gère l'affichage, l'édition et la suppression de thèmes ainsi que l'ajout de cartes de révision. Il permet aussi la personnalisation des images de fond des thèmes.

### 📜 Props  
| Prop              | Type                              | Description |
|------------------|--------------------------------|-------------|
| `themes`        | `Theme[]`                      | Liste des thèmes |
| `onUpdateThemes` | `(themes: Theme[]) => void`    | Fonction de mise à jour |
| `onAddFlashcard` | `(themeId: number) => void`    | Ajout d'une carte |

### 🎨 Interfaces

#### `Card` (Atome)
```ts
export interface Card {
  id: number;
  question: string;
  answer: string;
  interval: number;
  nextReviewTime: number;
}
```

#### `Theme` (Molécule)
```ts
export interface Theme {
  id: number;
  name: string;
  description: string;
  cards: Card[];
  backgroundImage?: string;
}
```

### 🚀 Fonctionnalités
- **Affichage** des thèmes avec titre, description et image.
- **Édition** du nom et de la description.
- **Suppression** d'un thème.
- **Ajout** de cartes.
- **Personnalisation** de l'image de fond.

---

## 📂 `Header.tsx` – Organisme

### 📝 Description  
Le composant **`Header`** affiche l'en-tête de l'application, incluant la navigation et les notifications de révision.

### 📌 Fonctionnalités
- Affichage du **titre** et de la **navigation**.
- Gestion des **notifications**.
- Planification des **rappels** en fonction des réglages utilisateur.

### 🎯 Gestion des Notifications (Molécule)
```tsx
const scheduleNotification = () => {
  setTimeout(() => {
    new Notification('Révision de cartes', {
      body: `Vous avez ${totalCards} carte(s) à réviser.`,
    });
  }, timeUntilNextNotification);
};
```

### 🎨 Stockage des Paramètres (Molécule)
```tsx
const handleSaveSettings = () => {
  localStorage.setItem('notificationTime', notificationTime);
  localStorage.setItem('notificationFrequency', String(notificationFrequency));
};
```

---

## 📂 `Cards.tsx` – Organisme

### 📝 Description  
Le composant **`Cards`** gère l'affichage et l'interaction avec les cartes de révision.

### 📌 Fonctionnalités
- Affichage des **cartes à réviser**.
- Gestion de la **validation des réponses**.
- Ajout de **médias (audio, vidéo, images)**.
- **Suppression** des cartes.

### 🎨 Vérification de la Réponse (Molécule)
```tsx
const handleReview = (id: number) => {
  const userAnswer = userAnswers[id].trim().toLowerCase();
  if (userAnswer === card.answer.trim().toLowerCase()) {
    // Mise à jour de l'intervalle de révision
  }
};
```

### 🎨 Ajout de Médias (Molécule)
```tsx
const handleAddMedia = (id: number, mediaFile: File, mediaType: 'image' | 'video' | 'audio') => {
  const reader = new FileReader();
  reader.onload = () => {
    // Mise à jour de la carte avec le média
  };
  reader.readAsDataURL(mediaFile);
};
```

---

## 🎯 Conclusion  
Chaque composant suit l'architecture **Atomic Design**, permettant une meilleure réutilisation et évolutivité du code.  

📌 Les **Atomes** (inputs, boutons) sont combinés en **Molécules** (formulaires, cartes), elles-mêmes assemblées en **Organismes** (Header, Themes, Cards).

---


## 📂 **Settings.tsx** – Organisme

## 🧬 **Atoms** (Composants de base)
1. **Button**  
   - **Description** : Un bouton permettant de basculer entre le mode sombre et clair ou d'enregistrer les paramètres.
   - **Props** :
     - `className`: Classe CSS appliquée au bouton.
     - `onClick`: Fonction exécutée lors du clic.
     - `children`: Texte du bouton.
   - **Exemple d'utilisation** :
     ```tsx
     <button className="toggle-dark-btn" onClick={handleToggleDarkMode}>Passer en mode sombre</button>
     ```

2. **Input**  
   - **Description** : Champ de saisie pour les paramètres (intervalle de révision, niveau maximum).
   - **Props** :
     - `type`: Type d'entrée (par exemple, `number`).
     - `value`: Valeur actuelle de l'input.
     - `onChange`: Fonction exécutée lors de la modification de la valeur.
     - `min`: Valeur minimale autorisée.
   - **Exemple d'utilisation** :
     ```tsx
     <input
       type="number"
       value={baseInterval}
       onChange={(e) => setBaseInterval(Number(e.target.value))}
       min="1"
     />
     ```

## 🧬 **Molecules** (Composants combinés)
1. **SettingItem**  
   - **Description** : Un composant regroupant un label et un champ de saisie.
   - **Props** :
     - `label`: Texte du label associé au champ de saisie.
     - `input`: Le champ de saisie à afficher (composant `<input>`).
   - **Exemple d'utilisation** :
     ```tsx
     <div className="setting-item">
       <label>Temps de base (en jours) :</label>
       <input
         type="number"
         value={baseInterval}
         onChange={(e) => setBaseInterval(Number(e.target.value))}
         min="1"
       />
     </div>
     ```

## 🧬 **Organisms** (Composants plus complexes)
1. **SettingsForm**  
   - **Description** : Formulaire regroupant toutes les sections de paramètres de l'application (Notifications, Révision, Mode Sombre).
   - **Composants** :
     - **SettingSection** : Conteneur pour chaque section de paramètre.
     - **SettingItem** : Composant pour l'affichage des entrées de paramètre.
     - **Button** : Utilisé pour enregistrer ou activer/désactiver le mode sombre.
   - **Exemple d'utilisation** :
     ```tsx
     <main className="settings">
       <section className="setting-section">
         <h2>🔔 Notifications</h2>
         <SettingItem label="Temps de notification" input={<input type="time" />} />
       </section>
       <section className="setting-section">
         <h2>📅 Révision</h2>
         <SettingItem label="Intervalle de révision" input={<input type="number" />} />
       </section>
       <button className="save-btn" onClick={handleSave}>💾 Enregistrer</button>
     </main>
     ```

---

## 📂 **openapi.yaml** – Organisme

## 🧬 **Atoms** (Composants de base)
1. **Parameter**  
   - **Description** : Définition d'un paramètre pour un endpoint.
   - **Exemple d'utilisation** :
     ```yaml
     parameters:
       - name: id
         in: path
         required: true
         schema:
           type: string
     ```

2. **Response**  
   - **Description** : Description d'une réponse possible pour un endpoint.
   - **Exemple d'utilisation** :
     ```yaml
     responses:
       '200':
         description: Liste des thèmes récupérée avec succès
     ```

3. **RequestBody**  
   - **Description** : Définition du corps de la requête pour un endpoint avec des données JSON.
   - **Exemple d'utilisation** :
     ```yaml
     requestBody:
       required: true
       content:
         application/json:
           schema:
             $ref: '#/components/schemas/Theme'
     ```

## 🧬 **Molecules** (Composants combinés)
1. **Endpoint**  
   - **Description** : Regroupe un ensemble de méthodes HTTP pour un même chemin (GET, POST, DELETE, etc.).
   - **Exemple d'utilisation** :
     ```yaml
     /themes:
       get:
         summary: Récupère la liste des thèmes publiés
         responses:
           '200':
             description: Liste des thèmes récupérée avec succès
       post:
         summary: Publie un nouveau thème
         requestBody:
           required: true
           content:
             application/json:
               schema:
                 $ref: '#/components/schemas/Theme'
     ```

2. **Schema Definition**  
   - **Description** : Définitions des schémas de données utilisés dans l'API (par exemple, un "Theme").
   - **Exemple d'utilisation** :
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

## 🧬 **Organisms** (Composants plus complexes)
1. **API Specification**  
   - **Description** : Structure principale qui organise tous les endpoints, schémas, et serveurs.
   - **Exemple d'utilisation** :
     ```yaml
     openapi: 3.0.0
     info:
       title: API de Memory
       description: API pour gérer les thèmes de révision.
       version: 1.0.0
     servers:
       - url: https://memory-app.com/api
         description: Serveur de production
     paths:
       /themes:
         get:
           summary: Récupère la liste des thèmes publiés
           responses:
             '200':
               description: Liste des thèmes récupérée avec succès
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

---

## 🔨 **Refinements et Optimisations**

### Pour `Settings.tsx` :
- Ajout de validation pour les champs numériques (empêcher des valeurs non valides comme des intervalles négatifs).
- Fonction de réinitialisation des paramètres par défaut.
- Amélioration de l'interface utilisateur pour rendre les informations plus claires.

### Pour `openapi.yaml` :
- Ajout de la gestion des erreurs pour les réponses API.
- Sécurisation des endpoints avec un système d'authentification (ex: OAuth 2.0).
- Implémentation de tests pour valider le bon fonctionnement de l'API avant de la rendre publique.


## 📂 Home.tsx – Page d'accueil
🧬 Atoms
Section Hero

Description : Section qui accueille l'utilisateur avec un message d'introduction.

Composants :

### Titre : Contient le texte "Bienvenue sur Projet Memory".

Paragraphe : Explique brièvement le but de l'application.

### Exemple d'utilisation :

```tsx
<section className="hero">
  <h1>Bienvenue sur <span>Projet Memory</span> !</h1>
  <p>Optimise ta mémorisation avec la répétition espacée. Crée des cartes, révise efficacement et booste ta mémoire !</p>
</section>
```
Button (Explorer les catégories)

Description : Un bouton permettant à l'utilisateur de naviguer vers la section des catégories.

### Props :

to: Route vers laquelle le bouton redirige.

className: Classe CSS appliquée au bouton.

Exemple d'utilisation :

```tsx
<Link to="/categories" className="cta-button">Explorer les catégories</Link>
```
## 🧬 Molecules
### Feature Item

Description : Composant qui met en avant une fonctionnalité de l'application, avec un titre et une description.

## Props :

- icon: Icône représentant la fonctionnalité.
- title: Titre de la fonctionnalité.
- description: Description expliquant la fonctionnalité.

Exemple d'utilisation :

```tsx
<section className="features">
  <div className="feature">
    <h2>📚 Crée tes propres cartes</h2>
    <p>Personnalise tes révisions avec tes propres contenus.</p>
  </div>
</section>
```

## 🧬 Organisms
### Hero Section

Description : Section d'accueil avec une présentation du projet et un bouton pour explorer les catégories.

### Composants :

Section Hero : Contient le message d'introduction.

Button (Explorer les catégories) : Dirige l'utilisateur vers la page des catégories.

Features Section : Présente les fonctionnalités principales.

### Exemple d'utilisation :

```tsx
<main className="home-page">
  <section className="hero">
    <h1>Bienvenue sur Projet Memory</h1>
    <p>Optimise ta mémorisation avec la répétition espacée.</p>
  </section>
  <Link to="/categories" className="cta-button">Explorer les catégories</Link>
  <section className="features">
    <div className="feature">
      <h2>📚 Crée tes propres cartes</h2>
      <p>Personnalise tes révisions avec tes propres contenus.</p>
    </div>
  </section>
</main>
```
## 📂 Categories.tsx – Gestion des catégories et thèmes
### 🧬 Atoms
Button (Ajouter une catégorie)

Description : Un bouton permettant d'ajouter une nouvelle catégorie.

### Props :

onClick: Fonction exécutée lors du clic.

className: Classe CSS appliquée au bouton.

### Exemple d'utilisation :

```tsx
<button className="btn-add-category" onClick={handleAddCategory}>Ajouter une catégorie</button>
```
### Category Header

### Description : Section contenant le titre de la catégorie et les boutons d'action (éditer, supprimer).

### Props :

title: Titre de la catégorie.

onEdit: Fonction pour éditer la catégorie.

onDelete: Fonction pour supprimer la catégorie.

### Exemple d'utilisation :

```tsx
<div className="category-header">
  <h2>{cat.name}</h2>
  <button onClick={() => handleEditCategory(cat.id)}>Éditer</button>
  <button onClick={() => handleDeleteCategory(cat.id)}>Supprimer</button>
</div>
```
## 🧬 Molecules
### Category Item

### Description : Composant qui regroupe une catégorie avec ses informations et ses options.

### Props :

category: Données de la catégorie à afficher.

onEdit: Fonction pour éditer la catégorie.

onDelete: Fonction pour supprimer la catégorie.

onAddTheme: Fonction pour ajouter un thème à la catégorie.

### Exemple d'utilisation :

```tsx
<div className="category-item">
  <div className="category-header">
    <h2>{cat.name}</h2>
    <button onClick={() => handleEditCategory(cat.id)}>Éditer</button>
    <button onClick={() => handleDeleteCategory(cat.id)}>Supprimer</button>
  </div>
  <button onClick={() => handleAddTheme(cat.id)}>Ajouter un thème</button>
</div>
```
## 🧬 Organisms
### Categories Page

### Description : Page principale où l'utilisateur peut gérer les catégories et les thèmes associés.

### Composants :

### Category Item : Pour chaque catégorie, affiche le titre et les options.

Button (Ajouter une catégorie) : Permet d'ajouter une nouvelle catégorie.

### Exemple d'utilisation :

```tsx
<div className="categories-page">
  <h1>Catégories</h1>
  <button onClick={handleAddCategory}>Ajouter une catégorie</button>
  {categories.map(cat => (
    <CategoryItem
      key={cat.id}
      category={cat}
      onEdit={handleEditCategory}
      onDelete={handleDeleteCategory}
      onAddTheme={handleAddTheme}
    />
  ))}
</div>
```
## 📂 ThemesPage.tsx – Gestion des thèmes
### 🧬 Atoms
### Theme Item

### Description : Affiche les informations d'un thème, y compris le nom et la description.

### Props :

name: Nom du thème.

description: Description du thème.

### Exemple d'utilisation :

```tsx
<li key={theme.id} className="theme-item">
  <h3>{theme.name}</h3>
  <p>{theme.description}</p>
</li>
```
### Loading Spinner

### Description : Affiche un indicateur de chargement pendant que les thèmes sont récupérés.

### Props : Aucun.

### Exemple d'utilisation :

```tsx
{loading && <div className="loading-spinner">Chargement...</div>}
```
## 🧬 Molecules
### Theme List

### Description : Liste affichant tous les thèmes récupérés ou publiés.

### Props :

### themes: Liste des thèmes à afficher.

### Exemple d'utilisation :

```tsx
<ul className="themes-list">
  {themes.map((theme) => (
    <ThemeItem key={theme.id} name={theme.name} description={theme.description} />
  ))}
</ul>
```
## 🧬 Organisms
### Themes Page

### Description : Page permettant d'afficher, publier et importer des thèmes de révision.

### Composants :

### Theme List : Affiche tous les thèmes publiés.

### PublishTheme : Permet de publier un nouveau thème.

### ImportThemes : Permet d'importer des thèmes existants.

### Loading Spinner : Affiche un indicateur de chargement pendant la récupération des thèmes.

### Exemple d'utilisation :

```tsx
<div className="themes-page">
  <h1>🎨 Gestion des Thèmes</h1>
  <section className="publish-import-section">
    <PublishTheme onThemePublished={handleThemePublished} />
    <ImportThemes />
  </section>
  {loading && <div className="loading-spinner">Chargement des thèmes...</div>}
  {error && <p className="error-message">{error}</p>}
  <ul className="themes-list">
    {themes.map((theme) => (
      <ThemeItem key={theme.id} name={theme.name} description={theme.description} />
    ))}
  </ul>
</div>"
```
