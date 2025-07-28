// Este es un caso de prueba que verifica que un organizador no puede registrarse con un email ya existente en Ticketazo.
describe('Registro con correo duplicado', () => {
    beforeEach(() => {
    cy.visit('https://ticketazo.com.ar/auth/registerClient');
    });

    it('Registro de organizador con correo duplicados', () => {
        cy.get('[data-cy="input-razon-social"]').type('Porque si');
        cy.get('[data-cy="input-cuit"]').type('20123456789');
        cy.get('[data-cy="select-provincia"]').click() .type('Buenos Aires{enter}') // Escribimos la provincia 
        cy.get('[data-cy="select-localidad"]').click().type('Abasto{enter}') // Escribimos la localidad 
        cy.get('[data-cy="input-direccion"]').type("Calle Avenida 12345");
        cy.get('[data-cy="input-telefono"]').type("1123488790");
        cy.get('[data-cy="input-email"]').type("testingautomatizado3@gmail.com");
        cy.get('[data-cy="input-confirmar-email"]').type("testingautomatizado3@gmail.com");
        cy.get('[data-cy="input-password"]').type("Micontraseña$$$Segura123999");
        cy.get('[data-cy="input-repetir-password"]').type("Micontraseña$$$Segura123999");
        cy.get('[data-cy="switch-establecimiento"] > .font-inherit').click();
        cy.get('[data-cy="btn-registrarse"]').click();
        cy.get('[data-cy="error-message"]').contains('El usuario con este correo electrónico ya existe'); 

    
    });
});
