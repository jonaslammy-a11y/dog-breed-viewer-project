describe('Dog Breed Viewer', () => {
  describe('Main User Flow', () => {
    it('logs in, selects breed, favorites an image', () => {
      // Start at the specified localhost address
      cy.visit('http://localhost:5173/');
      
      // Click login button
      cy.get('[data-testid="login-button"]').click();
      
      // Fill login form - using more specific selectors
      cy.get('input[aria-label="Username"]').type('emilys');
      cy.get('input[type="password"]').type('emilyspass');
      cy.get('button').contains('Login').click();
      
      // Check login success
      cy.get('[data-testid="welcome-message"]').should('contain', 'emilys');

      // Wait for breeds to load before searching
      cy.get('input[aria-label="Search breeds"]').should('be.visible');
      
      // Search for bulldog breed
      cy.get('input[aria-label="Search breeds"]').type('bulldog');
      
      // Wait for breed list and click on bulldog - improved selector
      cy.get('[role="button"]').contains('bulldog').click();
      
      // Wait for images to load with a longer timeout for API calls
      cy.get('img', { timeout: 10000 }).should('have.length.at.least', 1);

      // Click the favorite button - wait for it to be visible
      cy.get('button[aria-label="favorite"]').first().should('be.visible').click();
      
      // Check for success toast
      cy.contains('Added to favorites', { timeout: 5000 }).should('be.visible');

      // Navigate to favorites page
      cy.get('[data-testid="favorites-link"]').click();
      
      // Verify favorites page
      cy.url().should('include', '/favorites');
      cy.get('img').should('have.length.at.least', 1);
    });
  });

  describe('Comprehensive Tests', () => {
    beforeEach(() => {
      cy.visit('http://localhost:5173/');
    });

    it('should show login modal when login button is clicked', () => {
      cy.get('[data-testid="login-button"]').click();
      cy.get('input[aria-label="Username"]').should('be.visible');
      cy.get('input[type="password"]').should('be.visible');
      cy.get('button').contains('Login').should('be.visible');
    });

    it('should display breed list without login', () => {
      cy.get('input[aria-label="Search breeds"]').should('be.visible');
      cy.get('[role="button"]').should('have.length.at.least', 1);
    });

    it('should filter breeds when searching', () => {
      cy.get('input[aria-label="Search breeds"]').type('poodle');
      // Wait for filtering to complete
      cy.get('[role="button"]').should('have.length.at.least', 1);
      cy.get('[role="button"]').each(($breed) => {
        cy.wrap($breed).invoke('text').should('contain', 'poodle');
      });
    });

    it('should show images when breed is selected without login', () => {
      cy.get('[role="button"]').contains('bulldog').click();
      cy.get('img', { timeout: 10000 }).should('have.length.at.least', 1);
      // Verify the breed title appears
      cy.contains('Images for bulldog').should('be.visible');
    });

    it('should show empty state when no breed is selected', () => {
      cy.contains('Select a breed to view images').should('be.visible');
    });

    it('should redirect to home when trying to access favorites without authentication', () => {
      cy.get('[data-testid="favorites-link"]').click();
      // Should redirect to home page since user is not authenticated
      cy.url().should('eq', 'http://localhost:5173/');
      cy.get('[data-testid="login-button"]').should('be.visible');
    });

    it('should allow user to logout', () => {
      // First login
      cy.get('[data-testid="login-button"]').click();
      cy.get('input[aria-label="Username"]').type('emilys');
      cy.get('input[type="password"]').type('emilyspass');
      cy.get('button').contains('Login').click();
      
      // Verify logged in
      cy.get('[data-testid="welcome-message"]').should('contain', 'emilys');
      
      // Logout
      cy.get('[data-testid="logout-button"]').click();
      
      // Verify logged out
      cy.get('[data-testid="login-button"]').should('be.visible');
      cy.get('[data-testid="welcome-message"]').should('not.exist');
    });

    it('should handle login errors with invalid credentials', () => {
      cy.get('[data-testid="login-button"]').click();
      cy.get('input[aria-label="Username"]').type('invaliduser');
      cy.get('input[type="password"]').type('wrongpassword');
      cy.get('button').contains('Login').click();
      
      // Check for error message (adjust based on your app's error handling)
      cy.contains('Login failed', { timeout: 5000 }).should('be.visible');
    });

    it('should maintain breed selection after page reload', () => {
      cy.get('[role="button"]').contains('bulldog').click();
      cy.get('img', { timeout: 10000 }).should('have.length.at.least', 1);
      
      // Reload the page
      cy.reload();
      
      // Breed selection should be maintained
      cy.contains('Images for bulldog').should('be.visible');
      cy.get('img').should('have.length.at.least', 1);
    });

    it('should clear search when clear button is clicked', () => {
      cy.get('input[aria-label="Search breeds"]').type('poodle');
      cy.get('[role="button"]').should('have.length.at.least', 1);
      
      // Clear the search
      cy.get('input[aria-label="Search breeds"]').clear();
      
      // Should show all breeds again
      cy.get('[role="button"]').should('have.length.at.least', 5); // Assuming more than 5 breeds total
    });
  });

  describe('Favorites Page Tests', () => {
    beforeEach(() => {
      cy.visit('http://localhost:5173/');
      // Login first for favorites tests
      cy.get('[data-testid="login-button"]').click();
      cy.get('input[aria-label="Username"]').type('emilys');
      cy.get('input[type="password"]').type('emilyspass');
      cy.get('button').contains('Login').click();
    });

    it('should display empty favorites message when no favorites', () => {
      cy.get('[data-testid="favorites-link"]').click();
      cy.url().should('include', '/favorites');
      cy.contains('Loading favorites...').should('be.visible');
      // After loading, it should show empty state or message
      cy.contains('My Favorites').should('be.visible');
    });

    it('should allow removing favorites', () => {
      // First add a favorite
      cy.get('[role="button"]').contains('bulldog').click();
      cy.get('img', { timeout: 10000 }).should('have.length.at.least', 1);
      cy.get('button[aria-label="favorite"]').first().click();
      cy.contains('Added to favorites').should('be.visible');
      
      // Go to favorites page
      cy.get('[data-testid="favorites-link"]').click();
      
      // Remove the favorite
      cy.get('button[aria-label="delete"]').first().click();
      cy.contains('Removed from favorites').should('be.visible');
    });

    it('should persist favorites after page reload', () => {
      // Add a favorite
      cy.get('[role="button"]').contains('beagle').click();
      cy.get('img', { timeout: 10000 }).should('have.length.at.least', 1);
      cy.get('button[aria-label="favorite"]').first().click();
      cy.contains('Added to favorites').should('be.visible');
      
      // Go to favorites and verify
      cy.get('[data-testid="favorites-link"]').click();
      cy.get('img').should('have.length.at.least', 1);
      
      // Reload the page
      cy.reload();
      
      // Favorite should persist
      cy.get('img').should('have.length.at.least', 1);
    });
  });
});