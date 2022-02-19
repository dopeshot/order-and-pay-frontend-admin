import updateuser from '../../fixtures/update-user.json';
import users from '../../fixtures/users.json';
import { interceptIndefinitely } from '../../support/utils';

const api = `${Cypress.env("apiUrl")}`

describe('Api Endpoints User', () => {
    describe('Get all User', () => {
        beforeEach(() => {
            cy.getAllUser()
            cy.visit('/users')
        })

        it('should list all user', () => {
            cy.get('[data-cy="users-list-item"]').should('have.length', users.length)
        })

        it('should display correct count for users', () => {
            cy.get('[data-cy="users-count"]').should('contain', `${users.length} Gesamt`)
        })
    })

    describe('Create User', () => {
        beforeEach(() => {
            cy.getAllUser()
            cy.visit('/users')

            cy.contains('Benutzer hinzufügen').click()
        })

        it('should open modal when click add user', () => {
            cy.contains('Neuen Benutzer hinzufügen').should('be.visible')
            cy.get(`[data-cy="users-modal-add-edit"]`).should('be.visible')
        })

        it('should create one user', () => {
            cy.get(`[data-cy="textinput-username-input"]`).type(users[0].username)
            cy.get(`[data-cy="textinput-email-input"]`).type(users[0].email)
            cy.get(`[data-cy="password-input"]`).type('123456789')

            cy.createUser()
            cy.getAllUser()

            cy.get(`[data-cy="users-modal-add-edit-button"]`).click()

            cy.wait('@createUser')
            cy.wait('@getAllUser')
        })

        it('should have disabled state when inputs are wrong', () => {
            cy.get(`[data-cy="textinput-username-input"]`).focus().blur()

            cy.get(`[data-cy="users-modal-add-edit-button"]`).should('have.class', 'opacity-80')
        })

        it('should have loading icon when sending', () => {
            cy.get(`[data-cy="textinput-username-input"]`).type(users[0].username)
            cy.get(`[data-cy="textinput-email-input"]`).type(users[0].email)
            cy.get(`[data-cy="password-input"]`).type('123456789')

            const interception = interceptIndefinitely('POST', `${api}/auth/register`, "createUserIndefinitely", { fixture: 'user.json' })

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
            cy.getAllUser()
            cy.visit('/users')

            cy.get('[data-cy="users-list-item"]').first().click()
        })

        it('should open modal when click user list item', () => {
            cy.contains('Benutzer bearbeiten').should('be.visible')
            cy.get(`[data-cy="users-modal-add-edit"]`).should('be.visible')
        })

        it('should have filled all fields except password', () => {
            cy.get(`[data-cy="textinput-username-input"]`).should('have.value', users[0].username)
            cy.get(`[data-cy="textinput-email-input"]`).should('have.value', users[0].email)
            cy.get(`[data-cy="password-input"]`).should('have.value', "")
        })

        it('should update user', () => {
            cy.get(`[data-cy="textinput-username-input"]`).clear().type(updateuser.username)
            cy.get(`[data-cy="password-input"]`).type("123456789")

            cy.updateUser()
            cy.get(`[data-cy="users-modal-add-edit-button"]`).click()
            cy.wait('@updateUser')
        })
    })

    describe('Delete User', () => {
        beforeEach(() => {
            cy.getAllUser()
            cy.visit('/users')

            cy.get('[data-cy="users-delete-button"]').first().click()
        })

        it('should open delete modal when click on delete', () => {
            cy.get('h2').should('contain', `${users[0].username} löschen?`)
        })

        it('should delete user when click delete on modal', () => {
            cy.deleteUser()
            cy.get(`[data-cy="deletemodal-${users[0].username}-delete-button"]`).click()
            cy.wait('@deleteUser')
        })

        it('should have loading icon when deleting', () => {
            const interception = interceptIndefinitely('DELETE', `${api}/users/**`, "deleteUserIndefinitely", { statusCode: 204 })

            cy.get(`[data-cy="deletemodal-${users[0].username}-delete-button"]`).click().then(() => {
                cy.get(`[data-cy="deletemodal-${users[0].username}-delete-button"] svg`).should('have.class', 'fa-spinner')
                interception.sendResponse()
                cy.wait('@deleteUserIndefinitely')
                cy.wait('@getAllUser')
            })
        })
    })
})

export { };

