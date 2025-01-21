# README pour Cypress

## Lancer le Projet Cypress

Pour exécuter les tests Cypress, suivez les étapes ci-dessous :

### 1. Accédez au répertoire Cypress

Ouvrez votre terminal et naviguez vers le répertoire où se trouve Cypress :

```bash
cd Cypress
```

### 2. Lancer Cypress

Une fois dans le répertoire, vous pouvez lancer Cypress avec la commande suivante :

```bash
npx cypress open
```

Cette commande ouvrira l'interface graphique de Cypress.

### 3. Exécuter les Tests

Dans l'interface de Cypress, cliquez sur le fichier de test que vous souhaitez exécuter (`blog.spec.js`). Cypress exécutera le test et affichera les résultats dans l'interface.

## Description des Tests

### Test du site

1. **Chargement de la Page** :
   - Vérifie que la page d'accueil se charge correctement et que le titre "Liste des Blogs" est visible.

2. **Affichage des Blogs** :
   - Vérifie que la liste des blogs est affichée et que chaque blog a un titre et une description.

3. **Ajout d'un Nouveau Blog** :
   - Simule l'ajout d'un nouveau blog en remplissant le formulaire avec un titre, une description, une URL d'image et un pseudo.
   - Vérifie que le message de succès "Blog ajouté avec succès" s'affiche après l'ajout.

4. **Suppression du Blog** :
   - Vérifie que le blog nouvellement créé peut être supprimé.
   - Simule le clic sur le bouton de suppression, confirme la suppression, et vérifie que le blog n'est plus visible sur la page.