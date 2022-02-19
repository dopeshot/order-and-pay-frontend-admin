import capacityTables from '../../fixtures/capacity-tables.json'

describe('Capacity Icons', () => {
    beforeEach(() => {
        cy.getCapacityTables()
        cy.visit('/admin/tables')

        cy.quickLogin()
    })

    it('should show icons depending on the capacity', () => {
        const index = 0
        const length = capacityTables[index].capacity

        cy.get(`[data-cy="table-table-capacityicon-${index}"]`).should('have.length', length)
    })

    it('should show all icons until 20', () => {
        let index = 1
        const length = capacityTables[index].capacity

        cy.get(`[data-cy="table-table-capacityicon-${index}"]`).should('have.length', length)
        cy.get(`[data-cy="table-table-capacityicon-${index}-last"]`).should('not.exist')

        index = 2
        cy.get(`[data-cy="table-table-capacityicon-${index}"]`).should('have.length', length)
    })

    it('should show the 21th icon with gradient', () => {
        const index = 2

        cy.get(`[data-cy="table-table-capacityicon-${index}"]`).should('have.length', 20)
        cy.get(`[data-cy="table-table-capacityicon-${index}-last"]`).should('be.visible')
    })

    it('should not show icons on mobile', () => {
        cy.viewport('iphone-8')
        cy.get(`[data-cy="table-table-capacityicon-0"]`).should('not.exist')
    })
})

export { }

