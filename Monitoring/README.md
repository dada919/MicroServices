# Projet MicroServices

## Composants techniques de base (4 points)

1. **Frontend** : Votre projet contient un frontend avec au minimum deux routes.
2. **Backend** : Votre projet contient un backend avec une base de données dans un conteneur spécifique. Vous expliquerez le choix de votre technologie de base de données (relationnelles ou non relationnelles).
3. **Base de données** : Votre base de données est fonctionnelle et composée d’au moins une table/collection ainsi qu’un schéma explicite.
4. **Architecture Docker** :
   - Votre projet contient au moins 2 Dockerfiles et un fichier `docker-compose.yml`.
   - Votre projet contient un réseau Docker.
   - Vous avez poussé au moins 2 images Docker sur un registre de conteneurs (type Docker Hub).
   - Votre projet est accessible en ligne publiquement sur un gestionnaire de version (type GitHub, Bitbucket, GitLab…).

## Installation

1. Clonez le dépôt :
   ```bash
   git clone <url-du-repo>
   cd <nom-du-repo>
   ```

2. Installez les dépendances :
   - Pour le frontend :
     ```bash
     cd blog
     npm install
     ```

   - Pour le backend :
     ```bash
     cd backend-node
     npm install
     ```

## Lancement du projet

1. Démarrez les conteneurs Docker :
   ```bash
   docker-compose up
   ```

2. Accédez à l'application :
   - Frontend : [http://localhost:5100](http://localhost:5100)
   - Backend : [http://localhost:3001](http://localhost:3001)

## Tests

Pour exécuter les tests, utilisez la commande suivante dans le répertoire du backend :
```bash
npm test
```

## Contribuer

Les contributions sont les bienvenues ! Veuillez soumettre une demande de tirage (pull request) pour toute amélioration ou correction.

## License

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.