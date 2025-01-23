describe('Category Page', () => {
  beforeEach(() => {
    cy.visit('/recipes/category/Dessert'); 
  });

  it('should display the navbar', () => {
    cy.get('[data-testid="navbar"]').should('be.visible');
  });

  it('should render category page correctly', () => {
    cy.get('[data-testid="category_heading"]').should('contain.text', 'Dessert Recipes');
    cy.get('.bg-cover').should('have.css', 'background-image').and('include', 'url("https://res.cloudinary.com/drm5qsq0p/image/upload/v1736524856/xu1fx1cidtkt8jdakpgd.jpg")');
    cy.get('[data-testid="search_results"]').should('be.visible');
  });

  it('should display recipes fetched from the API', () => {
    cy.get('[data-testid="search_results"]')
      .children()
      .should('have.length.greaterThan', 0);

    cy.get('[data-testid="search_results"]')
      .children()
      .first()
      .within(() => {
        cy.get('img').should('have.attr', 'src').and('include', 'https://www.themealdb.com/images/media/meals/wxywrq1468235067.jpg');
        cy.get('span').should('contain.text', 'Apple Frangipan Tart'); 
      });
  });

  it('should filter recipes based on user selection', () => {
    cy.get('#tag-Chocolate').check();
    cy.get('[data-testid="search_results"]').contains('Rocky Road Fudge')
    cy.get('#time-quick').check();
    cy.get('[data-testid="search_results"]').contains('No results matching the filter selection').should('be.visible')

    cy.contains('Reset filter').click();
    cy.get('[data-testid="search_results"]')
      .children()
      .should('have.length.greaterThan', 0);

  });

  it('should sort recipes based on user selection', () => {
    cy.get('[data-testid="sort_select"]').select('A-Z');
    cy.get('[data-testid="search_results"]')
      .children()
      .should(($recipes) => {
        const recipeNames = [...$recipes].map((el) => el.querySelector('span').textContent);
        const expectedNames = [...recipeNames].sort(); 
        expect(recipeNames).to.deep.equal(expectedNames); 
      });
  
    cy.get('[data-testid="sort_select"]').select('Z-A'); 
    cy.get('[data-testid="search_results"]')
      .children()
      .should(($recipes) => {
        const recipeNames = [...$recipes].map((el) => el.querySelector('span').textContent);
        const expectedNames = [...recipeNames].sort().reverse(); 
        expect(recipeNames).to.deep.equal(expectedNames);
      });
  });
});
