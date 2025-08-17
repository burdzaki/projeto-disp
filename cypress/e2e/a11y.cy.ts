import 'cypress-axe';

// spec
it('a11y: página inicial sem violações críticas', () => {
  cy.visit('http://localhost:4000/');
  cy.injectAxe();
  cy.checkA11y(undefined, { includedImpacts: ['critical','serious'] });
});