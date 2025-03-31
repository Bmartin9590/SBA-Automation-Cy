describe('Navigate to SBA and Advance Search', () => {
    it('Validates the Advance Search button', () => {  //This test validates the url of the home page of the application
      cy.intercept('GET', '**').as('getRequest');
      cy.visit('https://search.demo.sba-one.net') // Visits the home page
          .contains('h2', 'Small Business Search')
          .should('be.visible'); // Validates the header 
  
      cy.wait('@getRequest')
          .its('response.statusCode')
          .should('eq', 200); // Validates the api request is 200
      
      cy.getByAriaLabel('Visit advanced search page')
          .click(); // Clicks on the Advanced search button 
      
      cy.url()
          .should('eq', 'https://search.demo.sba-one.net/advanced'); // Validates the url of the new page / advanced search page
      
      cy.get('.FilterFlyoutBar_filter-flyout-bar-root__wkdvl')
          .should('be.visible'); // asserts the page by finding the advanced search filters table
    });
  
    it('Adds a random single location using ONLY and a random SBA cert', () => {
      cy.visitSBAAdvanced(); // Navigates to the advanced search page
      
      cy.getByAriaLabel('Location Filter Icon')
          .click(); // Finds the location fitler button and clicks on it 
        
      cy.selectRandomLocationAndApplyOnly(); // Chooses a random location and provokes the filter to select the ONLY operator on a location -- Custom Command 

      cy.getByAriaLabel('Close filter flyout') // Closes the location filter
          .click();
      
      cy.get('[data-testid="table"]')
          .should('be.visible');
      
      cy.wait(3000)
      
      cy.getByAriaLabel('SBA Certification Icon')
          .click({force: true})
      cy.get('.FilterFlyout_flyout-content__KD0jQ')
          .should('be.visible')
          
      cy.selectRandomSBA().then($selectedOption => {

          // Assert that the checkbox is checked
          cy.get($selectedOption).should('be.checked');
          cy.wait(3000)

      cy.getByAriaLabel('Close filter flyout') // Closes the location filter window
         .click();
  
      cy.get('h3')
          .contains(/There are \d+ small businesses/); // asserts the search finishes by finding the "There are ## small businesses" header
      cy.contains('.AppliedFilterSentence_applied-fliter-sentence-root__cVhTH', new RegExp(`${$selectedOption}`));
        });
});
});