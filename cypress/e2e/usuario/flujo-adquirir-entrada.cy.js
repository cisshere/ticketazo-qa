describe("Página inicial de ticketazo", () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.visit("https://vps-3696213-x.dattaweb.com/");
    cy.fixture("usuarios").then((users) => {
      cy.login(users.usuarioComprador.email, users.usuarioComprador.password);
    });
  });

  it("Flujo de aquirir entrada gratuita desde la pc", () => {
    cy.viewport(1366, 768);
    cy.contains("Categoría").click();
    cy.contains("li", "Conferencia").click();
    cy.get('[data-cy="btn-ver-evento-21"]').click();
    cy.get(".min-w-24").click();
    cy.get(
      '[style="left: 417.633px; top: 205.053px; width: 166.367px; height: 189.893px; position: absolute; background-color: rgb(109, 110, 178); transition: background-color 0.3s;"]'
    ).click();
    cy.get('button[class*="bg-orange"]').first().click();
    cy.get(".relative > .flex-col > .w-full").click();
    cy.get(".mt-6 > .z-0").click();
    cy.get('[data-cy="btn-ver-entradas-21"]').click();
    cy.contains("button", "Cerrar").click();
    cy.contains("button", "Logout").click();
  });

  it("Flujo de adquirir entrada gratuita desde resolución de dispositivo movil", () => {
    cy.viewport("iphone-8");
    cy.get(".space-y-1").click();
    cy.get(".mx-auto > .flex-wrap > :nth-child(2) > .group").click();
    cy.contains("li", "Conferencia").click();
    cy.get('[data-cy="btn-ver-evento-21"]').click();
    cy.get(".min-w-24").click();
    cy.wait(3000);
    cy.get(
      '[style="left: 417.633px; top: 205.053px; width: 166.367px; height: 189.893px; position: absolute; background-color: rgb(109, 110, 178); transition: background-color 0.3s;"]'
    ).click();
    cy.get('button[class*="bg-orange"]').first().click();
    cy.get(".relative > .flex-col > .w-full").click();
    cy.get(".mt-6 > .z-0").click();
    cy.wait(3000);
    cy.get('[data-cy="btn-ver-entradas-21"]').click();
    cy.contains("button", "Cerrar").click();
    cy.scrollTo("top");
    cy.get(".lg\\:hidden > .justify-end > .z-0").click();
    cy.get(":nth-child(3) > .pb-4").click();
  });
});
