it('Mobile 360×640: sem overflow e botões visíveis', () => {
  cy.viewport(360, 640);
  cy.visit('http://localhost:5173/');
  cy.get('.input__calculate--button').should('be.visible');
  cy.get('body').should('not.have.css', 'overflow', 'hidden'); // salvo quando modal aberto
});