describe('Perfil del Establecimiento - Carga de Imagen', () => {
    beforeEach(() => {
        cy.clearCookies();
        cy.clearLocalStorage();
        cy.visit('https://vps-3696213-x.dattaweb.com/')
        cy.fixture('usuarios').then((users) => {
            cy.login(users.usuarioOrganizador.email, users.usuarioOrganizador.password);
        });
        cy.wait(2000); 

    });

    it('Debe permitir subir una imagen válida y mostrarla en la vista previa-Desktop', () =>{
        cy.viewport(1366,768);
        //cy.get('button[aria-label="Toggle menu"]').eq(0).click();
        cy.contains('li', 'Editar Perfil').click();
        cy.wait(2000); 
        // 1. Visitar la pantalla del perfil
        //cy.get(':nth-child(4) > .pb-4').click();
      //  cy.wait(3000); 
        cy.contains('button', 'Cargar Imagen').click();
        cy.wait(2000); 
        // 2. Subir la imagen
        const imagePath = 'imagen.jpg'; 
        cy.get('input[type="file"]').attachFile(imagePath);
        cy.wait(2000); 
        // 3. Verificar que se haya cargado la imagen (vista previa vPPisible)
        cy.mensajeToast('La imagen de perfil fue actualizada');
   })

    it('Debe permitir subir una imagen válida y mostrarla en la vista previa-Mobile', () =>{
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
        /*cy.get('.z-50 > .flex-grow', { timeout: 5000 }).should(($mensaje) => {
            expect($mensaje).to.have.css('opacity', '1'); // visible
            expect($mensaje.text().trim()).to.include('La imagen de perfil fue actualizada.');
        });*/
        cy.mensajeToast('La imagen de perfil fue actualizada');
   })
})