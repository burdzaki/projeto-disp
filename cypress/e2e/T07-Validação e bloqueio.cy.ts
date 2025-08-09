describe('Validações e mensagens de erro', () => {
  it('marca erro para valores inválidos e bloqueia o cálculo', () => {
    cy.viewport(1280, 800);
    cy.visit('http://localhost:5173/');

    // Valores inválidos
    cy.get('#structure-height').type('-5').blur();
    cy.get('#dimension-d0').type('0').blur();

    // Espera warnings/classe de erro
    cy.get('#structure-height').should('have.class', 'input__field--error');
    cy.get('#dimension-d0').should('have.class', 'input__field--error');

    // Tenta calcular com inputs inválidos
    cy.get('.input__calculate--button').click();

    // Não deve aparecer resultado
    cy.get('.result__output__criteria').should(($el) => {
      expect($el.text().trim()).to.eq('');
    });
  });
});
