describe('Dog Breed Viewer', () => {
  it('logs in, selects breed, favorites an image', () => {
    // Start at home page
    cy.visit('/');
    
    // Click login button
    cy.get('[data-testid="login-button"]').click();
    
    // Fill login form
    cy.get('input[aria-label="Username"]').type('emilys');
    cy.get('input[type="password"]').type('emilyspass');
    cy.get('button').contains('Login').click();
    
    // Check login success
    cy.get('[data-testid="welcome-message"]').should('contain', 'kminchelle');

    // Search for bulldog breed
    cy.get('input[aria-label="Search breeds"]').type('bulldog');
    
    // Wait for breed list and click on bulldog
    cy.get('li').contains('bulldog').click();
    
    // Wait for images to load
    cy.get('img').should('have.length.at.least', 1);

    // Click the favorite button
    cy.get('button[aria-label="favorite"]').first().click();
    
    // Check for success toast
    cy.contains('Added to favorites').should('be.visible');

    // Navigate to favorites page
    cy.get('[data-testid="favorites-link"]').click();
    
    // Verify favorites page
    cy.url().should('include', '/favorites');
    cy.get('img').should('have.length.at.least', 1);
  });
});