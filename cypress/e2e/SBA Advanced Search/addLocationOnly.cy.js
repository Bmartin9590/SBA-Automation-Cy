describe('Navigate to SBA and Advance Search', () => {
  it('Validates the Advance Search button', () => {  //This test validates the url of the home page of the application
    cy.visitSBAAdvanced();
  });

  it.only('Adds a random single location using ONLY', () => {
    cy.addRandomLocationUsingOnly();
    });
});
