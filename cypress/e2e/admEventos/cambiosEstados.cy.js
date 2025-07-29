
it(' Ingreso', () => {
      cy.visit('https://ticketazo.com.ar/auth/login');
cy.get('[data-cy="input-email"]', { timeout: 20000 }).should('be.visible');
        cy.get('[data-cy="input-password"]', { timeout: 20000 }).should('be.visible');
        cy.get('[data-cy="btn-login"]', { timeout: 10000 }).should('be.visible');
        cy.log(' Campos de login y botón visibles.');

        // Rellenar los campos de email y contraseña.
        cy.get('[data-cy="input-email"]').type('admin@admin.com');
        cy.wait(2000);
        cy.get('[data-cy="input-password"]').type('admin');
        cy.wait(2000);
        cy.log(' Credenciales introducidas.');

        //  Hacer clic en el botón de login.
        cy.get('[data-cy="btn-login"]').click();
        cy.log(' Clic en el botón de Iniciar Sesión.');


        // Validar que el login fue exitoso
        cy.url({ timeout: 10000 }).should('eq', 'https://ticketazo.com.ar/');
        cy.log('Login exitoso, redirigido a la página principal.');
        cy.wait(1000); 
        

  })

  describe('Pruebas de Cambio de Estado en Eventos', () => {
    beforeEach(() => {
cy.visit('https://ticketazo.com.ar/adminTable');
      

  it(' Cambiar estado de Creado a Aprobado', () => {


    // Buscar evento específico
    cy.contains('Evento 28').parents('tr').within(() => {

      // Abrir menú desplegable de estado
      cy.get('button').contains('Creado').click()

      // Seleccionar nuevo estado
      cy.get('ul').contains('Aprobado').click()

      // Verificar que se actualizó visualmente
      cy.contains('Aprobado')
    })
  })

  it('- Cambiar estado en vista filtrada', () => {
    cy.contains('Aprobado').click()
    cy.get('table tbody tr').first().within(() => {
      cy.get('button').click()
      cy.get('ul').contains('Rechazado').click()
    })

    // El evento debería desaparecer si ya no coincide con el filtro actual
    cy.get('table tbody tr').should('not.contain', 'Rechazado')
  })
  
})
})