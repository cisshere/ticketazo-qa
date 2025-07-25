Cypress.Commands.add("login", (email, password) => {
  cy.get(".justify-end .text-sm").click(); // boton de login
  cy.get('[data-cy="input-email"]').type(email);
  cy.get('[data-cy="input-password"]').type(password);
  cy.get('[data-cy="btn-login"]').click();
});

/*********************************************************** */
//instalar -> npm install --save-dev cypress-file-upload
import 'cypress-file-upload'; //lib externa p/ simulacion se suba de img

Cypress.Commands.add('mensajeToast', (textoEsp) => {
  cy.get('.z-50 > .flex-grow', { timeout: 10000 })
    .should(($mensaje) => {
      //me aseguro que esté visible
      expect($mensaje).to.have.css('opacity', '1');
      expect($mensaje.text().trim()).to.include(textoEsp);
    });
  })


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


Cypress.Commands.add('loginCliente', () => {
  cy.get(':nth-child(1) > .relative > .inline-flex').type('eventos@eventoselek.com');
  cy.get('[data-cy="input-password"]').type('Eventos18.');
  cy.get('[data-cy="btn-login"]').click();
});

import 'cypress-file-upload';

