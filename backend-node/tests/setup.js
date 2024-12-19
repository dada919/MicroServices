const mysql = require('mysql2/promise');

const dbConfig = {
  host: 'localhost',
  user: 'myuser',
  password: 'admin1234',
  database: 'blogdb',
};

beforeAll(async () => {
  // Créer la base de test si elle n'existe pas
  const connection = await mysql.createConnection({
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
  });
  
  // Créer la base de données si elle n'existe pas
  await connection.query(`CREATE DATABASE IF NOT EXISTS ${dbConfig.database}`);

  // Utiliser la base de données
  await connection.query(`USE ${dbConfig.database}`);

  // Créer la table blogs
  await connection.query(`
    CREATE TABLE IF NOT EXISTS blog (
      id INT AUTO_INCREMENT PRIMARY KEY,
      titre VARCHAR(255) NOT NULL,
      description TEXT,
      image_url VARCHAR(255),
      pseudo VARCHAR(100) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await connection.end();
});

afterAll(async () => {
  const connection = await mysql.createConnection({
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
  });

  // Nettoyer la base de test
  await connection.query(`DROP DATABASE IF EXISTS ${dbConfig.database}`); // Optionnel : supprimer la base de données après les tests
  await connection.end();
}); 