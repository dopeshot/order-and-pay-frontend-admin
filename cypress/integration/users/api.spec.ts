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

            cy.get(`[data-cy="users-modal-add-button"]`).click()

            cy.wait('@createUser')
            cy.wait('@getAllUser')
        })

        it('should have disabled state when inputs are wrong', () => {
            cy.get(`[data-cy="textinput-username-input"]`).focus().blur()

            cy.get(`[data-cy="users-modal-add-button"]`).should('have.class', 'opacity-80')
        })

        it('should have loading icon when sending', () => {
            cy.get(`[data-cy="textinput-username-input"]`).type(users[0].username)
            cy.get(`[data-cy="textinput-email-input"]`).type(users[0].email)
            cy.get(`[data-cy="password-input"]`).type('123456789')

            const interception = interceptIndefinitely('POST', `${api}/auth/register`, "createUserIndefinitely", { fixture: 'user.json' })
            cy.getAllUser()

            cy.get(`[data-cy="users-modal-add-button"]`).click().then(() => {
                cy.get(`[data-cy="users-modal-add-button"] svg`).should('have.class', 'fa-spinner')
                interception.sendResponse()
                cy.wait('@createUserIndefinitely')
                cy.wait('@getAllUser')
            })
        })
    })

    describe('Update User', () => {
        it('should open modal when click user list item')

        it('should have filled all fields')

        it('should update user')
    })

    describe('Delete User', () => {
        it('should open delete modal when click on delete')

        it('should delete user when click delete on modal')

        it('should have loading icon when deleting')
    })
})

export { };

