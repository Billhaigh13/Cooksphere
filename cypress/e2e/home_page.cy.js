describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display the navbar', () => {
    cy.get('[data-testid="navbar"]').should('be.visible');
  });

  it('should display the search bar', () => {
    cy.get('input[type="text"]').should('be.visible');

    cy.get('input[type="text"]').should('have.attr', 'placeholder', 'Search recipe');
  });

  it('should display categories of recipes', () => {
    cy.get('[data-testid="category_list"]').should('be.visible');

    cy.get('[data-testid="category_list"]').contains('Dessert');
  });

  it('should display the latest recipes', () => {
    cy.get('[data-testid="latest_recipes"]').should('be.visible');

    cy.get('[data-testid="latest_recipes"]').contains('Yaki Udon');
  });

  it('should search for recipes', () => {
    cy.get('input[type="text"]').type('Pasta');
    cy.get('form').submit();
    cy.get('[data-testid="search_results"]')
      .should('exist')
      .and('contain.text', 'Pasta');
  });
});
