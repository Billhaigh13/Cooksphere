describe('Navbar', () => {
  beforeEach(() => {
    cy.visit('/'); 
  });

  it('should display the navbar', () => {
    cy.get('[data-testid="navbar"]').should('be.visible');
  });

  it('should navigate to the homepage when the logo is clicked', () => {
    cy.get('[data-testid="navbar_img"]').click();
    cy.url().should('eq', `${Cypress.config().baseUrl}`);
  });

  it('should navigate to the profile page if the user is logged in', () => {
    cy.intercept('POST', '/user/authenticate', {
      statusCode: 200,
      body: { email: "zappe.thomson@test.com", password: "Test123!" },
    });
    cy.reload();
    cy.get('header a[href="/profile"]').click();
    cy.url().should('include', '/profile');
  });
});
