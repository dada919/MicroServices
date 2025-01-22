   describe('Test d\'ajout d\'un blog', () => {
    it('Charger la page d\'accueil et afficher le titre', () => {
        cy.visit('http://localhost:5100');

        cy.contains('Liste des Blogs');
    });

    it('Afficher la liste des blogs', () => {
      cy.visit('http://localhost:5100');

      cy.get('.blog-card').should('have.length.greaterThan', 0);

      cy.get('.blog-card').each(($el) => {
          cy.wrap($el).find('strong').should('exist');
          cy.wrap($el).find('p').should('exist');
      });
  });

    it('Ajouter un nouveau blog', () => {
      cy.visit('http://localhost:5100');

      cy.contains('Ajouter un Blog').click();

      cy.get('input[type="text"]').first().type('Blog de test');
      cy.get('textarea').type('Description blog de test.');
      cy.get('input[type="text"]').eq(1).type('https://media.tenor.com/2roX3uxz_68AAAAM/cat-space.gif');
      cy.get('input[type="text"]').last().type('Auteur test');

      cy.contains('Ajouter le Blog').click();

      cy.contains('Blog ajouté avec succès');
  });

  it('Supprimer le blog nouvellement créé', () => {
    cy.visit('http://localhost:5100');

    cy.contains('Gérer les Blogs').click();

    cy.contains('Blog de test');

    cy.contains('Blog de test').parents('.blog-item').find('button').click();

    cy.contains('Confirmez la suppression de ce blog ?').should('be.visible');

    cy.contains('Oui').click();

    cy.contains('Blog de test').should('not.exist');
  });
});