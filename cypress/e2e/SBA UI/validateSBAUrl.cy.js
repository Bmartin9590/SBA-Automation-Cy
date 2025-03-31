describe('Navigate to SBA', () => {
  it('Validates the url', () => {
    // Intercept the network request
    cy.intercept('GET', '**').as('getRequest'); // Intercepts all GET requests, adjust as needed
    // Visit the URL
    cy.visit('https://search.demo.sba-one.net'); // Make sure to include 'https://'
    cy.wait('@getRequest').its('response.statusCode').should('eq', 200);
  });
});