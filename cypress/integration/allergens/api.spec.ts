import allergens from '../../fixtures/allergens.json';
import { interceptIndefinitely } from '../../support/utils';


const api = `${Cypress.env("apiUrl")}`

describe('Api Endpoints Allergen', () => {
    describe.only('Get all User', () => {
        beforeEach(() => {
            cy.getAllAllergens()
            cy.visit('/menu/allergens')

            cy.wait('@getAllAllergens')
        })

        it('should list all user', () => {
            cy.get('[data-cy="allergens-list-item"]').should('have.length', allergens.length)
        })

        it('should display correct count for users', () => {
            cy.get('[data-cy="allergens-count"]').should('contain', `${allergens.length} Gesamt`)
        })
    })

    describe('Create User', () => {
        beforeEach(() => {
            cy.getAllAllergens()
            cy.visit('/users')

            cy.wait('@getAllAllergens')
            cy.contains('Benutzer hinzufügen').click()
        })

        it('should open modal when click add user', () => {
            cy.contains('Neuen Benutzer hinzufügen').should('be.visible')
            cy.get(`[data-cy="users-modal-add-edit"]`).should('be.visible')
        })

        it('should create one user', () => {
            cy.get(`[data-cy="textinput-username-input"]`).type(allergens[0].title)
            cy.get(`[data-cy="textinput-email-input"]`).type(allergens[0].icon)
            cy.get(`[data-cy="password-input"]`).type('123456789')

            cy.createAllergen()
            cy.getAllLabels()

            cy.get(`[data-cy="users-modal-add-edit-button"]`).click()

            cy.wait('@createUser')
            cy.wait('@getAllUser')
        })

        it('should have disabled state when inputs are wrong', () => {
            cy.get(`[data-cy="textinput-username-input"]`).focus().blur()

            cy.get(`[data-cy="users-modal-add-edit-button"]`).should('have.class', 'opacity-80')
        })

        it('should have loading icon when sending', () => {
            cy.get(`[data-cy="textinput-username-input"]`).type(allergens[0].title)
            cy.get(`[data-cy="textinput-email-input"]`).type(allergens[0].icon)
            cy.get(`[data-cy="password-input"]`).type('123456789')

            const interception = interceptIndefinitely('POST', `${api}/auth/register`, "createUserIndefinitely", { fixture: 'allergen.json' })

            cy.get(`[data-cy="users-modal-add-edit-button"]`).click().then(() => {
                cy.get(`[data-cy="users-modal-add-edit-button"] svg`).should('have.class', 'fa-spinner')
                interception.sendResponse()
                cy.wait('@createUserIndefinitely')
                cy.wait('@getAllUser')
            })
        })
    })

    describe('Update User', () => {
        beforeEach(() => {
            cy.getAllAllergens()
            cy.visit('/users')

            cy.get('[data-cy="users-list-item"]').first().click()
        })

        it('should open modal when click user list item', () => {
            cy.contains('Benutzer bearbeiten').should('be.visible')
            cy.get(`[data-cy="users-modal-add-edit"]`).should('be.visible')
        })

        it('should have filled all fields except password', () => {
            cy.get(`[data-cy="textinput-username-input"]`).should('have.value', allergens[0].title)
            cy.get(`[data-cy="textinput-email-input"]`).should('have.value', allergens[0].icon)
            cy.get(`[data-cy="password-input"]`).should('have.value', "")
        })

        it('should update user', () => {
            cy.get(`[data-cy="textinput-username-input"]`).clear().type(allergens[0].title)
            cy.get(`[data-cy="password-input"]`).type("123456789")

            cy.updateAllergen()
            cy.get(`[data-cy="users-modal-add-edit-button"]`).click()
            cy.wait('@updateUser')
        })
    })

    describe('Delete User', () => {
        beforeEach(() => {
            cy.getAllAllergens()
            cy.visit('/users')

            cy.get('[data-cy="users-delete-button"]').first().click()
        })

        it('should open delete modal when click on delete', () => {
            cy.get('h2').should('contain', `${allergens[0].title} löschen?`)
        })

        it('should delete user when click delete on modal', () => {
            cy.deleteAllergen()
            cy.get(`[data-cy="deletemodal-${allergens[0].title}-delete-button"]`).click()
            cy.wait('@deleteUser')
        })

        it('should have loading icon when deleting', () => {
            const interception = interceptIndefinitely('DELETE', `${api}/allergens/**`, "deleteUserIndefinitely", { statusCode: 204 })

            cy.get(`[data-cy="deletemodal-${allergens[0].title}-delete-button"]`).click().then(() => {
                cy.get(`[data-cy="deletemodal-${allergens[0].title}-delete-button"] svg`).should('have.class', 'fa-spinner')
                interception.sendResponse()
                cy.wait('@deleteUserIndefinitely')
                cy.wait('@getAllUser')
            })
        })
    })
})

export { };

