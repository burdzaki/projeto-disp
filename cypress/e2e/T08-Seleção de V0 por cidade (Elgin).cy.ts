describe('Seleção de V0 por cidade (Elgin)', () => {
  it('exibe selects de estado/cidade e preenche velocidade', () => {
    cy.viewport(1280, 800);
    cy.visit('http://localhost:5173/');

    cy.get('#speed-V0').select('Pesquise a cidade');

    // Estado aparece e tem opções
    cy.get('#speed-V0-standard-value__state-select')
      .should('be.visible')
      .find('option').its('length').should('be.gt', 1)
      .then(() => {
        // Seleciona a 1ª opção válida (índice 1)
        cy.get('#speed-V0-standard-value__state-select').find('option').eq(1).then($opt => {
          cy.get('#speed-V0-standard-value__state-select').select($opt.val() as string);
        });
      });

    // Cidade aparece e tem opções
    cy.get('#speed-V0-standard-value__city-select')
      .should('be.visible')
      .find('option').its('length').should('be.gt', 1)
      .then(() => {
        cy.get('#speed-V0-standard-value__city-select').find('option').eq(1).then($opt => {
          cy.get('#speed-V0-standard-value__city-select').select($opt.val() as string);
        });
      });

    // Velocidade preenchida
    cy.get('#speed-V0-standard-value')
      .should('be.visible')
      .invoke('val')
      .then(val => {
        expect(String(val)).to.match(/^\d+(\.\d+)?$/);
      });
  });
});
