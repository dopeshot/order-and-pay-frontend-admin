import menus from '../../fixtures/menus.json';
import updateMenu from '../../fixtures/update-menu.json';

describe('Error Handling Menus', () => {
    describe('Empty', () => {
        beforeEach(() => {
            cy.getAllMenusEmpty()
            cy.visit('/admin/menus')

            cy.quickLogin()
            cy.wait('@getAllMenusEmpty')
        })

        it('should show empty state when there are no menus', () => {
            cy.contains('Erstelle Menü').should('be.visible')
        })
    })

    describe('Duplicates', () => {
        beforeEach(() => {
            cy.getAllMenus()
            cy.visit('/admin/menus')

            cy.quickLogin()
            cy.wait('@getAllMenus')
        })

        it('should handle when create duplicate Menu', () => {
            cy.contains('Menü hinzufügen').click()

            cy.get(`[data-cy="textinput-title-input"]`).type(menus[0].title)
            cy.get(`[data-cy="textarea-description-input"]`).type(menus[0].description)

            cy.createMenuDuplicateTitle()
            cy.get(`[data-cy="menus-add-edit-save-button"]`).click()
            cy.wait('@createMenuDuplicateTitle')

            cy.contains('This menu title already exists').should('be.visible')
        })

        it('should handle when update duplicate Menu', () => {
            cy.getMenuById()
            cy.get('[data-cy="menus-edit-button"]').first().click()
            cy.wait('@getMenuById')

            cy.get(`[data-cy="textinput-title-input"]`).clear().type(updateMenu.title)

            cy.updateMenuDuplicateTitle()
            cy.get(`[data-cy="menus-add-edit-save-button"]`).click()
            cy.wait('@updateMenuDuplicateTitle')

            cy.contains('This menu title already exists').should('be.visible')
        })
    })
})

export { };

