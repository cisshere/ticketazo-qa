Cypress.Commands.add('login', (email, password) => {
  cy.get('.justify-end .text-sm').click() // boton de login
  cy.get('[data-cy="input-email"]').type(email)
  cy.get('[data-cy="input-password"]').type(password)
  cy.get('[data-cy="btn-login"]').click()
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
