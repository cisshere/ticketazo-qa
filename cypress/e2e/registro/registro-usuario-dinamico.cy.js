// Prueba de registro de usuario exitoso en escritorio y móvil utilizando emails dinámicos. 
// Esto asegura que siempre se cree un usuario nuevo en cada ejecución, evitando conflictos 
// con registros previos y garantizando la validez de la prueba.
describe('Registro de cuenta exitoso en Ticketazo', () => {

  // Función reutilizable para registrar un usuario con email y DNI dinámicos
const testRegistroUsuarioExitoso = (email, dni) => {
    cy.get('[data-cy="input-nombres"]').type('Elias');
    cy.get('[data-cy="input-apellido"]').type('Perrotta');
    cy.get('[data-cy="input-telefono"]').type('1125492451');
    cy.get('[data-cy="input-dni"]').type(dni);
    cy.get('[data-cy="select-provincia"]').click().type('Buenos Aires{enter}');
    cy.get('[data-cy="select-localidad"]').click().type('Florencio Varela{enter}');
    cy.get('[data-type="day"]').type('02');
    cy.get('[data-type="month"]').type('12');
    cy.get('[data-type="year"]').type('1999');
    cy.get('[data-cy="input-email"]').type(email);
    cy.get('[data-cy="input-confirmar-email"]').type(email);
    cy.get('[data-cy="input-password"]').type('MiContraseña__Segura123');
    cy.get('[data-cy="input-repetir-password"]').type('MiContraseña__Segura123');
    cy.get('[data-cy="btn-registrarse"]').click();
};

  // Función para generar un email dinámico
const generarEmailDinamico = () => {
    const timestamp = Date.now(); // Obtiene el timestamp actual
    return `usuario_${timestamp}@gmail.com`; // Usa el timestamp para generar un correo único
};

  // Función para generar un DNI dinámico (en este caso, un número aleatorio de 8 dígitos)
const generarDniDinamico = () => {
    const dniAleatorio = Math.floor(Math.random() * (99999999 - 10000000 + 1)) + 10000000; // Genera un DNI aleatorio de 8 dígitos
    return dniAleatorio.toString(); // Devuelve el DNI como string
};

beforeEach(() => {
    cy.visit('https://ticketazo.com.ar/auth/registerUser');
});

  // Prueba en Escritorio
it('Registro de usuario con datos válidos (Escritorio)', () => {
    const emailPc = generarEmailDinamico(); // Email dinámico para la prueba de escritorio
    const dniPc = generarDniDinamico(); // DNI dinámico para la prueba de escritorio
    testRegistroUsuarioExitoso(emailPc, dniPc);
});

  // Prueba Mobile: iPhone 14 Pro
it('Registro de usuario con datos válidos (iPhone 14 Pro)', () => {
    const emailMobile = generarEmailDinamico(); // Email dinámico para la prueba móvil
    const dniMobile = generarDniDinamico(); // DNI dinámico para la prueba móvil
    cy.viewport(393, 852); // Simula iPhone 14 Pro
    testRegistroUsuarioExitoso(emailMobile, dniMobile);
});

});
