describe('Modal Sobre', () => {
  it('abre e fecha corretamente o modal Sobre', () => {
    cy.visit('http://localhost:5173/');

    // Abre o modal
    cy.get('.header__link__about').click();
    cy.get('#about__modal').should('be.visible');

    // Fecha o modal
    cy.get('#about__modal-close').click();
    cy.get('#about__modal').should('not.be.visible');
  });
});
