Cypress.Commands.add("login", (email, password) => {
  cy.get(".justify-end .text-sm").click(); // boton de login
  cy.get('[data-cy="input-email"]').type(email);
  cy.get('[data-cy="input-password"]').type(password);
  cy.get('[data-cy="btn-login"]').click();
});

Cypress.Commands.add("itemsNavMobile", (elementos) => {
  cy.get(".lg\\:hidden > .justify-end > .z-0").click();
  elementos.forEach((elemento) => {
    cy.get(".pt-2 li").contains(elemento);
  });
});

Cypress.Commands.add("itemsNavPc", (elementos) => {
  elementos.forEach((elemento) => {
    cy.get("nav").first().contains(elemento);
  });
});
