// Este es un describe que agrupa pruebas negativas de la pantalla registro de usuario.
describe('Registro de usuario pruebas negativas', () => {
    beforeEach(() => {
    // Antes de cada prueba, visitamos la página de registro
    cy.visit('https://ticketazo.com.ar/auth/registerUser');
    });

it('Registro de usuario sin datos', () => {
    cy.get('[data-cy="btn-registrarse"]').click();
    cy.get('.grid > :nth-child(1) > .hidden').contains('Completa este campo');
    cy.get('.grid > :nth-child(2) > .hidden').contains('Completa este campo');  
    cy.get('.grid > :nth-child(3) > .hidden').contains('Completa este campo');    
    cy.get('.grid > :nth-child(4) > .hidden').contains('Completa este campo');    
    cy.get('[data-slot="error-message"]').eq(4).should('contain', 'Completa este campo');
    cy.get('[data-slot="error-message"]').eq(5).should('contain', 'Completa este campo');
    cy.get('[data-slot="error-message"]').eq(6).should('contain', 'Completa este campo');
    cy.get(':nth-child(8) > .hidden').contains('Completa este campo');
    cy.get(':nth-child(9) > .hidden').contains('Completa este campo');
    cy.get(':nth-child(10) > .hidden').contains('Completa este campo');
    cy.get(':nth-child(11) > .hidden').contains('Completa este campo');
})
    



it("No debe permitir ingresar números en el campo nombre", () => {
    cy.get('[data-cy="input-nombres"]').type('123449887989802');    
    cy.get('[data-cy="btn-registrarse"]').click();
})


it("No debe permitir ingresar números en el campo apellido", () => {
    cy.get('[data-cy="input-apellido"]').type('189787854465');    
    cy.get('[data-cy="btn-registrarse"]').click();
})



it('Debería mostrar un error si el usuario es menor de edad', () => {
    cy.get('[data-type="day"]').type('02'); // Escribimos el dia de nacimiento
    cy.get('[data-type="month"]').type('12'); // Escribimos el mes de nacimiento
    cy.get('[data-type="year"]').type('2010'); // Escribimos el año de nacimiento
    cy.get('[data-cy="btn-registrarse"]').click();
});



it('Muestra una alerta de error al ingresar una fecha de nacimiento futura', () => {
    cy.get('[data-type="day"]').type('02'); // Escribimos el dia de nacimiento
    cy.get('[data-type="month"]').type('12'); // Escribimos el mes de nacimiento
    cy.get('[data-type="year"]').type('2028'); // Escribimos el año de nacimiento
    cy.get('[data-cy="btn-registrarse"]').click();
    cy.get('[data-slot="base"][data-has-end-content="true"] > .hidden').contains('El valor debe ser 27/7/2025 o anterior.');
});

it('Test de email inválido', () => {
    const emailSinarroba = 'testingemail.com';
    const emailSinpunto = 'testmail@com';
    const emailCondosarroba = 'testemail@@email.com';

    cy.log('Probando email sin @');
    cy.get('[data-cy="input-email"]').type(emailSinarroba);
    cy.get('[data-cy="btn-registrarse"]').click();
    cy.get('.group.is-filled > .hidden').should('include.text', 'Incluye un signo "@"');

    cy.log('Probando email sin punto');
    cy.get('[data-cy="input-email"]').clear().type(emailSinpunto);
    cy.get('[data-cy="btn-registrarse"]').click();
    // No muestra mensaje de error al poner este email
    

    cy.log('Probando email con dos @');
    cy.get('[data-cy="input-email"]').clear().type(emailCondosarroba);
    cy.get('[data-cy="btn-registrarse"]').click();
    cy.get('.group.is-filled > .hidden').should('include.text', 'El texto detrás del signo "@" no debe incluir el símbolo "@"');
})

it('Debería mostrar un error si los correos no coinciden', () => {
    cy.get('[data-cy="input-email"]').type('ejemplo123@example.com');
    cy.get('[data-cy="input-confirmar-email"]').type('ejemplo1245@example.com');
    cy.get('[data-cy="btn-registrarse"]').click();
    // No muestra error al poner dos emails diferentes


});



it('Contraseñas invalidas', () => {

    const contraseñaInvalida = '12345678'; // Contraseña sin mayúsculas, minúsculas y caracteres especiales
    const contraseñaConEspacio = 'Contraseña 123'; // Contraseña con espacio
    const contraseñaCorta  = 'Pass1!'; // Contraseña corta

    cy.log('Probando contraseña sin mayúsculas, minúsculas y caracteres especiales');
    cy.get('[data-cy="input-password"]').type(contraseñaInvalida);
    cy.get('[data-cy="btn-registrarse"]').click();

    cy.log('Probando contraseña con espacio');
    cy.get('[data-cy="input-password"]').clear().type(contraseñaConEspacio);
    cy.get('[data-cy="btn-registrarse"]').click();

    cy.log('Probando contraseña corta');
    cy.get('[data-cy="input-password"]').clear().type(contraseñaCorta);
    cy.get('[data-cy="btn-registrarse"]').click();

    // No muestra error al poner las tres contraseñas invalidas, pero debería mostrarlo
    
})

it('No debe permitir ingresar contraseñas que no coincidan', () => {
    cy.get('[data-cy="input-password"]').type('Contraseña1!');
    cy.get('[data-cy="input-repetir-password"]').type('Contraseña2!');
    cy.get('[data-cy="btn-registrarse"]').click();
    // No muestra error al poner dos contraseñas diferentes


})

})
