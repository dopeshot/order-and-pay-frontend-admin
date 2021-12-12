const api = `${Cypress.env("apiUrl")}/tables`

describe('Error Handling', () => {
    beforeEach(() => {
        cy.getTables()
        cy.addTable()
        cy.patchTable()
        cy.deleteTable()

        cy.visit('/tables')
    })

})