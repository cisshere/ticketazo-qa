describe('Perfil del Establecimiento - Editar Perfil Completo', () => {
    beforeEach(() => {
        cy.clearCookies();
        cy.clearLocalStorage();
        cy.visit('https://vps-3696213-x.dattaweb.com/')
        cy.fixture('usuarios').then((users) => {
            cy.login(users.usuarioOrganizador.email, users.usuarioOrganizador.password);
        });
        cy.wait(2000); 

    });

    it('Completar formulario de editar perfil-Desktop', () =>{
        cy.viewport(1366,768);
        //cy.get('button[aria-label="Toggle menu"]').eq(0).click();
        cy.contains('li', 'Editar Perfil').click();
        cy.wait(2000); 
        // 1. Visitar la pantalla del perfil
        cy.contains('button', 'Cargar Imagen').click();
        cy.wait(2000); 
        // 2. Subir la imagen
        const imagePath = 'imagen.jpg'; 
        cy.get('input[type="file"]').attachFile(imagePath);
        cy.wait(2000);
        // 3. Verificar que se haya cargado la imagen (vista previa visible)
        cy.mensajeToast('La imagen de perfil fue actualizada');
        // 4. INgresar resto de datos
        cy.get('input[aria-label="Nombre"]').first().clear().type('Opera'); 
        cy.get('input[aria-label="Nombre de usuario"]').clear().type('Organizador') 
        cy.get('input[aria-label="Teléfono"]').clear().type('38134526734'); 
        cy.get('input[aria-label="LinkedIn"]').clear().type('https://linkenind.com/in/tu-usuario') 
        cy.get('input[aria-label="Twitter"]').clear().type('https://twitter.com/tu-usuario') 
        cy.get('input[aria-label="Instagram"]').clear().type('https://instagram.com/tu-usuario') 
        cy.contains('button', 'Guardar Cambios').click();
        cy.mensajeToast('Perfil actualizado con éxito');
   })

    it('Completar formulario de editar perfil-Mobile', () =>{
        cy.viewport('iphone-8');
        cy.get('button[aria-label="Toggle menu"]').eq(0).click();
        cy.wait(2000); 
        // 1. Visitar la pantalla del perfil
        cy.get(':nth-child(4) > .pb-4').click();
        cy.wait(3000); 
        cy.contains('button', 'Cargar Imagen').click();
        cy.wait(2000); 
        // 2. Subir la imagen
        const imagePath = 'imagen.jpg'; 
        cy.get('input[type="file"]').attachFile(imagePath);
        cy.wait(2000); 
        // 3. Verificar que se haya cargado la imagen (vista previa visible)
        cy.mensajeToast('La imagen de perfil fue actualizada');
        // 4. INgresar resto de datos
        cy.get('input[aria-label="Nombre"]').first().clear().type('Opera'); 
        cy.get('input[aria-label="Nombre de usuario"]').clear().type('Organizador') 
        cy.get('input[aria-label="Teléfono"]').clear().type('38134526734'); 
        cy.get('input[aria-label="LinkedIn"]').clear().type('https://linkenind.com/in/tu-usuario') 
        cy.get('input[aria-label="Twitter"]').clear().type('https://twitter.com/tu-usuario') 
        cy.get('input[aria-label="Instagram"]').clear().type('https://instagram.com/tu-usuario') 
        cy.contains('button', 'Guardar Cambios').click();
        cy.mensajeToast('Perfil actualizado con éxito');
   })
})