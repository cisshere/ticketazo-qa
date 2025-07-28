// Este es un caso de prueba que se encarga de verificar que la pagina de registro de usuario se carga correctamente
describe('Carga de la página de registro', () => {
    it('Debería cargar la página de registro correctamente', () => {
    cy.log('Verificando que la página de registro de usuario se carga correctamente');
    cy.visit('https://ticketazo.com.ar/auth/registerUser')   

    });
});