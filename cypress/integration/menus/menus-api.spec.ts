import menus from '../../fixtures/menus.json';
import updateMenu from '../../fixtures/update-menu.json';
import { interceptIndefinitely } from '../../support/utils';

const api = `${Cypress.env("apiUrl")}`

describe('Api Endpoints Menus', () => {
    describe('Get All Menus', () => {
        beforeEach(() => {
            cy.getAllMenus()
            cy.visit('/admin/menus')

            cy.quickLogin()

            cy.wait('@getAllMenus')
        })

        it('should list all menus', () => {
            cy.get('[data-cy="menus-list-item"]').should('have.length', menus.length)
        })

        it('should display correct count for menus', () => {
            cy.get('[data-cy="menus-count"]').should('contain', `${menus.length} Gesamt`)
        })

        it('should display active label when menu is active', () => {
            cy.get('[data-cy=tag-box].bg-green-500').should('be.visible')
        })

        it(`should go to "/admin/menus/${menus[0]._id}/editor when click on first item`, () => {
            cy.getMenuOverviewEditor()
            cy.get('[data-cy="menus-list-item"]').first().click()
            cy.wait('@getMenuOverviewEditor')

            cy.url().should('include', `/admin/menus/${menus[0]._id}/editor`)
        })
    })

    describe('Create Menu', () => {
        beforeEach(() => {
            cy.getAllMenus()
            cy.visit('/admin/menus')

            cy.quickLogin()

            cy.wait('@getAllMenus')
            cy.contains('Menü hinzufügen').click()
        })

        it('should open "/menus/add" when click add menu', () => {
            cy.contains('Neues Menü erstellen').should('be.visible')
            cy.url().should('include', '/menus/add')
        })

        it('should create one menu', () => {
            cy.get(`[data-cy="textinput-title-input"]`).type(menus[0].title)
            cy.get(`[data-cy="textarea-description-input"]`).type(menus[0].description)

            cy.createMenu()
            cy.get(`[data-cy="menus-add-edit-save-button"]`).click()
            cy.wait('@createMenu')
        })

        it('should have disabled state when inputs are wrong', () => {
            cy.get(`[data-cy="textinput-title-input"]`).focus().blur()

            cy.get(`[data-cy="menus-add-edit-save-button"]`).should('have.class', 'opacity-80')
        })

        it('should have loading icon when sending', () => {
            cy.get(`[data-cy="textinput-title-input"]`).type(menus[0].title)
            cy.get(`[data-cy="textarea-description-input"]`).type(menus[0].description)

            const interception = interceptIndefinitely('POST', `${api}/menus`, "createMenuIndefinitely", { fixture: 'menu.json' })

            cy.get(`[data-cy="menus-add-edit-save-button"]`).click().then(() => {
                cy.get(`[data-cy="menus-add-edit-save-button"] svg`).should('have.class', 'fa-spinner')
                interception.sendResponse()
                cy.wait('@createMenuIndefinitely')
            })
        })
    })

    describe('Update Menu', () => {
        beforeEach(() => {
            cy.getAllMenus()
            cy.getMenuById()
            cy.visit('/admin/menus')

            cy.quickLogin()

            cy.wait('@getAllMenus')
            cy.get('[data-cy="menus-edit-button"]').first().click()
            cy.wait('@getMenuById')
        })

        it(`should open "/menus/${menus[0]._id}/edit" when click edit button`, () => {
            cy.contains('Menü bearbeiten').should('be.visible')
            cy.url().should('include', `/menus/${menus[0]._id}/edit`)
        })

        it('should go back to "/menus" when click back button', () => {
            cy.get(`[data-cy="menus-back-button"]`).click()
            cy.url().should('include', `/menus`)
        })

        it('should have filled all fields', () => {
            cy.get(`[data-cy="textinput-title-input"]`).should('have.value', menus[0].title)
            cy.get(`[data-cy="textarea-description-input"]`).should('have.value', menus[0].description)
        })

        it('should update menu', () => {
            cy.get(`[data-cy="textinput-title-input"]`).clear().type(updateMenu.title)

            cy.updateMenu()
            cy.get(`[data-cy="menus-add-edit-save-button"]`).click()
            cy.wait('@updateMenu')

            cy.url().should('include', `/menus`)
        })
    })

    describe('Delete Menu', () => {
        describe('Menu List', () => {
            beforeEach(() => {
                cy.getAllMenus()
                cy.visit('/admin/menus')

                cy.quickLogin()

                cy.wait('@getAllMenus')
                cy.get('[data-cy="menus-delete-button"]').first().click()
            })

            it('should open delete modal when click on delete', () => {
                cy.get('h2').should('contain', `${menus[0].title} löschen?`)
            })

            it('should close delete modal when click on x icon', () => {
                cy.get('[data-cy="modal-close-iconbutton"]').click()
                cy.get(`[data-cy="deletemodal-${menus[0].title}]`).should('not.exist')
            })

            it('should delete menu when click delete on modal', () => {
                cy.deleteMenu()
                cy.get(`[data-cy="deletemodal-${menus[0].title}-delete-button"]`).click()
                cy.wait('@deleteMenu')
            })

            it('should have loading icon when deleting', () => {
                const interception = interceptIndefinitely('DELETE', `${api}/menus/**`, "deleteMenuIndefinitely", { statusCode: 204 })

                cy.get(`[data-cy="deletemodal-${menus[0].title}-delete-button"]`).click().then(() => {
                    cy.get(`[data-cy="deletemodal-${menus[0].title}-delete-button"] svg`).should('have.class', 'fa-spinner')
                    interception.sendResponse()
                    cy.wait('@deleteMenuIndefinitely')
                    cy.wait('@getAllMenus')
                })
            })
        })

        describe('Menu Edit Page', () => {
            beforeEach(() => {
                cy.getAllMenus()
                cy.getMenuById()
                cy.visit('/admin/menus')

                cy.quickLogin()

                cy.wait('@getAllMenus')
                cy.get('[data-cy="menus-edit-button"]').first().click()
                cy.wait('@getMenuById')
                cy.get('[data-cy="menus-delete-button"]').click()
            })

            it('should open delete modal when click on delete', () => {
                cy.get('h2').should('contain', `${menus[0].title} löschen?`)
            })

            it('should close delete modal when click on x icon', () => {
                cy.get('[data-cy="modal-close-iconbutton"]').click()
                cy.get(`[data-cy="deletemodal-${menus[0].title}]`).should('not.exist')
            })

            it('should delete menu when click delete on modal', () => {
                cy.deleteMenu()
                cy.get(`[data-cy="deletemodal-${menus[0].title}-delete-button"]`).click()
                cy.wait('@deleteMenu')
            })

            it('should have loading icon when deleting', () => {
                const interception = interceptIndefinitely('DELETE', `${api}/menus/**`, "deleteMenuIndefinitely", { statusCode: 204 })

                cy.get(`[data-cy="deletemodal-${menus[0].title}-delete-button"]`).click().then(() => {
                    cy.get(`[data-cy="deletemodal-${menus[0].title}-delete-button"] svg`).should('have.class', 'fa-spinner')
                    interception.sendResponse()
                    cy.wait('@deleteMenuIndefinitely')
                    cy.wait('@getAllMenus')
                })
            })
        })

    })
})

export { };

