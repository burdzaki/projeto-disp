describe('Tutorial Wizard', () => {
  it('abre o wizard e navega pelos passos', () => {
    cy.visit('http://localhost:5173/');

    // Abre o wizard
    cy.get('#header-link-help').click();
    cy.get('#wizard').should('be.visible');

    // Clica em avançar
    cy.get('#wizard__button--next').click();
    cy.get('#wizard__title').should('not.contain', 'Bem-vindo');

    // Clica em voltar
    cy.get('#wizard__button--back').click();
    cy.get('#wizard__title').should('contain', 'Bem-vindo');

    // Fecha o wizard
    cy.get('body').type('{esc}');
    cy.get('#wizard').should('have.class', 'wizard--hidden');
  });
});
