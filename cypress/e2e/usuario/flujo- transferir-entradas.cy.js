describe("Página inicial de ticketazo", () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.visit("https://vps-3696213-x.dattaweb.com/");
    cy.fixture("usuarios").then((users) => {
      cy.login(users.usuarioComprador2.email, users.usuarioComprador2.password);
    });
    cy.intercept(
      "POST",
      "https://vps-3696213-x.dattaweb.com/api/backend/qr/transfer"
    ).as("TransferenciaEntrada");
  });

  it("Flujo transferir entrada hacia otro usuarioComprador desde mi pc", () => {
    cy.viewport(1366, 768);

    cy.contains("li", "Mis entradas").click();
    cy.get('[data-cy="btn-ver-entradas-30"]').click();
    cy.get('[data-cy="btn-ver-ticket-2143"]').click();
    cy.get(".p-6 > :nth-child(3)").click();
    cy.get("#email").type("cis.shere@gmail.com");
    cy.get(".space-y-4 > .flex > .bg-primary").click();
    cy.get(".flex-row > .bg-primary").click();

    cy.wait("@TransferenciaEntrada").then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
    });
  });

  it("Flujo transferir entradas con resolución de dispositivo movil", () => {
    cy.viewport("iphone-8");
    cy.get(".lg\\:hidden > .justify-end > .z-0").click();
    cy.get(":nth-child(1) > .pb-4").click();
    cy.get('[data-cy="btn-ver-entradas-30"]').click();
    cy.get('[data-cy="btn-ver-ticket-2143"]').click();
    cy.get(".p-6 > :nth-child(3)").click();
    cy.get("#email").type("cis.shere@gmail.com");
    cy.get(".space-y-4 > .flex > .bg-primary").click();
    cy.get(".flex-row > .bg-primary").click();
    cy.wait("@TransferenciaEntrada").then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
    });
  });
});
