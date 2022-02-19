import allergens from '../../fixtures/allergens.json';
import updateAllergen from '../../fixtures/update-allergen.json';
import { interceptIndefinitely } from '../../support/utils';

const api = `${Cypress.env("apiUrl")}`

describe('Api Endpoints Allergen', () => {
    describe('Get All Allergens', () => {
        beforeEach(() => {
            cy.getAllAllergens()
            cy.visit('/admin/menus/allergens')

            cy.quickLogin()
            cy.wait('@getAllAllergens')
        })

        it('should list all allergens', () => {
            cy.get('[data-cy="allergens-list-item"]').should('have.length', allergens.length)
        })

        it('should display correct count for allergens', () => {
            cy.get('[data-cy="allergens-count"]').should('contain', `${allergens.length} Gesamt`)
        })
    })

    describe('Create Allergens', () => {
        beforeEach(() => {
            cy.getAllAllergens()
            cy.visit('/admin/menus/allergens')

            cy.quickLogin()
            cy.wait('@getAllAllergens')
            cy.contains('Allergen hinzufügen').click()
        })

        it('should open modal when click add allergen', () => {
            cy.contains('Neues Allergen hinzufügen').should('be.visible')
            cy.get(`[data-cy="allergens-modal-add-edit"]`).should('be.visible')
        })

        it('should create one allergen', () => {
            cy.get(`[data-cy="textinput-title-input"]`).type(allergens[0].title)
            cy.get(`[data-cy="textinput-icon-input"]`).type(allergens[0].icon)

            cy.createAllergen()
            cy.get(`[data-cy="allergens-modal-add-edit-button"]`).click()
            cy.wait('@createAllergen')
        })

        it('should have disabled state when inputs are wrong', () => {
            cy.get(`[data-cy="textinput-title-input"]`).focus().blur()

            cy.get(`[data-cy="allergens-modal-add-edit-button"]`).should('have.class', 'opacity-80')
        })

        it('should have loading icon when sending', () => {
            cy.get(`[data-cy="textinput-title-input"]`).type(allergens[0].title)
            cy.get(`[data-cy="textinput-icon-input"]`).type(allergens[0].icon)

            const interception = interceptIndefinitely('POST', `${api}/allergens`, "createAllergenIndefinitely", { fixture: 'allergen.json' })

            cy.get(`[data-cy="allergens-modal-add-edit-button"]`).click().then(() => {
                cy.get(`[data-cy="allergens-modal-add-edit-button"] svg`).should('have.class', 'fa-spinner')
                interception.sendResponse()
                cy.wait('@createAllergenIndefinitely')
            })
        })
    })

    describe('Update Allergen', () => {
        beforeEach(() => {
            cy.getAllAllergens()
            cy.visit('/admin/menus/allergens')

            cy.quickLogin()
            cy.get('[data-cy="allergens-list-item"]').first().click()
        })

        it('should open modal when click allergen list item', () => {
            cy.contains('Allergen bearbeiten').should('be.visible')
            cy.get(`[data-cy="allergens-modal-add-edit"]`).should('be.visible')
        })

        it('should close modal when click x icon', () => {
            cy.get(`[data-cy="modal-close-iconbutton"]`).click()
            cy.get(`[data-cy="allergens-modal-add-edit"]`).should('not.exist')
        })

        it('should have filled all fields', () => {
            cy.get(`[data-cy="textinput-title-input"]`).should('have.value', allergens[0].title)
            cy.get(`[data-cy="textinput-icon-input"]`).should('have.value', allergens[0].icon)
        })

        it('should update allergen', () => {
            cy.get(`[data-cy="textinput-title-input"]`).clear().type(updateAllergen.title)

            cy.updateAllergen()
            cy.get(`[data-cy="allergens-modal-add-edit-button"]`).click()
            cy.wait('@updateAllergen')
        })
    })

    describe('Delete Allergen', () => {
        beforeEach(() => {
            cy.getAllAllergens()
            cy.visit('/admin/menus/allergens')

            cy.quickLogin()
            cy.get('[data-cy="allergens-delete-button"]').first().click()
        })

        it('should open delete modal when click on delete', () => {
            cy.get('h2').should('contain', `${allergens[0].title} löschen?`)
        })

        it('should close delete modal when click on x icon', () => {
            cy.get('[data-cy="modal-close-iconbutton"]').click()
            cy.get(`[data-cy="deletemodal-${allergens[0].title}]`).should('not.exist')
        })

        it('should delete allergen when click delete on modal', () => {
            cy.deleteAllergen()
            cy.get(`[data-cy="deletemodal-${allergens[0].title}-delete-button"]`).click()
            cy.wait('@deleteAllergen')
        })

        it('should have loading icon when deleting', () => {
            const interception = interceptIndefinitely('DELETE', `${api}/allergens/**`, "deleteAllergenIndefinitely", { statusCode: 204 })

            cy.get(`[data-cy="deletemodal-${allergens[0].title}-delete-button"]`).click().then(() => {
                cy.get(`[data-cy="deletemodal-${allergens[0].title}-delete-button"] svg`).should('have.class', 'fa-spinner')
                interception.sendResponse()
                cy.wait('@deleteAllergenIndefinitely')
                cy.wait('@getAllAllergens')
            })
        })
    })
})

export { };

