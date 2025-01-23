/// <reference types="cypress" />

describe('Popup and Upload Form', () => {
  beforeEach(() => {
    cy.visit('/profile'); 
    cy.get('button').contains('Upload Recipe').click();
    cy.get('[data-testid="popup"]').should('be.visible'); 
  });

  it('should display validation errors for required fields', () => {
      cy.get('form').submit();
      cy.contains('Name is required.').should('be.visible');
      cy.contains('Ingredient-1 is required.').should('be.visible');
      cy.contains('Measure-1 is required.').should('be.visible');
      cy.contains('Instructions are required.').should('be.visible');
      cy.contains('Hours is required.').should('be.visible');
      cy.contains('Minutes is required.').should('be.visible');
      cy.contains('Category is required.').scrollIntoView().should('be.visible');
      cy.contains('Please select an image.').scrollIntoView().should('be.visible');
    });

    it('should allow adding ingredients and instructions', () => {
      cy.contains('Add ingredient').click();
      cy.contains('Add ingredient').click();
      cy.get('input[name^="ingredient-"]').should('have.length', 3);
      cy.get('input[name^="measure-"]').should('have.length', 3);
      cy.contains('Add instruction').click();
      cy.contains('Add instruction').click();
      cy.get('textarea[name^="instruction-"]').should('have.length', 3);
      cy.get('label[for="instruction-1"]').should('have.text', 'Step 1');
      cy.get('label[for="instruction-2"]').should('have.text', 'Step 2');
      cy.get('label[for="instruction-3"]').should('have.text', 'Step 3');
      cy.get('textarea#instruction-1').type('Preheat the oven.');
      cy.get('textarea#instruction-1').should('have.value', 'Preheat the oven.');
    });

    it('should handle file upload', () => {
      const fileName = 'test-image.jpg';
      cy.get('input[type="file"]').attachFile(fileName);
      cy.get('input[name="name"]').type('Test Recipe')
      cy.contains('Please select an image.').should('not.exist');
    });

    it('should submit the form successfully when all fields are filled', () => {
      cy.get('input[name="name"]').type('Test Recipe');
      cy.get('input[name="ingredient-1"]').type('Flour');
      cy.get('input[name="measure-1"]').type('1 cup');
      cy.get('textarea#instruction-1').type('Mix the ingredients.');
      cy.get('input[name="hours"]').type('1');
      cy.get('input[name="minutes"]').type('30');
      cy.get('select[name="category"]').select('Dessert');
      cy.get('input[name="tag-1"]').type('Easy');
      cy.get('input[name="tag-2"]').type('Quick');
      cy.get('input[name="tag-3"]').type('Tasty');
      const fileName = 'test-image.jpg'; 
      cy.get('input[type="file"]').attachFile(fileName);
      cy.get('form').submit();
      cy.contains('Recipe uploaded successfully').scrollIntoView().should('be.visible'); 
    });
  });
