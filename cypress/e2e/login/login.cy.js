describe('Pruebas de Login', () => {

  beforeEach(() => {
    cy.visit('https://vps-3696213-x.dattaweb.com/auth/login'); // Ruta del login
  });

  it('TC01 - Login exitoso con datos válidos (Comprador)', () => {
    cy.viewport(1366, 768);
    cy.get('[data-cy="input-email"]').type('cis.shere@gmail.com');
    cy.get('[data-cy="input-password"]').type('pepe1234*');
    cy.get('[data-cy="btn-login"]').click();
    cy.contains('a', 'Mis entradas').should('be.visible');
  });

  it('TC02 - Login exitoso con datos válidos (Organizador)', () => {
    cy.viewport(1366, 768);
     cy.get('[data-cy="input-email"]').type('sherejinx@gmail.com');
    cy.get('[data-cy="input-password"]').type('Pepe12345*');
    cy.get('[data-cy="btn-login"]').click();
    cy.contains('a', 'Cargar Evento').should('be.visible');
  });

  it('TC03 - Correo inválido', () => {
    cy.get('[data-cy="input-email"]').type('shere@gmail.com');
    cy.get('[data-cy="input-password"]').type('pepe1234*');
    cy.get('[data-cy="btn-login"]').click();
    cy.get('[data-cy="error-message"]').should('be.visible').and('contain','Correo o contraseña incorrectos');
 
  });

  it('TC04 - Campo vacío - Correo', () => {
    //cy.get('[data-cy="input-email"]').type('shere@gmail.com');
    //cy.get('[data-cy="input-email"]').clear()
    //cy.realPress('Tab');
     cy.get('[data-cy="input-password"]').type('123456');
     cy.get('[data-cy="btn-login"]').click();
     //cy.get('div[data-slot="error-message"]').should('be.visible').and('contain', 'Completa este campo');
     cy.get('[data-cy="error-message"]').should('be.visible').and('contain','Correo o contraseña incorrectos');
  });

  it('TC05 - Campo vacío - Contraseña', () => {
     cy.get('[data-cy="input-email"]').type('shere@gmail.com');
    cy.get('[data-cy="btn-login"]').click();
     cy.get('[data-cy="error-message"]').should('be.visible').and('contain','Correo o contraseña incorrectos');

  });

  it('TC06 - Contraseña incorrecta', () => {
    cy.get('[data-cy="input-email"]').type('cis.shere@gmail.com');
    cy.get('[data-cy="input-password"]').type('1234*');
    cy.get('[data-cy="btn-login"]').click();
    cy.get('[data-cy="error-message"]').should('be.visible').and('contain','Correo o contraseña incorrectos');
  });

  it('TC07 - Usuario no registrado', () => {
    cy.get('[data-cy="input-email"]').type('pepito@gmail.com');
    cy.get('[data-cy="input-password"]').type('1234*');
    cy.get('[data-cy="btn-login"]').click();
    cy.get('[data-cy="error-message"]').should('be.visible').and('contain','Correo o contraseña incorrectos');
  });

  it('TC08 - Recuperar contraseña - Email válido', () => {
    cy.contains('¿Olvidaste tu contraseña?').click();
     cy.get('[data-cy="input-email"]').type('pepito@gmail.com');
    cy.get('[data-cy="btn-enviar"]').click();
    cy.contains('Se ha enviado un correo para restablecer la contraseña').should('be.visible');
  });
   // Este TC al ejecutar por Cypress uando ingresa el mail lo ingresa correctamente
  // it('TC09 - Login con espacios en campos', () => {
  //   cy.get('[data-cy="input-email"]').type('jibarra @ gmail.com');
  //   cy.realPress('Tab');
  //   //cy.get('[data-cy="input-password"]').type(' pepe1234* ');
  //   //cy.get('[data-cy="btn-google-login"]').click();
  //   cy.get('div[data-slot="error-message"]').should('be.visible').and('contain', 'El texto antes del signo "@" no debe incluir el símbolo " ".');
  // });

});
