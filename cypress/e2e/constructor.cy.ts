describe('Burger Constructor', () => {
  beforeEach(() => {
    // Intercept API calls
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as('createOrder');
    
    // Visit the page
    cy.visit('/');
    
    // Wait for ingredients to load
    cy.wait('@getIngredients');
  });

  it('should add ingredients to constructor', () => {
    // Add bun
    cy.get('[data-testid="ingredient-bun"]').first().drag('[data-testid="constructor-bun-top"]');
    cy.get('[data-testid="constructor-bun-bottom"]').should('exist');

    // Add filling
    cy.get('[data-testid="ingredient-filling"]').first().drag('[data-testid="constructor-filling"]');
    cy.get('[data-testid="constructor-filling"]').children().should('have.length', 1);
  });

  it('should open and close ingredient modal', () => {
    // Click on ingredient to open modal
    cy.get('[data-testid="ingredient-item"]').first().click();
    
    // Check if modal is open
    cy.get('[data-testid="ingredient-modal"]').should('be.visible');
    
    // Close modal using close button
    cy.get('[data-testid="modal-close"]').click();
    cy.get('[data-testid="ingredient-modal"]').should('not.exist');
    
    // Open modal again
    cy.get('[data-testid="ingredient-item"]').first().click();
    
    // Close modal using overlay
    cy.get('[data-testid="modal-overlay"]').click({ force: true });
    cy.get('[data-testid="ingredient-modal"]').should('not.exist');
  });

  it('should create order successfully', () => {
    // Set auth tokens
    cy.window().then((win) => {
      win.localStorage.setItem('accessToken', 'fake-access-token');
      win.localStorage.setItem('refreshToken', 'fake-refresh-token');
    });

    // Add ingredients
    cy.get('[data-testid="ingredient-bun"]').first().drag('[data-testid="constructor-bun-top"]');
    cy.get('[data-testid="ingredient-filling"]').first().drag('[data-testid="constructor-filling"]');

    // Click order button
    cy.get('[data-testid="order-button"]').click();

    // Wait for order creation
    cy.wait('@createOrder');

    // Check if order modal is open with correct number
    cy.get('[data-testid="order-modal"]').should('be.visible');
    cy.get('[data-testid="order-number"]').should('contain', '12345');

    // Close modal
    cy.get('[data-testid="modal-close"]').click();
    cy.get('[data-testid="order-modal"]').should('not.exist');

    // Check if constructor is empty
    cy.get('[data-testid="constructor-filling"]').children().should('have.length', 0);
  });
}); 