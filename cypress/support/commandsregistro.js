Cypress.Commands.add('testEmailsIncorrectos', () => {
    const emailsIncorrectos = [
    {
    email: 'testemaiilcom',
    mensaje: 'Incluye un signo "@" en la dirección de correo electrónico'
    },
    
    {
    email: 'testingemail.com',
    mensaje: 'Incluye un signo "@" en la dirección de correo electrónico'
    },
    
    {
    email: 'testing@@email.com',
    mensaje: 'El texto detrás del signo "@" no debe incluir el símbolo "@"'
    }
];

    emailsIncorrectos.forEach(({ email, mensaje }) => {
    cy.get('[data-cy="input-email"]').clear().type(email);
    cy.get('[data-cy="btn-registrarse"]').click();
    cy.get('[data-slot="error-message"]').eq(6).should('include.text', mensaje);
});


});

Cypress.Commands.add('testConContraseñaInvalida', () => {
  cy.get('[data-cy="input-razon-social"]').type('Empresa de Prueba');
  cy.get('[data-cy="input-cuit"]').type('30711234569');
  cy.get('[data-cy="select-provincia"]').click().type('Buenos Aires{enter}');
  cy.get('[data-cy="select-localidad"]').click().type('La Plata{enter}');
  cy.get('[data-cy="input-direccion"]').type('Calle Falsa 123');
  cy.get('[data-cy="input-telefono"]').type('1123456789');
  cy.get('[data-cy="input-email"]').type('testcorreo@mail.com');
  cy.get('[data-cy="input-confirmar-email"]').type('testcorreo@mail.com');
  // Contraseña inválida (sin mayúsculas ni símbolos)
  cy.get('[data-cy="input-password"]').type('12345678');
  cy.get('[data-cy="input-repetir-password"]').type('12345678');
  cy.get('[data-cy="btn-registrarse"]').click();
  cy.get('[data-cy="error-message"]').should('include.text', 'La contraseña debe tener al menos 8 caracteres');

});



