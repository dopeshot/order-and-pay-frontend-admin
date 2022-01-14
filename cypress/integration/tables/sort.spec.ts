import tables from '../../fixtures/tables.json'
import { getTableNumberAsArray, getCapacitiesAsArray } from '../../support/utils'

describe('Sort', () => {
    beforeEach(() => {
        cy.getTables()
        cy.visit('/tables')
    })

    describe('Tablenumber', () => {
        it('should sort ascending on enter page', () => {
            // Sorted Asc
            cy.get('[data-cy="table-tablenumber-sort-icon"]').should('have.class', 'rotate-0')
            getTableNumberAsArray().then((tableNumbers: any) => {
                const actual = tableNumbers.slice()
                const sortAsc = tableNumbers.sort((a: string, b: string) => a.localeCompare(b))
                cy.wrap(actual).should("deep.eq", sortAsc)
            })
        })

        it('should sort descending when its ascending', () => {
            cy.get('[data-cy="table-tablenumber-sort-button"]').click()

            // Sorted Desc
            cy.get('[data-cy="table-tablenumber-sort-icon"]').should('have.class', 'rotate-180')
            getTableNumberAsArray().then((tableNumbers: any) => {
                const actual = tableNumbers.slice()
                const sortDesc = tableNumbers.sort((a: string, b: string) => b.localeCompare(a))
                cy.wrap(actual).should("deep.eq", sortDesc)
            })
        })

        it('should sort ascending when its descending', () => {
            // Check Sorted Asc
            cy.get('[data-cy="table-tablenumber-sort-icon"]').should('have.class', 'rotate-0')

            // Sort Desc
            cy.get('[data-cy="table-tablenumber-sort-button"]').click()
            cy.get('[data-cy="table-tablenumber-sort-icon"]').should('have.class', 'rotate-180')

            // Sort Asc
            cy.get('[data-cy="table-tablenumber-sort-button"]').click()
            cy.get('[data-cy="table-tablenumber-sort-icon"]').should('have.class', 'rotate-0')
            getTableNumberAsArray().then((tableNumbers: any) => {
                const actual = tableNumbers.slice()
                const sortAsc = tableNumbers.sort((a: string, b: string) => a.localeCompare(b))
                cy.wrap(actual).should("deep.eq", sortAsc)
            })
        })

        it('should display arrow up icon when sort ascending', () => {
            // Check Sorted Asc
            cy.get('[data-cy="table-tablenumber-sort-icon"]').should('have.class', 'rotate-0')
        })

        it('should display arrow down icon when sort descending', () => {
            // Sort Desc
            cy.get('[data-cy="table-tablenumber-sort-button"]').click()

            // Check Sorted Desc
            cy.get('[data-cy="table-tablenumber-sort-icon"]').should('have.class', 'rotate-180')
        })
    })

    describe('Capacity', () => {
        it('should sort ascending', () => {
            // Sort Asc
            cy.get('[data-cy="table-capacity-sort-button"]').click()
            cy.get('[data-cy="table-capacity-sort-icon"]').should('have.class', 'rotate-0')

            getCapacitiesAsArray().then((capacitites: any) => {
                const actual = capacitites.slice()
                const sortAsc = capacitites.sort((a: number, b: number) => a - b)
                cy.wrap(actual).should("deep.eq", sortAsc)
            })
        })

        it('should sort descending when its ascending', () => {
            // Sort Asc
            cy.get('[data-cy="table-capacity-sort-button"]').click()
            cy.get('[data-cy="table-capacity-sort-icon"]').should('have.class', 'rotate-0')

            // Sort Desc
            cy.get('[data-cy="table-capacity-sort-button"]').click()
            cy.get('[data-cy="table-capacity-sort-icon"]').should('have.class', 'rotate-180')

            getCapacitiesAsArray().then((capacitites: any) => {
                const actual = capacitites.slice()
                const sortDesc = capacitites.sort((a: number, b: number) => b - a)
                cy.wrap(actual).should("deep.eq", sortDesc)
            })
        })

        it('should sort ascending when its descending', () => {
            // Sort Asc
            cy.get('[data-cy="table-capacity-sort-button"]').click()
            cy.get('[data-cy="table-capacity-sort-icon"]').should('have.class', 'rotate-0')

            // Sort Desc
            cy.get('[data-cy="table-capacity-sort-button"]').click()
            cy.get('[data-cy="table-capacity-sort-icon"]').should('have.class', 'rotate-180')

            // Sort Asc
            cy.get('[data-cy="table-capacity-sort-button"]').click()
            cy.get('[data-cy="table-capacity-sort-icon"]').should('have.class', 'rotate-0')
            getCapacitiesAsArray().then((capacitites: any) => {
                const actual = capacitites.slice()
                const sortAsc = capacitites.sort((a: number, b: number) => a - b)
                cy.wrap(actual).should("deep.eq", sortAsc)
            })
        })

        it('should display arrow up icon when sort ascending', () => {
            // Sort Asc
            cy.get('[data-cy="table-capacity-sort-button"]').click()
            cy.get('[data-cy="table-capacity-sort-icon"]').should('have.class', 'rotate-0')
        })

        it('should display arrow down icon when sort descending', () => {
            // Sort Asc
            cy.get('[data-cy="table-capacity-sort-button"]').click()
            cy.get('[data-cy="table-capacity-sort-icon"]').should('have.class', 'rotate-0')

            // Sort Desc
            cy.get('[data-cy="table-capacity-sort-button"]').click()
            cy.get('[data-cy="table-capacity-sort-icon"]').should('have.class', 'rotate-180')
        })
    })
})

export { }