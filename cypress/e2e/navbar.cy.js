describe('Navigation Bar', () => {
  it('should allow navigation via the navbar', () => {
    cy.get('nav').contains('Profile').click();
    cy.url().should('include', '/profile');
    cy.go('back');
    cy.url().should('eq', Cypress.config().baseUrl + '/');
  });
})
