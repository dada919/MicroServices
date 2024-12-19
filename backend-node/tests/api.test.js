jest.setTimeout(30000); // 30 secondes de timeout

const request = require('supertest');
const app = require('../app'); // Assurez-vous que votre app Express est exportée

describe('Tests API Blog', () => {
  beforeEach(async () => {
    // Nettoyer la table avant chaque test
    const pool = require('../app').pool;
    await pool.query('DELETE FROM blog');
  });

  // Test GET /all-blogs
  test('GET /all-blogs devrait retourner tous les blogs', async () => {
    const response = await request(app).get('/all-blogs');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  // Test POST /blogs
  test('POST /blogs devrait créer un nouveau blog', async () => {
    const nouveauBlog = {
      titre: 'Test Blog',
      description: 'Description test',
      image_url: 'https://picsum.photos/seed/test/400/300',
      pseudo: 'Testeur'
    };

    const response = await request(app)
      .post('/blogs')
      .send(nouveauBlog);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

  // Test GET /blogs/:id
  test('GET /blogs/:id devrait retourner un blog spécifique', async () => {
    // D'abord créer un blog pour le tester
    const nouveauBlog = {
      titre: 'Test Blog',
      description: 'Description test',
      image_url: 'https://picsum.photos/seed/test/400/300',
      pseudo: 'Testeur'
    };

    const createResponse = await request(app)
      .post('/blogs')
      .send(nouveauBlog);

    const blogId = createResponse.body.id;

    const response = await request(app).get(`/blogs/${blogId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('id', blogId);
  });
}); 