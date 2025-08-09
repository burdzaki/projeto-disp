describe('Modal Termos e Condições', () => {
  it('abre e fecha corretamente os termos', () => {
    cy.visit('http://localhost:5173/');

    // Abre os termos
    cy.get('.footer__terms__trigger').click();
    cy.get('#footer-terms').should('be.visible');

    // Fecha os termos
    cy.get('body').type('{esc}');
    cy.get('#footer-terms').should('not.be.visible');
  });
});
