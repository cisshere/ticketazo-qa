// Esta es una prueba de carga de la página de registro de usuario en escritorio y mobile.
// Se verifica que la página se carga correctamente en ambas resoluciones.
describe('Carga de la página de registro de usuario', () => {
        beforeEach(() => {
        cy.visit('https://ticketazo.com.ar/auth/registerUser');
    });

    // Prueba en escritorio
    it('Debería cargar la página de registro correctamente en escritorio', () => {
        cy.log('Verificando que la página de registro de usuario se carga correctamente en escritorio');
        cy.get('.justify-start > .w-full').should('be.visible')
    });

        // Prueba Mobile:(iPhone 14 Pro)
    it('Debería cargar la página de registro correctamente en mobile (iPhone 14 Pro)', () => {
        cy.log('Verificando que la página de registro de usuario se carga correctamente en iPhone 14 Pro');
        cy.viewport(393, 852);  // Resolución del iPhone 14 Pro
        cy.get('.justify-start > .w-full').should('be.visible')
        ;
    });

});
