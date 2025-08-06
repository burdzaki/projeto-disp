describe('Verificador - Entrada completa e cálculo Vcr/Vest', () => {
  it('preenche todos os campos e calcula o resultado final', () => {
    cy.visit('http://localhost:5173/');

    // Esbeltez
    cy.get('#structure-height').type('69.75');
    cy.get('#dimension-d0').type('10.3');
    cy.wait(350); // debounce

    // Velocidade do vento (entrada manual)
    cy.get('#speed-V0').select('Digite um valor');
    cy.get('#speed-V0-user-input').should('be.visible').type('45');

    // Parâmetros adicionais
    cy.get('#topographic-factor-S1').type('1');
    cy.get('#structure-category').select('II');
    cy.get('#elevation-Z').type('30');
    cy.get('#statistical-factor-S3').type('1.06');

    // Dados para cálculo do número de Strouhal
    cy.get('#transversal-dimension-L').type('1.3');
    cy.get('#structure-frequency-Fn').type('1.85');
    cy.get('#strouhal-input').select('Digite um valor');
    cy.get('#strouhal-user-input').type('0.2');

    // Cálculo
    cy.get('.input__calculate--button').click();

    // Resultado final esperado (pode ajustar conforme seu programa)
    cy.get('.result__output__criteria').should(($el) => {
      const text = $el.text();
      expect(text).to.contain('dispensada');
    });
  });
});
