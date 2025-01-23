describe('Profile Page Tests', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/user', {
      statusCode: 200,
      body: {
        firstname: 'Zappe',
        lastname: 'Thomson',
        favoriteRecipes: [
          {
            _id: '678e3a9ed6dea3f5af56e14e',
          },
          {
            _id: '678e3a9ed6dea3f5af56ecf4',
          },
        ],
        uploadedRecipes: [
          {
            _id: '6791fc44c1ad53afae2963e7',
          },
        ],
      },
    }).as('getUser');
    cy.visit('/profile'); 
  });

  it('should render the profile page correctly', () => {
    cy.get('h2').contains('My Profile').should('be.visible');
    cy.get('img[alt="Profilepicture"]').should('have.attr', 'src', 'profile_man.png');
    cy.get('div').contains('Zappe Thomson').should('be.visible');
    cy.get('button').contains('Upload Recipe').should('be.visible');
  });

  it('should display favorite recipes correctly', () => {
    cy.get('h2').contains('Favorite Recipes').should('be.visible');
    cy.get('[data-testid="fav_recipes"]')
      .children()
      .children()
      .should('have.length', 2)
      .and(($recipes) => {
        expect($recipes.eq(0).find('span').text()).to.equal('Chicken Alfredo Primavera');
        expect($recipes.eq(1).find('span').text()).to.equal('Yaki Udon');
      });
  });

  it('should display uploaded recipes correctly', () => {
    cy.get('h2').contains('Uploaded Recipes').should('be.visible');
    cy.get('[data-testid="search_results"]')
      .eq(1)
      .children()
      .should('have.length', 1)
      .and(($recipes) => {
        expect($recipes.eq(0).find('span').text()).to.equal('Something Souffle');
      });
  });

  it('should open and close the upload recipe popup', () => {
    cy.get('button').contains('Upload Recipe').click();
    cy.get('[data-testid="popup"]').should('be.visible'); 
    cy.get('[data-testid="popup"]').click('topLeft'); 
    cy.get('[data-testid="popup"]').should('not.exist'); 
  });

  it('should not close the popup when clicking inside the content', () => {
    cy.get('button').contains('Upload Recipe').click();
    cy.get('[data-testid="popup"]').should('be.visible');
    cy.get('[data-testid="popup"] > div').click();
    cy.get('[data-testid="popup"]').should('be.visible');
  })

  it('should navigate to the correct recipe page when clicking on a recipe', () => {
    cy.get('[data-testid="fav_recipes"]')
      .children()
      .children()
      .should('have.length', 2)
      .first()
      .click();
    cy.url().should('include', '/recipe/678e3a9ed6dea3f5af56e14e'); 
  });
});
