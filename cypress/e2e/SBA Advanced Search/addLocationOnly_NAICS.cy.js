describe('Navigate to SBA and Advance Search', () => {
  it('Validates the Advance Search button', () => {  
    cy.visitSBAAdvanced();
  });

  it('Adds a random single location using ONLY and a random NAICS code', () => {
    cy.visitSBAAdvanced(); 
    
    cy.getByAriaLabel('Location Filter Icon')
      .click(); 
  
    cy.selectRandomLocationAndApplyOnly(); 
  
    cy.getByAriaLabel('Close filter flyout') 
      .click();
    
    cy.wait(5000)
    
    cy.get('[data-testid="table"]')
      .then(($table) => {
        // Check if the table is visible
        if ($table.is(':visible')) {
          // If visible, you can proceed with your test
          cy.log('The table is visible.');
        } else {
          // If not visible, log an error and fail the test
          cy.log('Error: The table is not visible.').then(() => {
            throw new Error('The table is not visible. Failing the test.');
          });
        }
      });
    cy.wait(3000)
    
    it('Adds a random single location using ONLY and a random NAICS code', () => {
      
    })
    cy.getByAriaLabel('NAICS Codes Icon')
      .click({force: true})
    cy.get('.FilterFlyout_flyout-content__KD0jQ')
      .should('be.visible')
      
    cy.selectRandomNaicsCode().then(() => {
      cy.get('p.AppliedFilterSentence_applied-fliter-sentence-root__cVhTH')
        .invoke('text')
        .then((text) => {
          const naicsCodeRegex = /NAICS code\(s\) <b>(\d+)<\/b>/;
          const match = text.match(naicsCodeRegex);
          if (match && match[1]) {
            const naicsCode = match[1];

            console.log("Extracted NAICS Code:", naicsCode); // Logs the entire NAICS code
          }
        }).then(() => {
          cy.getByAriaLabel('Close filter flyout') 
            .click();

          cy.get('h3').invoke('text').then((headerText) => {
            const matches = headerText.match(/There are (\d+) small businesses/)
            if (matches && matches[1]) {
              const numberOfBusinesses = parseInt(matches[1], 10);

            if (numberOfBusinesses === 0) {
              cy.fail('No small businesses found.');
            } else {
                expect(numberOfBusinesses).to.be.greaterThan(0)

              cy.get('.AppliedFilterSentence_applied-fliter-sentence-root__cVhTH')
                .invoke('text')
                .then((text) => {
                  const naicsCode = text.match(/\d+/)[0];
                  cy.wrap(naicsCode).as('naicsCode');

                cy.get('a[href^="/profile/"]')
                  .first() 
                  .should('be.visible') 
                  .click(); 
                cy.wait(2000)
                
                cy.get('a[href="#naics-codes"]')
                  .click();
                cy.get('.NaicsCodesSection_naics-codes-root__M5tEw')
                  .should('be.visible')
                  .should('contain', naicsCode);
              });
            }
          }
          });
        });
    });
  });                     
});                                                                                                                                                                                              
//   it('Adds a random single location using ONLY and a random NAICS code', () => {
//     cy.visitSBAAdvanced(); // Navigates to the advanced search page
    
//     cy.getByAriaLabel('Location Filter Icon')
//         .click(); // Finds the location fitler button and clicks on it 
      
//     cy.selectRandomLocationAndApplyOnly(); // Chooses a random location and provokes the filter to select the ONLY operator on a location -- Custom Command 

//     cy.getByAriaLabel('Close filter flyout') // Closes the location filter
//         .click();
    
//     cy.wait(2000)

//     cy.get('[data-testid="table"]')
//         .should('be.visible');
    
//     cy.wait(3000)
    
//     cy.getByAriaLabel('NAICS Codes Icon')
//         .click({force: true})
//     cy.get('.FilterFlyout_flyout-content__KD0jQ')
//         .should('be.visible')
        
//     cy.selectRandomNaicsCode() // Selects a random NAICS code -- Custom Command 

//     cy.getByAriaLabel('Close filter flyout') // Closes the location filter window
//        .click();

//     cy.get('h3').invoke('text').then((headerText) => {
//         const matches = headerText.match(/There are (\d+) small businesses/);
//         if (matches && matches[1]) {
//             const numberOfBusinesses = parseInt(matches[1], 10);

//             // Assert the number of businesses
//             if (numberOfBusinesses === 0) {
//                 // Handle the case where there are 0 small businesses
//                 cy.fail('No small businesses found.');
//                 // If no small businesses are found the test will fail
//             } else {
//                 // Handle the case where there are small businesses
//                 expect(numberOfBusinesses).to.be.greaterThan(0)
//                 cy.get('a[href^="/profile/"]')
//                     .first() // Gets the first link with href starting with "/profile/"
//                     .should('be.visible') // Asserts that the link is visible
//                     .click(); // Clicks on the link
//                     cy.wait(2000)
                    
//                 cy.get('#naics-codes')
//                     .should('be.visible') // When the NAICS codes are visible in the profile page and fixed add the assertions here

//         } 
//      } else {
//             // Handle the case where the header does not match the expected format
//             cy.fail('Header format is incorrect or no businesses found..');