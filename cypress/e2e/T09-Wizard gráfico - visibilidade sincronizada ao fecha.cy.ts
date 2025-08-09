describe('Wizard gráfico - visibilidade sincronizada ao fechar', () => {
  it('mostra no passo 13; esconde ao fechar se não houver resultado; mantém se houver', () => {
    cy.viewport(1280, 1000);
    cy.visit('http://localhost:5173/');

    // Sem resultado: gráfico deve estar escondido
    cy.get('.result__graphic').should('have.css', 'display', 'none');

    // Abre wizard e vai ao passo 13 (gráfico)
    cy.get('#header-link-help').click();
    for (let i = 0; i < 13; i++) cy.get('#wizard__button--next').click();
    cy.get('.result__graphic').should('have.css', 'display', 'block');

    // Fecha wizard -> sem resultado, deve voltar a esconder
    cy.get('#wizard__button--close').click();
    cy.get('.result__graphic').should('have.css', 'display', 'none');

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

    // Abre wizard -> passo 13 -> visível
    cy.get('#header-link-help').click();
    for (let i = 0; i < 13; i++) cy.get('#wizard__button--next').click();
    cy.get('.result__graphic').should('have.css', 'display', 'block');

    // Fecha wizard -> com resultado, deve continuar visível
    cy.get('#wizard__button--close').click();
    cy.get('.result__graphic').should('have.css', 'display', 'block');
  });
});