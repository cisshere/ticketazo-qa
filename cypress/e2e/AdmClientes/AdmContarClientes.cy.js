// <reference types="cypress" />
// Autor: Natalia Flores

// Describe el conjunto de pruebas para la verificación del conteo total de clientes después de un login.
describe('Verificación de Conteo Total de Clientes con Login de Administrador', () => {

    // Definicion de las URLs de la aplicación
    const LOGIN_PAGE_URL = 'https://ticketazo.com.ar/auth/login';
    const POST_LOGIN_SUCCESS_URL_PARTIAL = 'https://ticketazo.com.ar/'; 
    const ADMIN_CLIENTS_PAGE_URL = 'https://ticketazo.com.ar/adminClients';

    // Credenciales de administrador
    const ADMIN_EMAIL = 'admin@admin.com';
    const ADMIN_PASSWORD = 'admin';

    // URL de la API de clientes 
    const CLIENTS_API_URL = 'https://ticketazo.com.ar/api/backend/auth/UsuariosAConfirmar';

    // Flujo completo de login y navegación.
    beforeEach(() => {
        cy.log('--- Login y Navegación a Admin Clients ---');

        // Paso 1: Ir a la página de login
        cy.visit(LOGIN_PAGE_URL);
        cy.log(`Paso 1: Navegando a la página de login: ${LOGIN_PAGE_URL}`);
        
        // Intercepta la petición POST de login. Esto es crucial para asegurar que la autenticación se complete.
        // Asume que el formulario de login envía un POST a '**/auth/login'.
        cy.intercept('POST', '**/auth/login').as('loginRequest');
        cy.log('Paso 1.1: Interceptando la petición de login para capturar su finalización.');

        // Asegurarse de que los campos de login y el botón sean visibles antes de interactuar.
        cy.get('[data-cy="input-email"]', { timeout: 10000 }).should('be.visible');
        cy.get('[data-cy="input-password"]', { timeout: 10000 }).should('be.visible');
        cy.get('[data-cy="btn-login"]', { timeout: 10000 }).should('be.visible');
        cy.log('Paso 1.2: Campos de login y botón visibles.');

        // Paso 2: Rellenar los campos de email y contraseña.
        cy.get('[data-cy="input-email"]').type(ADMIN_EMAIL);
        cy.get('[data-cy="input-password"]').type(ADMIN_PASSWORD);
        cy.log('Paso 2: Credenciales introducidas.');

        // Paso 3: Hacer clic en el botón de login.
        cy.get('[data-cy="btn-login"]').click();
        cy.log('Paso 3: Clic en el botón de Iniciar Sesión.');

        // Esperar la petición de login con un status 2xx.
        cy.wait('@loginRequest', { timeout: 15000 })
          .its('response.statusCode').should('be.oneOf', [200, 201]);
        cy.log('Paso 3.1: Petición de login completada exitosamente.');

        // Paso 4: Validar que el login fue exitoso
        cy.url({ timeout: 10000 }).should('eq', POST_LOGIN_SUCCESS_URL_PARTIAL);
        cy.log('Paso 4: Login exitoso, redirigido a la página principal.');
        cy.wait(1000); // Pausa 

        // Paso 5: Navegar directamente a la página de administración de clientes.
        cy.intercept('GET', CLIENTS_API_URL).as('getClientesAPI');
        cy.log(`Paso 5.0: Interceptando la API de clientes en: ${CLIENTS_API_URL}`);
        cy.visit(ADMIN_CLIENTS_PAGE_URL);
        cy.log(`Paso 5.1: Navegando directamente a la página de clientes: ${ADMIN_CLIENTS_PAGE_URL}`);

        // Esperar a que la petición de la API de clientes se complete con éxito (código 200).
        
        cy.wait('@getClientesAPI', { timeout: 20000 }) 
            .its('response.statusCode').should('eq', 200); // Espera un 200 OK.
        cy.log('Paso 5.2: Petición de la API de clientes completada con éxito. Los datos de la tabla deberían estar disponibles.');

        // Paso 6: Confirmar que estamos en la página de adminClients.
        cy.url({ timeout: 10000 }).should('eq', ADMIN_CLIENTS_PAGE_URL);
        cy.log('Paso 6: Página de adminClients cargada. Ahora buscando el contador.');

        
        // Seleccionar el contador de clientes
              
        cy.get('p.text-sm.text-gray-800.mb-4', { timeout: 15000 }) 
            .should('be.visible'); // Asegura que no solo existe, sino que es visible
        cy.log('Paso 6.2: Contador de clientes encontrado y visible con el selector actualizado.');
        cy.wait(1000); 
        cy.log('--- Login Completado ---');
    });

    // verificar el contador total de clientes.
    it('Debe verificar que el número total de clientes en el contador coincide con la cantidad de filas en la tabla', () => {
        cy.log('--- Iniciando verificación de tabla ---');

        // Paso 1: Obtener el número del contador de clientes.
        
        cy.get('p.text-sm.text-gray-800.mb-4') 
            .invoke('text')
            .then((contadorTexto) => {
                const match = contadorTexto.match(/\d+/);
                const totalClientesContador = match ? parseInt(match[0], 10) : 0;
                cy.log(`Paso 1.1: Total de clientes según contador: ${totalClientesContador}`);
                
                // Paso 1.2: Intentar encontrar la tabla de clientes por su aria-label y asegurar su visibilidad.
                cy.get('table[aria-label="Tabla de clientes"]', { timeout: 10000 }) 
                    .should('be.visible') 
                    .then(($table) => {
                        cy.log('Paso 1.3: Tabla de clientes encontrada y visible.');
                        // buscar las filas de datos dentro de la tabla.
                        
                        cy.wrap($table).find('tbody tr') 
                            .its('length')
                            .then((cantidadFilasTabla) => {
                                cy.log(`Paso 2: Cantidad de filas/clientes en la tabla: ${cantidadFilasTabla}`);

                                // Paso 3: Verificar que el número del contador coincide con la cantidad de filas contadas.
                                expect(cantidadFilasTabla).to.equal(totalClientesContador);
                                cy.log('Paso 3: ¡La cantidad de clientes en el contador coincide con las filas de la tabla!');
                            });
                    });
            });
        cy.log('--- Verificación de tabla Finalizada ---');
    });
});