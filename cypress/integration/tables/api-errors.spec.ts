const api = `${Cypress.env("apiUrl")}/tables`

describe('Api Error Handling', () => {
    describe(('General Errors'), () => {
        it('should handle it when database down', () => {
            cy.getTableDatabaseDown()
            cy.visit('/tables')

            cy.get('[data-cy="error-banner"]').should('be.visible')
            cy.get('[data-cy="error-banner"]').contains(`Cannot connect to ${api}!`)
        })

        it.skip('should handle when tables are empty', () => {
            // TODO: Implement when feature ready
        })
    })

    describe('Table Add Errors', () => {
        beforeEach(() => {
            cy.visit('/tables')

            cy.get('[data-cy="table-add"]').contains('Tisch hinzufügen').click()
        })

        it.skip('should handle unknown error', () => {
            cy.addTableUnknownError()
            cy.visit('/tables')

            cy.get('[data-cy="table-add"]').contains('Tisch hinzufügen').click()

            cy.get('[data-cy="table-modal-tablenumber-input"]').type("a1")

            cy.get('[data-cy="table-save"]').click()

            // TODO: Implement when feature ready
        })

        it.skip('should handle create duplicate tableNumber', () => {
            cy.addDuplicateTable()
            cy.visit('/tables')
            cy.get('[data-cy="table-add"]').contains('Tisch hinzufügen').click()

            cy.get('[data-cy="table-modal-tablenumber-input"]').type("a1")

            cy.get('[data-cy="table-save"]').click()

            // TODO: Implement when feature ready
        })

        it('should handle tableNumber to long (over 8 letters)', () => {
            cy.get('[data-cy="table-modal-tablenumber-input"]').type("123456789")
            cy.get('[data-cy="table-modal"]').click()

            cy.get('[data-cy="table-modal-tablenumber-input-error"]').should('be.visible')
            cy.get('[data-cy="table-modal-tablenumber-input-error"]').contains('Table number cannot be greater than 8 letters')
        })

        it('should handle tableNumber can not be empty', () => {
            cy.get('[data-cy="table-modal-tablenumber-input"]').click()
            cy.get('[data-cy="table-modal"]').click()

            cy.get('[data-cy="table-modal-tablenumber-input-error"]').should('be.visible')
            cy.get('[data-cy="table-modal-tablenumber-input-error"]').contains('Table number must be defined')
        })

        it('should handle capacity to big (over 100)', () => {
            cy.get('[data-cy="table-modal-capacity-input"]').clear().type("101")
            cy.get('[data-cy="table-modal"]').click()

            cy.get('[data-cy="table-modal-capacity-input-error"]').should('be.visible')
            cy.get('[data-cy="table-modal-capacity-input-error"]').contains('Capacity cannot be greater than 100')
        })

        it('should handle capacity can not be 0', () => {
            cy.get('[data-cy="table-modal-capacity-input"]').clear().type("0")
            cy.get('[data-cy="table-modal"]').click()

            cy.get('[data-cy="table-modal-capacity-input-error"]').should('be.visible')
            cy.get('[data-cy="table-modal-capacity-input-error"]').contains('Capacity must be greater than 1')
        })

        it('should handle capacity can not be empty', () => {
            cy.get('[data-cy="table-modal-capacity-input"]').clear().click()
            cy.get('[data-cy="table-modal"]').click()

            cy.get('[data-cy="table-modal-capacity-input-error"]').should('be.visible')
            cy.get('[data-cy="table-modal-capacity-input-error"]').contains('Capacity must be defined')
        })
    })

    describe('Table Edit Errors', () => {
        it('should handle edit duplicate tableNumber', () => {

        })

        it('should handle tableNumber to long (over 8 letters)', () => {

        })

        it('should handle tableNumber can not be empty', () => {

        })

        it('should handle capacity to big (over 100)', () => {

        })

        it('should handle capacity can not be 0', () => {

        })

        it('should handle capacity can not be empty', () => {

        })
    })
})

export { }