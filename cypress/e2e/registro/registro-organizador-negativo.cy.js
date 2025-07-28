// Este es un describe que agrupa pruebas negativas de la pantalla registro de cliente.
describe('Registro de organizador pruebas negativas', () => {
    beforeEach(() => {
        // Antes de cada prueba, visitamos la página de registro
        cy.visit('https://ticketazo.com.ar/auth/registerClient');
    });

it('Registro de organizador sin datos', () => {
    cy.get('[data-cy="btn-registrarse"]').click();
    cy.get('.grid > :nth-child(1) > .hidden').contains('Completa este campo');
    cy.get('.grid > :nth-child(2) > .hidden').contains('Completa este campo');
    cy.get('[data-slot="error-message"]').eq(2).should('contain', 'Completa este campo');
    cy.get('[data-slot="error-message"]').eq(3).should('contain', 'Completa este campo');
    cy.get(':nth-child(5) > .hidden').contains('Completa este campo');
    cy.get(':nth-child(6) > .hidden').contains('Completa este campo');
    cy.get('[data-filled="true"] > .hidden').contains('Completa este campo');
    cy.get(':nth-child(7) > .hidden').contains('Completa este campo');
    cy.get(':nth-child(8) > .hidden').contains('Completa este campo');
    cy.get(':nth-child(9) > .hidden').contains('Completa este campo');
    cy.get(':nth-child(10) > .hidden').contains('Completa este campo');

});


it("No debe permitir ingresar letras y simbolos en el campo CUIT", () => {
    const CuitInvalido = 'AdjfsiWQQAxf';
    const CuitConSimbolos = '20_e214_&&&&';

    cy.log('Probando CUIT con letras');
    cy.get('[data-cy="input-cuit"]').type(CuitInvalido);
    cy.get('[data-cy="btn-registrarse"]').click();
    

    cy.get('[data-cy="input-cuit"]').clear();
    cy.log('Probando CUIT con simbolos');
    cy.get('[data-cy="input-cuit"]').type(CuitConSimbolos);
    cy.get('[data-cy="btn-registrarse"]').click();
})



it("No debe permitir ingresar CUIT con 12 digitos", () => {
    cy.log('Probando CUIT con 12 digitos para ver si se muestra el mensaje de error');
    cy.get('[data-cy="input-cuit"]').type('123456789012');    
    cy.get('[data-cy="btn-registrarse"]').click();
})

it('No debería permitir ingresar símbolos en el campo dirección', () => {
    const direccionConSimbolos = 'Calle Falsa #$%&&#123!';
    cy.get('[data-cy="input-direccion"]').type(direccionConSimbolos);
    cy.get('[data-cy="btn-registrarse"]').click();
// No muestra ERROR al poner simbolos en la dirección
});


it('Debe mostrar errores para formatos inválidos de email', () => {
    cy.testEmailsIncorrectos();
    cy.get('[data-cy="btn-registrarse"]').click();

});

it('No debería permitir registrarse con contraseña invalida', () => {
    cy.testConContraseñaInvalida();
})

})






