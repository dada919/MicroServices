require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
app.use(express.json());
app.use(cors());

// Swagger configuration
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Blog',
            version: '1.0.0',
            description: 'Documentation de l\'API pour gérer les blogs',
        },
        servers: [
            {
                url: 'http://localhost:3001', // Remplacez par l'URL de votre serveur
            },
        ],
    },
    apis: ['./app.js'], // Chemin vers ce fichier pour documenter les routes
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * @swagger
 * components:
 *   schemas:
 *     Blog:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Identifiant unique du blog (AUTO_INCREMENT, PRIMARY KEY)
 *         titre:
 *           type: string
 *           description: Titre du blog (NOT NULL)
 *         description:
 *           type: string
 *           description: Description du blog (NULLABLE)
 *         image_url:
 *           type: string
 *           description: URL de l'image associée au blog (NULLABLE)
 *         pseudo:
 *           type: string
 *           description: Pseudo de l'auteur du blog (NOT NULL)
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Date et heure de création du blog (DEFAULT CURRENT_TIMESTAMP)
 */

const dbConfig = process.env.NODE_ENV === 'test' 
  ? {
      host: 'localhost',
      user: 'myuser',
      password: 'admin1234',
      database: 'blogdb'
    }
  : {
      host: 'database',
      user: 'myuser',
      password: 'admin1234',
      database: 'blogdb'
    };

const pool = mysql.createPool(dbConfig);

function executeQuery(sql, params = []) {
    return new Promise((resolve, reject) => {
        pool.query(sql, params, (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results);
        });
    });
}

/**
 * @swagger
 * /test-db:
 *   get:
 *     summary: Vérifier la connexion à la base de données
 *     responses:
 *       200:
 *         description: Connexion réussie
 *       500:
 *         description: Erreur lors de la connexion à la base de données
 */
app.get('/test-db', async (req, res) => {
    try {
        await executeQuery('SELECT 1');
        res.send('Connexion à la base de données réussie !');
    } catch (err) {
        console.error(err);
        res.status(500).send('Erreur lors de la connexion à la base de données : ' + err.message);
    }
});

/**
 * @swagger
 * /all-blogs:
 *   get:
 *     summary: Récupérer tous les blogs
 *     responses:
 *       200:
 *         description: Une liste de blogs
 *       500:
 *         description: Erreur lors de la récupération des blogs
 */
app.get('/all-blogs', async (req, res) => {
    try {
        const results = await executeQuery('SELECT * FROM blog');
        res.json(results);
    } catch (err) {
        console.error(err);
        res.status(500).send('Erreur lors de la récupération des données : ' + err.message);
    }
});

/**
 * @swagger
 * /blogs:
 *   post:
 *     summary: Ajouter un nouveau blog
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Blog'
 *     responses:
 *       201:
 *         description: Blog ajouté avec succès
 *       500:
 *         description: Erreur lors de l'ajout du blog
 */
app.post('/blogs', async (req, res) => {
    try {
        const { titre, description, image_url, pseudo } = req.body;
        const query = 'INSERT INTO blog (titre, description, image_url, pseudo) VALUES (?, ?, ?, ?)';
        const results = await executeQuery(query, [titre, description, image_url, pseudo]);
        res.status(201).json({ id: results.insertId });
    } catch (err) {
        console.error(err);
        res.status(500).send('Erreur lors de l\'ajout de l\'entrée : ' + err.message);
    }
});

/**
 * @swagger
 * /blogs/{id}:
 *   get:
 *     summary: Récupérer un blog par ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du blog à récupérer
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Blog trouvé
 *       404:
 *         description: Aucun blog trouvé avec cet ID
 *       500:
 *         description: Erreur lors de la récupération du blog
 */
app.get('/blogs/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const query = 'SELECT * FROM blog WHERE id = ?';
        const results = await executeQuery(query, [id]);
        if (results.length === 0) {
            return res.status(404).send('Aucun blog trouvé avec cet ID.');
        }
        res.json(results[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Erreur lors de la récupération du blog : ' + err.message);
    }
});

/**
 * @swagger
 * /blogs/{id}:
 *   put:
 *     summary: Mettre à jour un blog par ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du blog à mettre à jour
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titre:
 *                 type: string
 *               description:
 *                 type: string
 *               image_url:
 *                 type: string
 *               pseudo:
 *                 type: string
 *     responses:
 *       200:
 *         description: Blog mis à jour avec succès
 *       404:
 *         description: Aucun blog trouvé avec cet ID
 *       500:
 *         description: Erreur lors de la mise à jour du blog
 */
app.put('/blogs/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { titre, description, image_url, pseudo } = req.body;
        const query = 'UPDATE blog SET titre = ?, description = ?, image_url = ?, pseudo = ? WHERE id = ?';
        await executeQuery(query, [titre, description, image_url, pseudo, id]);
        res.send('Blog mis à jour avec succès');
    } catch (err) {
        console.error(err);
        res.status(500).send('Erreur lors de la mise à jour du blog : ' + err.message);
    }
});

/**
 * @swagger
 * /blogs/{id}:
 *   delete:
 *     summary: Supprimer un blog par ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du blog à supprimer
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Blog supprimé avec succès
 *       404:
 *         description: Aucun blog trouvé avec cet ID
 *       500:
 *         description: Erreur lors de la suppression du blog
 */
app.delete('/blogs/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const query = 'DELETE FROM blog WHERE id = ?';
        const results = await executeQuery(query, [id]);
        if (results.affectedRows === 0) {
            return res.status(404).send('Aucune entrée trouvée avec cet ID.');
        }
        res.send(`Entrée avec l'ID ${id} a été supprimée.`);
    } catch (err) {
        console.error(err);
        res.status(500).send('Erreur lors de la suppression de l\'entrée : ' + err.message);
    }
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Erreur du serveur');
});

const PORT = 3001;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});

process.on('uncaughtException', (error) => {
    console.error('Erreur non capturée', error);
});

module.exports = app;

if (require.main === module) {
  app.listen(3001, () => {
    console.log('Serveur démarré sur http://localhost:3001');
  });
}
