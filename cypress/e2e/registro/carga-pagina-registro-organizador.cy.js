// Este es un caso de prueba que se encarga de verificar que la pagina de registro de organizador se carga correctamente
describe('Carga de la página de registro organizador', () => {
    it('Debería cargar la página de registro de organizador correctamente', () => {
    cy.log('Verificando que la página de registro de organizador se carga correctamente');
    cy.visit('https://ticketazo.com.ar/auth/registerClient')   

    });
});