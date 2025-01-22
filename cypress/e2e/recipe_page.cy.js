describe('Recipe Details Page', () => {
  beforeEach(() => {
    cy.visit('/recipe/678e3a9ed6dea3f5af56ecf4')
  });

  it('should render recipe details correctly', () => {
    cy.get('[data-testid="recipe_img"]').should('have.attr', 'src', 'https://www.themealdb.com/images/media/meals/wrustq1511475474.jpg');
    cy.get('[data-testid="recipe_name"]').should('contain.text', 'Yaki Udon');
    cy.contains('45min').should('be.visible');
  });

  it('should handle favoriting a recipe', () => {
    cy.get('[data-testid="favButton"]').should('contain.text', 'Add to favorites');
    cy.get('[data-testid="favButton"]').click();
    cy.get('[data-testid="favButton"]').should('contain.text', 'Remove from favorites');
  });

  it('should render ingredients list', () => {
    cy.contains('Ingredients').should('be.visible');
    cy.contains('250g').should('be.visible');
    cy.contains('Udon Noodles').should('be.visible');
    cy.contains('Soy Sauce').should('be.visible');
  });

  it('should render instructions list', () => {
    cy.contains('Instructions').should('be.visible');
    cy.contains('Step 1').should('be.visible');
    cy.contains('Step 2').should('be.visible');
  });

  it('should render reviews', () => {
    cy.contains('Reviews').should('be.visible');
    cy.contains('Zappe Thomson').should('be.visible');
    cy.contains('Amazing recipe!').should('be.visible');
    cy.contains('22.01.2025').should('be.visible');
  });

  it('should allow posting a new review', () => {
    cy.get('[data-testid="rating_star_3"]').first().click();
    cy.get('#user-review').type('This was a fantastic recipe!');
    cy.get('button[type="submit"]').click();
    cy.contains('This was a fantastic recipe!').should('be.visible');
  });

  it('should allow rating without a review', () => {
    cy.get('#rating-only').check();
    cy.get('[data-testid="rating_star_3"]').first().click(); 
    cy.get('button[type="submit"]').click();
  });
});
