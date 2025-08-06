describe('Modal Sobre', () => {
  it('abre e fecha corretamente o modal Sobre', () => {
    cy.visit('http://localhost:5173/');

    // Abre o modal
    cy.get('#header-link-about-trigger').click();
    cy.get('#about-modal').should('be.visible');

    // Fecha o modal
    cy.get('#about-modal-close').click();
    cy.get('#about-modal').should('not.be.visible');
  });
});
