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

describe,'Pruebas de Filtro por Estado en Gestión de Eventos', () => 
  beforeEach(() => {
 
  cy.visit('https://ticketazo.com.ar/adminTable');
  
it(' Filtrar por estado Creado', () => {
    cy.contains('Creado').click()
    cy.get('table tbody tr').each(($row) => {
      cy.wrap($row).contains('Creado')
      cy.wait(1000);
    })
  })

it(' Filtrar por estado Aprobado', () => {
    cy.contains('Aprobado').click()
    cy.get('table tbody tr').each(($row) => {
      cy.wrap($row).contains('Aprobado')
      cy.wait(1000);
    })
  })

it ('Filtrar por estado Rechazado', () => {
    cy.contains('Rechazado').click()
    cy.get('table tbody tr').each(($row) => {
      cy.wrap($row).contains('Rechazado')
      cy.wait(1000);
    })
  })

it(' Filtrar por estado Completado', () => {
    cy.contains('Completado').click()
    cy.get('table tbody tr').each(($row) => {
      cy.wrap($row).contains('Completado')
      cy.wait(1000);
    })
  })

it(' Filtrar por estado Pospuesto', () => {
    cy.contains('Pospuesto').click()
    cy.get('table tbody tr').each(($row) => {
      cy.wrap($row).contains('Pospuesto')
      cy.wait(1000);
    })
  })

it(' Filtrar por estado Cancelado', () => {
    cy.contains('Cancelado').click()
    cy.get('table tbody tr').each(($row) => {
      cy.wrap($row).contains('Cancelado')
      cy.wait(1000);
    })
  })

  it,(' Ver todos los eventos', () => {
    cy.contains('Ver todos').click()
    cy.get('table tbody tr').should('have.length.greaterThan', 0)
  })
  
})