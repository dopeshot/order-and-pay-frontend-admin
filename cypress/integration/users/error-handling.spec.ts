import updateuser from '../../fixtures/update-user.json'
import users from '../../fixtures/users.json'

describe('Error Handling Users', () => {
    describe('Duplicates', () => {
        beforeEach(() => {
            cy.getAllUser()
            cy.visit('/admin/users')

            cy.quickLogin()
            cy.wait('@getAllUser')
        })

        it('should handle when create duplicate user with duplicate email', () => {
            cy.contains('Benutzer hinzufügen').click()

            cy.get(`[data-cy="textinput-username-input"]`).type(users[0].username)
            cy.get(`[data-cy="textinput-email-input"]`).type(users[0].email)
            cy.get(`[data-cy="password-input"]`).type('123456789')

            cy.createUserDuplicateEmail()
            cy.get(`[data-cy="users-modal-add-edit-button"]`).click()
            cy.wait('@createUserDuplicateEmail')

            cy.contains('Email is already taken.').should('be.visible')
        })

        it('should handle when create duplicate user with duplicate username', () => {
            cy.contains('Benutzer hinzufügen').click()

            cy.get(`[data-cy="textinput-username-input"]`).type(users[0].username)
            cy.get(`[data-cy="textinput-email-input"]`).type(users[0].email)
            cy.get(`[data-cy="password-input"]`).type('123456789')

            cy.createUserDuplicateUsername()
            cy.get(`[data-cy="users-modal-add-edit-button"]`).click()
            cy.wait('@createUserDuplicateUsername')

            cy.contains('Username is already taken.').should('be.visible')
        })

        it('should handle when update duplicate user with duplicate email', () => {
            cy.get('[data-cy="users-list-item"]').first().click()

            cy.get(`[data-cy="textinput-username-input"]`).clear().type(updateuser.email)

            cy.updateUserDuplicateEmail()
            cy.get(`[data-cy="users-modal-add-edit-button"]`).click()
            cy.wait('@updateUserDuplicateEmail')

            cy.contains('Email is already taken.').should('be.visible')
        })

        it('should handle when update duplicate user with duplicate username', () => {
            cy.get('[data-cy="users-list-item"]').first().click()

            cy.get(`[data-cy="textinput-username-input"]`).clear().type(updateuser.username)

            cy.updateUserDuplicateUsername()
            cy.get(`[data-cy="users-modal-add-edit-button"]`).click()
            cy.wait('@updateUserDuplicateUsername')

            cy.contains('Username is already taken.').should('be.visible')
        })
    })
})

export { }

