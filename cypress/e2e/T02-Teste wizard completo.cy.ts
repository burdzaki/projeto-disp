describe('Wizard completo - Teste de todos os passos do tutorial', () => {
  const wizardTitles = [
    'Bem-vindo(a)! Precisa de ajuda?',
    'Cálculo da Esbeltez',
    'Altura h (m)',
    'Dimensão d0 (m)',
    'Parâmetros para cálculo das velocidades de vento na estrutura',
    'Velocidade básica V0 (m/s)',
    'Fator topográfico S1',
    'Rugosidade do terreno',
    'Elevação Z (m)',
    'Fator estatístico S3',
    'Dimensão L (m)',
    'Frequência Natural da Estrutura Fn (Hz)',
    'Número de Strouhal (St)',
    'Gráfico Relação Fn x Vcr/Vest',
    'Agora é com você!',
  ];

  it('passa por todos os passos do wizard e valida os títulos', () => {
    cy.viewport(1200, 900);
    cy.visit('http://localhost:5173/');
    cy.reload();
    cy.get('#header-link-help').click();
    cy.get('#wizard').should('be.visible');

    wizardTitles.forEach((title, index) => {
      cy.get('#wizard__title').should('contain', title);
      if (index < wizardTitles.length - 1) {
        cy.get('#wizard__button--next').click();
      }
    });

    // Volta tudo com botão voltar até o início
    for (let i = wizardTitles.length - 1; i > 0; i--) {
      cy.get('#wizard__button--back').click();
      cy.get('#wizard__title').should('contain', wizardTitles[i - 1]);
    }

    // Fecha o wizard
    cy.get('body').type('{esc}');
    cy.get('#wizard').should('have.class', 'wizard--hidden');
  });
});