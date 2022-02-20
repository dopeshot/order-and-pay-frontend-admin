import tables from '../../fixtures/tables.json'

describe('Bulk Actions', () => {
    beforeEach(() => {
        cy.getTables()
        cy.deleteTable()
        cy.visit('/admin/tables')

        cy.quickLogin()
    })

    describe('Check functionality', () => {
        it('should check one table', () => {
            const index = 0
            cy.get(`[data-cy="table-table-checkbox-${index}"]`).check()

            cy.get(`[data-cy="table-table-checkbox-${index}"]`).should('be.checked')
        })

        it('should mark all-check as not checked when mark one table', () => {
            const index = 0
            cy.get(`[data-cy="table-table-checkbox-${index}"]`).check()

            cy.get(`[data-cy="table-table-checkbox-allcheck"]`).should('not.be.checked')
        })

        it('should mark all-check as checked when mark all tables', () => {
            tables.forEach((table, i) => {
                cy.get(`[data-cy="table-table-checkbox-${i}"]`).check()
            })

            cy.get(`[data-cy="table-table-checkbox-allcheck"]`).should('be.checked')
        })

        it('should mark tables as checked when click all-check (no checked)', () => {
            cy.get(`[data-cy="table-table-checkbox-allcheck"]`).check()

            tables.forEach((table, i) => {
                cy.get(`[data-cy="table-table-checkbox-${i}"]`).should('be.checked')
            })
        })

        it('should unmark table as checked when click all-check (one checked)', () => {
            const index = 0
            cy.get(`[data-cy="table-table-checkbox-${index}"]`).check()

            cy.get(`[data-cy="table-table-checkbox-allcheck"]`).check()

            tables.forEach((table, i) => {
                cy.get(`[data-cy="table-table-checkbox-${i}"]`).should('not.be.checked')
            })
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
            cy.get('[data-cy="table-bulk-dropdown-button"]').contains(0)
        })

        it('should display 1 marked when one table is marked', () => {
            const index = 0
            cy.get(`[data-cy="table-table-checkbox-${index}"]`).check()

            cy.get('[data-cy="table-bulk-dropdown-button"]').contains(1)
        })

        it('should display all marked when every table is marked', () => {
            tables.forEach((table, i) => {
                cy.get(`[data-cy="table-table-checkbox-${i}"]`).check()
            })

            cy.get('[data-cy="table-bulk-dropdown-button"]').contains('Alle')
        })
    })

    describe('Bulk delete', () => {
        it('should delete table one and two when both tables are marked', () => {
            cy.get('[data-cy="table-table-row"]').should('have.length', tables.length)

            let index = 0
            cy.get(`[data-cy="table-table-checkbox-${index}"]`).check()

            index = 1
            cy.get(`[data-cy="table-table-checkbox-${index}"]`).check()

            // Open Dropdown and click delete
            cy.get('[data-cy="table-bulk-dropdown-button"]').click()
            cy.get('[data-cy="table-bulk-dropdown-delete-button"]').click()

            cy.get('[data-cy="table-table-row"]').should('have.length', tables.length - 2)
        })

        it('should delete all tables when all are marked', () => {
            cy.get('[data-cy="table-table-row"]').should('have.length', tables.length)

            // Mark all as checked
            cy.get(`[data-cy="table-table-checkbox-allcheck"]`).check()

            // Open Dropdown and click delete
            cy.get('[data-cy="table-bulk-dropdown-button"]').click()
            cy.get('[data-cy="table-bulk-dropdown-delete-button"]').click()

            cy.get('[data-cy="table-table-row"]').should('not.exist')
        })
    })
})

export { }

