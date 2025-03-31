const keywords = [
  'Graphic Design Services',
  'Custom Printing Solutions',
  'Landscaping Services',
  'Quantum Computing',
  'Digital Marketing Agencies',
  'Web Development Companies',
  'Local Catering Services',
  'Home Improvement Contractors',
  'Photography',
  'Personal Training',
  'App Developers',
  'Event Planning Services'
];

describe('Navigate to SBA and Advance Search', () => {
  it('Validates the Advance Search button', () => {  //This test validates the url of the home page of the application
    cy.visitSBAAdvanced(); // Navigates to the advanced search page
  });
  it('Adds a random single location using ONLY and a random keyword', () => {
    cy.addRandomLocationUsingOnly(); // A custom function that adds a random location using the only operator 
    
    cy.getByAriaLabel('Keywords Filter Icon')
    .click();

    cy.get('[id="keyword-search"]')
    .type(keywords[Math.floor(Math.random() * keywords.length)])
    .type('{enter}');

    cy.getByAriaLabel('Close filter flyout')
    .click();

    cy.wait(2000)
    
      });
    });