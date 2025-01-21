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


## Routes de l'API Backend

### 1. `GET /test-db`
- **Description** : Vérifie la connexion à la base de données.
- **Réponse** : Renvoie un message de succès si la connexion est réussie, sinon renvoie une erreur.

### 2. `GET /all-blogs`
- **Description** : Récupère tous les blogs de la base de données.
- **Réponse** : Renvoie un tableau JSON contenant tous les blogs.

### 3. `POST /blogs`
- **Description** : Ajoute un nouveau blog à la base de données.
- **Paramètres** : 
  - `titre` : Titre du blog (obligatoire).
  - `description` : Description du blog (obligatoire).
  - `image_url` : URL de l'image associée au blog (facultatif).
  - `pseudo` : Pseudo de l'auteur du blog (obligatoire).
- **Réponse** : Renvoie l'ID du blog nouvellement créé.

### 4. `GET /blogs/:id`
- **Description** : Récupère un blog spécifique par son ID.
- **Paramètres** : 
  - `id` : ID du blog à récupérer (obligatoire).
- **Réponse** : Renvoie le blog correspondant sous forme d'objet JSON. Si aucun blog n'est trouvé, renvoie une erreur 404.

### 5. `PUT /blogs/:id`
- **Description** : Met à jour un blog existant par son ID.
- **Paramètres** : 
  - `id` : ID du blog à mettre à jour (obligatoire).
  - `titre` : Nouveau titre du blog (facultatif).
  - `description` : Nouvelle description du blog (facultatif).
  - `image_url` : Nouvelle URL de l'image (facultatif).
  - `pseudo` : Nouveau pseudo de l'auteur (facultatif).
- **Réponse** : Renvoie un message de succès si la mise à jour est réussie.

### 6. `DELETE /blogs/:id`
- **Description** : Supprime un blog spécifique par son ID.
- **Paramètres** : 
  - `id` : ID du blog à supprimer (obligatoire).
- **Réponse** : Renvoie un message de succès si la suppression est réussie. Si aucun blog n'est trouvé, renvoie une erreur 404.

### Gestion des Erreurs
- Toutes les routes incluent une gestion des erreurs qui renvoie un message d'erreur approprié en cas de problème lors de l'exécution de la requête.


## Structure de la Base de Données

### Table : `blog`

| Colonne      | Type                                   | Caractéristiques                                   |
|--------------|----------------------------------------|---------------------------------------------------|
| `id`         | INT                                    | AUTO_INCREMENT, PRIMARY KEY                        |
| `titre`      | VARCHAR(255)                          | NOT NULL                                          |
| `description`| TEXT                                   | NULLABLE                                          |
| `image_url`  | VARCHAR(255)                          | NULLABLE                                          |
| `pseudo`     | VARCHAR(100)                          | NOT NULL                                          |
| `created_at` | TIMESTAMP                             | DEFAULT CURRENT_TIMESTAMP                          |
