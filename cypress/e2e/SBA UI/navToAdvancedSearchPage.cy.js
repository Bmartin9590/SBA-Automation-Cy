describe('Navigate to SBA and Advance Search', () => {
  before(() => {
    // Intercept the network request
    cy.intercept('GET', '**').as('getRequest'); // Intercepts all GET requests, adjust as needed
    // Visit the URL
    cy.visit('https://search.demo.sba-one.net')
      .contains('h2', 'Small Business Search')
      .should('be.visible') // Ensure the URL is correct
    // Wait for the request to complete and assert the status code
    cy.wait('@getRequest').its('response.statusCode').should('eq', 200);
  });
describe('Navigate to the Advanced Search page')
  it('Validates the Advance Search button', () => {
      // Fix the cy.get() syntax for aria-label
    cy.get('[aria-label="Visit advanced search page"]') //Click the Advanced search button
    .click()
    cy.url().should('eq', 'https://search.demo.sba-one.net/advanced')
    cy.get('.FilterFlyoutBar_filter-flyout-bar-root__wkdvl') // Assert that the Advanced Search filters pop up
    .should('be.visible')
    });
  });

