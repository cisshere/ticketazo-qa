/// <reference types="cypress" />
// Autor: Natalia Flores

// Definicion de las URLs y credenciales 
const LOGIN_PAGE_URL = 'https://ticketazo.com.ar/auth/login';
const POST_LOGIN_SUCCESS_URL_PARTIAL = 'https://ticketazo.com.ar/';
const ADMIN_CLIENTS_PAGE_URL = 'https://ticketazo.com.ar/adminClients';
const ADMIN_EMAIL = 'admin@admin.com';
const ADMIN_PASSWORD = 'admin';
const CLIENTS_API_URL = 'https://ticketazo.com.ar/api/backend/auth/UsuariosAConfirmar';

// Validacion de CUIT para usuarios Tipo Establecimientos
describe('Validación de CUIT para Clientes Tipo "Establecimiento" (sin POM)', () => {

    
    // Flujo de login y navegación inicial a la página de clientes.
    before(() => {
        cy.log('--- Login de Administrador y Navegación a Admin Clients ---');

        //página de login
        cy.visit(LOGIN_PAGE_URL);
        cy.log(`Paso 1: Navegando a la página de login: ${LOGIN_PAGE_URL}`);

        // Interceptar la petición de login para esperar su respuesta
        cy.intercept('POST', '**/auth/login').as('loginRequest');
        cy.log('Paso 1.1: Interceptando la petición de login.');

        // Rellenar campos de email y contraseña y hacer clic en login
        cy.get('[data-cy="input-email"]', { timeout: 10000 }).should('be.visible').type(ADMIN_EMAIL);
        cy.get('[data-cy="input-password"]', { timeout: 10000 }).should('be.visible').type(ADMIN_PASSWORD);
        cy.get('[data-cy="btn-login"]', { timeout: 10000 }).should('be.visible').click();
        cy.log('Paso 2: Credenciales ingresadas y botón de login clickeado.');

        // Esperar a que la petición de login se complete exitosamente
        cy.wait('@loginRequest', { timeout: 15000 }).its('response.statusCode').should('be.oneOf', [200, 201]);
        cy.log('Paso 3: Login exitoso.');

        // Validar que la URL cambió a la página principal después del login
        cy.url({ timeout: 10000 }).should('eq', POST_LOGIN_SUCCESS_URL_PARTIAL);
        cy.wait(1000); // pausa para asegurar la carga visual

        // Navegar a la página de administración de clientes
        cy.intercept('GET', CLIENTS_API_URL).as('getClientesAPI'); // Interceptar la API de clientes
        cy.log(`Paso 4: Navegando a la página de clientes: ${ADMIN_CLIENTS_PAGE_URL}`);
        cy.visit(ADMIN_CLIENTS_PAGE_URL);

        // Esperar a que los datos de la tabla se carguen
        cy.wait('@getClientesAPI', { timeout: 20000 }).its('response.statusCode').should('eq', 200);
        cy.log('Paso 4.1: Datos de clientes cargados exitosamente.');

        // Confirmar que la URL es la de adminClients y que el contador de clientes es visible
        cy.url({ timeout: 10000 }).should('eq', ADMIN_CLIENTS_PAGE_URL);
        cy.get('p.text-sm.text-gray-800.mb-4', { timeout: 15000 }).should('be.visible');
        cy.log('--- Hook "before" Completado: Sesión y Página de Clientes listas ---');
    });

    // validar CUIT de "Establecimiento"
    it('Debe validar que los CUIT de clientes "Establecimiento" tengan exactamente 11 dígitos y sean numéricos', () => {
        cy.log('--- Iniciando la validación de CUIT para Establecimientos ---');

        let establecimientoCuitErrors = 0; // Contador de errores de CUIT
        let erroresDetalle = []; // Array para almacenar los detalles de los errores encontrados

        // Obtener la tabla de clientes por su atributo aria-label
        
        cy.get('table[aria-label="Tabla de clientes"]', { timeout: 10000 })
            .should('be.visible')
            .then(($table) => {
                cy.log('Paso 1: Tabla de clientes encontrada y visible.');

                // Buscar todas las filas (<tr>) dentro del cuerpo de la tabla (<tbody>)
                cy.wrap($table).find('tbody tr').then(($rows) => {
                    cy.log(`Paso 1.1: Se encontraron ${$rows.length} filas en la tabla. Iniciando recorrido...`);

                    // Iterar sobre cada fila encontrada
                    $rows.each((index, el) => {
                        const $row = Cypress.$(el); 
                        // Obtener el texto de la segunda columna (Tipo de Cliente) de la fila actual
                        const tipoClienteElement = $row.find('td:nth-child(2) span');
                        const tipoCliente = tipoClienteElement.text().trim();

                        // Verificar si el tipo de cliente es "Establecimiento"
                        if (tipoCliente === 'Establecimiento') {
                            // Si es un "Establecimiento", obtener el texto de la quinta columna (CUIT)
                            const cuitElement = $row.find('td:nth-child(5) span');
                            const cuitText = cuitElement.text().trim();

                            // Definir la expresión regular para validar CUIT:
                            
                            const cuitRegex = /^\d{11}$/;

                            // Validar si el CUIT no cumple con la expresión regular
                            if (!cuitRegex.test(cuitText)) {
                                establecimientoCuitErrors++; // Incrementar el contador de errores
                                const mensajeError = `Fila ${index + 1} (Tipo: ${tipoCliente}): CUIT incorrecto. Encontrado: '${cuitText}'. Esperado: 11 dígitos numéricos.`;
                                erroresDetalle.push(mensajeError); // Almacenar el detalle del error
                                cy.log(`ERROR DETECTADO: ${mensajeError}`); // Mostrar el error en el log de Cypress
                            } else {
                                cy.log(`CUIT correcto para Establecimiento en fila ${index + 1}: '${cuitText}'`);
                            }
                        }
                    });
                }).then(() => {
                    // Este bloque se ejecuta una vez que todas las filas han sido procesadas
                    cy.log('--- Recorrido de tabla finalizado. Generando Reporte Final ---');

                    // Verificar si se encontraron errores
                    if (establecimientoCuitErrors > 0) {
                        // Si hay errores, el test falla y muestra un resumen detallado
                        cy.log(`\n--- REPORTE FINAL DE CUIT INCORRECTOS PARA ESTABLECIMIENTOS ---`);
                        cy.log(`Total de establecimientos con CUIT incorrectos: ${establecimientoCuitErrors}`);
                        erroresDetalle.forEach(error => {
                            cy.log(`  - ${error}`); // Imprimir cada detalle de error
                        });
                        cy.log(`--- FIN DEL REPORTE ---`);
                        // assert.fail() forzará el fallo del test con el mensaje principal
                        assert.fail(`¡DATOS CON ERRORES! Se encontraron ${establecimientoCuitErrors} establecimientos con CUIT incorrectos. 
                            Revisa el log para detalles.`);
                    } else {
                        // Si no se encontraron errores, el test pasa
                        cy.log('¡VALIDACIÓN EXITOSA! No se encontraron CUIT incorrectos para clientes de tipo "Establecimiento".');
                    }
                });
            });
        cy.log('--- Validación de CUIT para Establecimientos Finalizada ---');
    });
});