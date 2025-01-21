# Projet Monitoring

## Lancement du Projet

Pour lancer le projet, suivez les étapes ci-dessous :

1. **Accédez au répertoire du projet** :
   ```bash
   cd Monitoring
   ```

2. **Démarrez les conteneurs avec Docker Compose** :
   ```bash
   docker-compose up -d
   ```

## Ports Exposés

Une fois que les conteneurs sont en cours d'exécution, vous pouvez accéder aux différents services via les ports suivants :

- **Frontend** : [http://localhost:5100](http://localhost:5100)
- **Backend** : [http://localhost:3001](http://localhost:3001)
- **Base de données (MySQL)** : [http://localhost:3306](http://localhost:3306)
- **Portainer** : [http://localhost:9000](http://localhost:9000) (pour la gestion des conteneurs)
- **Weave Scope** : [http://localhost:4040](http://localhost:4040) (pour la visualisation des services)

