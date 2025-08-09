describe('Persistência dos valores após cálculo', () => {
  it('mantém valores e permite editar e recalcular', () => {
    cy.viewport(1280, 800);
    cy.visit('http://localhost:5173/');

    // Esbeltez
    cy.get('#structure-height').type('69.75');
    cy.get('#dimension-d0').type('10.3');
    cy.wait(350);

    // V0 manual
    cy.get('#speed-V0').select('Digite um valor');
    cy.get('#speed-V0-user-input').should('be.visible').type('45');

    // Demais parâmetros
    cy.get('#topographic-factor-S1').type('1');
    cy.get('#structure-category').select('IV');
    cy.get('#elevation-Z').type('30');
    cy.get('#statistical-factor-S3').type('1.00');

    // Crítica
    cy.get('#transversal-dimension-L').type('1.3');
    cy.get('#structure-frequency-Fn').type('1.85');
    cy.get('#strouhal-input').select('Digite um valor');
    cy.get('#strouhal-user-input').type('0.2');

    cy.get('.input__calculate--button').click();

    // Resultado apareceu
    cy.get('.result__output__criteria').should('not.be.empty');

    // Edita só a elevação e recalcula
    cy.get('#elevation-Z').clear().type('40');
    cy.get('.input__calculate--button').click();

    // Checa que os outros campos persistiram
    cy.get('#speed-V0-user-input').should('have.value', '45');
    cy.get('#structure-category').should('have.value', 'IV');
    cy.get('#strouhal-user-input').should('have.value', '0.2');
    cy.get('.result__output__criteria').should('not.be.empty');
  });
});
