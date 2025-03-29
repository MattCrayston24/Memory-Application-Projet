export const publishTheme = async (theme: { name: string; description: string; cards: any[] }) => {
    const response = await fetch('http://localhost:3000/api/themes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(theme),
    });
    if (!response.ok) {
      throw new Error('Erreur lors de la publication du thème');
    }
    return await response.json();  // Renvoie le thème créé
  };
  
  // API pour récupérer les thèmes partagés

  export const fetchThemes = async () => {
    const response = await fetch('http://localhost:3000/api/themes');
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des thèmes');
    }
    return await response.json();  
  };
  