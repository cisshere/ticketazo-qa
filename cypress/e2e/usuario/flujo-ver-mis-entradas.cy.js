describe("Página inicial de ticketazo", () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.visit("https://vps-3696213-x.dattaweb.com/");
    cy.fixture("usuarios").then((users) => {
      cy.login(users.usuarioComprador.email, users.usuarioComprador.password);
    });
  });

  it("Flujo ver mis entradas y como llegar al evento desde la pc", () => {
    cy.viewport(1366, 768);
    cy.contains("li", "Mis entradas").click();
    cy.get('[data-cy="btn-ver-entradas-21"]').click();
    cy.get('[data-cy="btn-ver-ticket-1997"]').click();
    cy.get(".col-span-2 > .z-0").click();
  });

  it("Flujo de ver mis entradas y como llegar al evento resolución de dispositivo movil", () => {
    cy.viewport("iphone-8");
    cy.get(".lg\\:hidden > .justify-end > .z-0").click();
    cy.get(":nth-child(1) > .pb-4").click();
    cy.get('[data-cy="btn-ver-entradas-8"]').click();
    cy.get('[data-cy="btn-ver-ticket-2037"]').click();
    cy.get(".col-span-2 > .z-0").click();
  });
});
