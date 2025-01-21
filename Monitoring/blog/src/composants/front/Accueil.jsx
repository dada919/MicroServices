import React, { useState, useEffect } from 'react';

const Accueil = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/all-blogs`)
      .then(response => response.json())
      .then(data => setBlogs(data))
      .catch(error => console.error('Erreur lors de la récupération des blogs', error));
  }, []);

  return (
    <div className="accueil-container">
        <h1>Liste des Blogs</h1>
        {blogs.map(blog => (
            <div key={blog.id} className="blog-card">
                <div className="texte">
                    <strong>{blog.titre}</strong>
                    <p>{blog.description}</p>
                    {blog.image_url && <img src={blog.image_url} alt={`Image pour ${blog.titre}`} />}
                </div>
            </div>
        ))}
    </div>
);
}

export default Accueil;