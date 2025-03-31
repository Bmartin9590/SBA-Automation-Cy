require('cypress-xpath');

Cypress.Commands.add('visitSBAAdvanced', () => {
    cy.visit('https://search.demo.sba-one.net/advanced');
  });

Cypress.Commands.add('getByAriaLabel', (label, options) => {
    return cy.get(`[aria-label="${label}"]`, options);
});

Cypress.Commands.add('selectRandomLocationAndApplyOnly', () => {
    cy.get('input[type="checkbox"]').then(($checkboxes) => {
      const checkboxes = $checkboxes.toArray();
      const randomIndex = Math.floor(Math.random() * checkboxes.length);
      const randomCheckbox = checkboxes[randomIndex];
  
      // Check the random checkbox if it's not already checked
      if (!randomCheckbox.checked) {
        cy.wrap(randomCheckbox).check();
      }
      
      // Assert that the checkbox has been checked
      cy.wrap(randomCheckbox).should('be.checked');
  
      // Find the "Only" button associated with the random checkbox
      cy.wrap(randomCheckbox)
        .closest('li') // Navigate to the closest li (assuming each checkbox is in an li)
        .find('button:contains("Only")') // Find the button containing "Only"
        .click({ force: true }); // Click the button
    });
  });

Cypress.Commands.add('selectRandomSBA', () => {
    // Select all checkboxes
    cy.get('div[data-testid="checkbox"] input.usa-checkbox__input')
      .then(($checkboxes) => {
        // Get a random index from the checkboxes
        const randomIndex = Math.floor(Math.random() * $checkboxes.length);
        // Get the random checkbox
        const randomCheckbox = $checkboxes[randomIndex];
        // Check the random checkbox if it's not already checked
        if (!randomCheckbox.checked) {
          cy.wrap(randomCheckbox).check({ force: true });
        }
      });
  });

  Cypress.Commands.add('selectRandomNaicsCode', () => {
    const naicsCodeRanges = {
      naicsCodes: [11, 21, 22, 23, 31, 32, 33, 42, 44, 45, 48, 49, 51, 52, 53, 54, 55, 56, 61, 62, 71, 72, 81, 92]
    };
  
    const randomNaicsCode = naicsCodeRanges.naicsCodes[Math.floor(Math.random() * naicsCodeRanges.naicsCodes.length)];
  
    cy.get('#naics-search')
      .clear()
      .type(randomNaicsCode.toString());
  
    cy.get('div[data-testid="checkbox"] input.usa-checkbox__input')
      .then(($checkboxes) => {
        const randomIndex = Math.floor(Math.random() * $checkboxes.length);
        const randomCheckbox = $checkboxes[randomIndex];
        // Check the random checkbox if it's not already checked
        if (!randomCheckbox.checked) {
          cy.wrap(randomCheckbox).check({ force: true });
        }
      });
  });
  
  Cypress.Commands.add('addRandomLocationUsingOnly', () => {
    cy.visit('https://search.demo.sba-one.net/advanced'); // Navigates to the advanced search page
    cy.getByAriaLabel('Location Filter Icon') // Finds the location filter button and clicks on it 
        .click();
    cy.selectRandomLocationAndApplyOnly(); // Chooses a random location and applies the ONLY operator on a location -- Custom Command 
    cy.get('[data-testid="table"]') // Asserts the results table is visible 
        .should('be.visible');
    cy.wait(3000);
    cy.getByAriaLabel('Close filter flyout') // Closes the location filter window 
        .click();
    cy.get('h3')
        .contains(/There are \d+ small businesses/); // Asserts the search finishes by finding the "There are ## small businesses" header
    cy.get('span:contains("Location:")')
        .invoke('text')
        .then((locationText) => {
            const location = locationText.split(': ')[1];
            const abbreviatedLocation = location.split(' - ')[0];
    
            // Validate the location in the AppliedFilterSentence
            cy.get('.AppliedFilterSentence_applied-fliter-sentence-root__cVhTH')
                .should('contain', `in ${abbreviatedLocation}`);
    
            // Validate the location in the usa-link element
            cy.get('.usa-link--external')
                .should('contain', abbreviatedLocation);  
});
  });


// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// cypress/support/commands.js
