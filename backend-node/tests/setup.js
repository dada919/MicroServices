const mysql = require('mysql2/promise');
const { db } = require('./testConfig');

beforeAll(async () => {
  // Créer la base de test si elle n'existe pas
  const connection = await mysql.createConnection({
    host: db.host,
    user: db.user,
    password: db.password,
  });

  await connection.query(`CREATE DATABASE IF NOT EXISTS ${db.database}`);
  await connection.query(`USE ${db.database}`);
  
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
    host: db.host,
    user: db.user,
    password: db.password,
  });

  // Nettoyer la base de test
  await connection.query(`DROP DATABASE IF EXISTS ${db.database}`);
  await connection.end();
}); 