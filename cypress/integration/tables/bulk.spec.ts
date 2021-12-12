describe('Bulk Actions', () => {
    beforeEach(() => {
        cy.getTables()
        cy.deleteTable()
        cy.visit('/tables')
    })

    describe('Check functionality', () => {
        it('should check one table', () => {

        })

        it('should mark all-check as not checked when mark one table', () => {

        })

        it('should mark all-check as checked when mark all tables', () => {

        })

        it('should mark tables as checked when click all-check (no checked)', () => {

        })

        it('should unmark table as checked when click all-check (one checked)', () => {

        })
    })

    describe('Bulk Dropdown', () => {
        it('should open bulk dropdown', () => {
            cy.get('[data-cy="table-bulk-dropdown-button"]').click()

            cy.get('[data-cy="table-bulk-dropdown"]').should('be.visible')
        })

        it('should close bulk dropdown when click outside', () => {
            // Open dropdown
            cy.get('[data-cy="table-bulk-dropdown-button"]').click()

            cy.get('[data-cy="table-bulk-dropdown-background"]').click()

            cy.get('[data-cy="table-bulk-dropdown"]').should('not.exist')
        })

        it('should display 0 marked when no table is marked', () => {

        })

        it('should display 1 marked when one table is marked', () => {

        })

        it('should display all marked when every table is marked', () => {

        })
    })

    describe('Bulk delete', () => {

    })
})

export { }