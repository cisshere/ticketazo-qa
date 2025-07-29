// Prueba de registro de organizador de eventos exitoso en escritorio y móvil utilizando emails dinámicos. 
// Esto asegura que siempre se cree un usuario nuevo en cada ejecución, evitando conflictos 
// con registros previos y garantizando la validez de la prueba.

describe("Registro de organizador exitoso en Escritorio y Mobile", () => {

  // Función reutilizable con los pasos del test
const testRegistroOrganizadorExitoso = (email, cuit) => {
    cy.get('[data-cy="input-razon-social"]').type("Entretenimiento");
    cy.get('[data-cy="input-cuit"]').type(cuit);
    cy.get('[data-cy="select-provincia"]').click().type('Buenos Aires{enter}');
    cy.get('[data-cy="select-localidad"]').click().type('12 de Octubre{enter}');
    cy.get('[data-cy="input-direccion"]').type("Calle Falsa 123");
    cy.get('[data-cy="input-telefono"]').type("1123488790");
    cy.get('[data-cy="input-email"]').type(email);
    cy.get('[data-cy="input-confirmar-email"]').type(email);
    cy.get('[data-cy="input-password"]').type("Micontraseña$$$_-Segura123777");
    cy.get('[data-cy="input-repetir-password"]').type("Micontraseña$$$_-Segura123777");
    cy.get('[data-cy="switch-establecimiento"] > .font-inherit').click();
    cy.get('[data-cy="btn-registrarse"]').click();
};

  // Función para generar un email dinámico
const generarEmailAleatorio = () => {
    const timestamp = Date.now(); // Obtiene el timestamp actual
    return `organizador_${timestamp}@gmail.com`; // Usa el timestamp para generar un correo único
};

  // Función para generar un CUIT dinámico (11 dígitos, formato válido)
const generarCuitAleatorio = () => {
    const prefijo = "20"; // Prefijo común para CUIT de personas jurídicas en Argentina
    const cuerpo = Math.floor(Math.random() * (999999999 - 100000000 + 1)) + 100000000; // Número aleatorio de 9 dígitos
    const verificador = Math.floor(Math.random() * 9); // Un dígito aleatorio entre 0 y 9 para el verificador
    return `${prefijo}${cuerpo}${verificador}`; // Retorna el CUIT completo
};

beforeEach(() => {
    cy.visit("https://ticketazo.com.ar/auth/registerClient");
});

  // Prueba en escritorio
it("Registro de organizador con datos válidos (Escritorio)", () => {
    const emailEscritorio = generarEmailAleatorio(); // Email dinámico para la prueba de escritorio
    const cuitPc = generarCuitAleatorio(); // CUIT dinámico para la prueba de escritorio
    testRegistroOrganizadorExitoso(emailEscritorio, cuitPc);
});

  // Prueba Mobile: iPhone 14 Pro
it("Registro de organizador con datos válidos (iPhone 14 Pro)", () => {
    const emailMovil = generarEmailAleatorio(); // Email dinámico para la prueba móvil
    const cuitMobile = generarCuitAleatorio(); // CUIT dinámico para la prueba móvil
    cy.viewport(393, 852); // Simula iPhone 14 Pro
    testRegistroOrganizadorExitoso(emailMovil, cuitMobile);
});

});
