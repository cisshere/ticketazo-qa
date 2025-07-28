// Este es un caso de prueba que verifica que un usuario no puede registrarse con un correo ya existente en Ticketazo.
describe('Registro de usuario con cuenta ya existente', () => {
    beforeEach(() => {
        // Visita la página de registro antes de cada prueba
        cy.visit('https://ticketazo.com.ar/auth/registerUser');
    });

    it('No permite registrar un usuario con un correo duplicado', () => {
    // Completa el formulario de registro con un correo ya registrado
        cy.get('[data-cy="input-nombres"]').type('Juan');
        cy.get('[data-cy="input-apellido"]').type('Gonzalez');
        cy.get('[data-cy="input-telefono"]').type('1125485251');
        cy.get('[data-cy="input-dni"]').type('44871029');
        cy.get('[data-cy="select-provincia"]').click() .type('Catamarca{enter}') // Escribimos la provincia 
        cy.get('[data-cy="select-localidad"]').click().type('Ancasti{enter}') // Escribimos la localidad 
        cy.get('[data-type="day"]').type('02'); // Escribimos el dia de nacimiento
        cy.get('[data-type="month"]').type('09'); // Escribimos el mes de nacimiento
        cy.get('[data-type="year"]').type('2001'); // Escribimos el año de nacimiento
        cy.get('[data-cy="input-email"]').type('estoesparatestear123@gmail.com');
        cy.get('[data-cy="input-confirmar-email"]').type('estoesparatestear123@gmail.com');
        cy.get('[data-cy="input-password"]').type('MiContraseña==?Segura12345');
        cy.get('[data-cy="input-repetir-password"]').type('MiContraseña==?Segura12345');
        cy.get('[data-cy="btn-registrarse"]').click();
        cy.get('[data-cy="error-message"]').should('be.visible').and('contain','Ya existe un usuario registrado con ese correo electrónico');

});

});
