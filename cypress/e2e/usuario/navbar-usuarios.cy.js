describe("Página inicial de ticketazo", () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.visit("https://vps-3696213-x.dattaweb.com/");
  });

  it("Navbar del admin desde mi pc", () => {
    cy.fixture("usuarios").then((users) => {
      cy.login(users.usuarioAdmin.email, users.usuarioAdmin.password);
    });
    cy.viewport(1366, 768);
    cy.fixture("elementosNav").then((elementos) => {
      cy.itemsNavPc(elementos.navAdminPc);
    });
  });

  it("Navbar del admin desde mi simulador de mobile", () => {
    cy.fixture("usuarios").then((users) => {
      cy.login(users.usuarioAdmin.email, users.usuarioAdmin.password);
    });
    cy.viewport("iphone-8");
    cy.fixture("elementosNav").then((elementos) => {
      cy.itemsNavMobile(elementos.navAdminMobile);
    });
  });

  it("Navbar del comprador desde mi pc", () => {
    cy.fixture("usuarios").then((users) => {
      cy.login(users.usuarioComprador.email, users.usuarioComprador.password);
    });
    cy.viewport(1366, 768);
    cy.fixture("elementosNav").then((elementos) => {
      cy.itemsNavPc(elementos.navCompradorPc);
    });
  });

  it("Navbar del comprador desde mi simulador de mobile", () => {
    cy.fixture("usuarios").then((users) => {
      cy.login(users.usuarioComprador.email, users.usuarioComprador.password);
    });
    cy.viewport("iphone-8");
    cy.fixture("elementosNav").then((elementos) => {
      cy.itemsNavMobile(elementos.navCompradorMobile);
    });
  });

  it("Navbar del organizador desde mi pc", () => {
    cy.fixture("usuarios").then((users) => {
      cy.login(
        users.usuarioOrganizador.email,
        users.usuarioOrganizador.password
      );
    });
    cy.viewport(1366, 768);
    cy.fixture("elementosNav").then((elementos) => {
      cy.itemsNavPc(elementos.navOrganizadorPc);
    });
  });

  it("Navbar del Organizador desde mi simulador de mobile", () => {
    cy.fixture("usuarios").then((users) => {
      cy.login(
        users.usuarioOrganizador.email,
        users.usuarioOrganizador.password
      );
    });
    cy.viewport("iphone-8");
    cy.fixture("elementosNav").then((elementos) => {
      cy.itemsNavMobile(elementos.navOrganizadorMobile);
    });
  });
});
