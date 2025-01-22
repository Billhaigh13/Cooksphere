describe('Navigation Bar', () => {
  it('should allow navigation via the navbar', () => {
    // Click on the "Profile" link and verify navigation
    cy.get('nav').contains('Profile').click();
  
    // Assert the URL changes to the profile page
    cy.url().should('include', '/profile');
  
    // Go back to the home page
    cy.go('back');
  
    // Assert the URL is back to the home page
    cy.url().should('eq', Cypress.config().baseUrl + '/');
  });
})
