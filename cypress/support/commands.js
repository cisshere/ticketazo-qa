import 'cypress-file-upload'; 
/*********************************************************** */
//instalar -> npm install --save-dev cypress-file-upload
//lib externa p/ simulacion se suba de img

Cypress.Commands.add("login", (email, password) => {
  cy.get(".justify-end .text-sm").click(); // boton de login
  cy.get('[data-cy="input-email"]').type(email);
  cy.get('[data-cy="input-password"]').type(password);
  cy.get('[data-cy="btn-login"]').click();
});


Cypress.Commands.add('mensajeToast', (textoEsp) => {
  cy.get('.z-50 > .flex-grow', { timeout: 10000 })
    .should(($mensaje) => {
      //me aseguro que esté visible
      expect($mensaje).to.have.css('opacity', '1');
      expect($mensaje.text().trim()).to.include(textoEsp);
    });
  })


Cypress.Commands.add("itemsNavPc", (elementos) => {
  cy.get("nav")
    .find("li")
    .then((items) => {
      const elementosEnPantalla = [...items].map((el) => el.innerText.trim());
      expect(elementosEnPantalla).to.deep.equal(elementos);
    });
});

Cypress.Commands.add("itemsNavMobile", (elementos) => {
  cy.get(".lg\\:hidden > .justify-end > .z-0").click();
  cy.get(".pt-2 li").then((items) => {
    const elementosEnPantalla = [...items].map((el) => el.innerText.trim());
    expect(elementosEnPantalla).to.deep.equal(elementos);
  });
});

Cypress.Commands.add("loginCliente", () => {
  cy.get(":nth-child(1) > .relative > .inline-flex").type(
    "eventos@eventoselek.com"
  );
  cy.get('[data-cy="input-password"]').type("Eventos18.");
  cy.get('[data-cy="btn-login"]').click();
});

