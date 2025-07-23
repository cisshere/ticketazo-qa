Cypress.Commands.add('login', (email, password) => {
  cy.get('.justify-end .text-sm').click() // boton de login
  cy.get('[data-cy="input-email"]').type(email)
  cy.get('[data-cy="input-password"]').type(password)
  cy.get('[data-cy="btn-login"]').click()
});
