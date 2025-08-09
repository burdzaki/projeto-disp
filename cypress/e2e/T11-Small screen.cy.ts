describe('visibilidade telas pequenas', () => {
  it('ve se funciona', () => {
    cy.viewport(360, 780);
    cy.visit('http://localhost:5173/');

        // Agora gera um resultado mínimo
    cy.get('#structure-height').type('60');
    cy.get('#dimension-d0').type('10');
    cy.wait(350);
    cy.get('#speed-V0').select('Digite um valor');
    cy.get('#speed-V0-user-input').type('40');
    cy.get('#topographic-factor-S1').type('1');
    cy.get('#structure-category').select('IV');
    cy.get('#elevation-Z').type('20');
    cy.get('#statistical-factor-S3').type('1');
    cy.get('#transversal-dimension-L').type('1');
    cy.get('#structure-frequency-Fn').type('1');
    cy.get('#strouhal-input').select('Digite um valor');
    cy.get('#strouhal-user-input').type('0.2');
    cy.get('.input__calculate--button').click();

    cy.get('.input').should('have.css', 'flex-direction');
    cy.get('#result__graphic-chart').should('be.visible');
    cy.get('.result__graphic-button-wrap').should('be.visible');
    cy.get('.about__modal__container').should('have.css', 'width', '360px'); // aprox em mobile fullscreen

  });
});