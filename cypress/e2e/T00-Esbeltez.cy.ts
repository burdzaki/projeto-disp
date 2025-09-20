describe('Teste do Verificador de Dispensa', () => {
  it('carrega a página e calcula corretamente', () => {
    cy.visit('http://localhost:5173/')

    cy.get('#structure-height').type('69.75');
    cy.get('#dimension-d0').type('10.3');

    cy.wait(350);

    cy.get('.result-output__slenderness').should('contain', '6,772');
  });
});
