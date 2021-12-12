import tables from '../../fixtures/tables.json'


describe('Sort', () => {
    beforeEach(() => {
        cy.getTables()
        cy.visit('/tables')
    })

    describe('Tablenumber', () => {
        it.only('should sort ascending', () => {
            tables.map((table, index) => {
                cy.get(`[data-cy="table-table-tablenumber-${index}"]`)
            })
        })

        it('should sort descending when its ascending', () => {

        })

        it('should sort descending', () => {

        })

        it('should sort ascending when its descending', () => {

        })

        it('should display arrow up icon when sort ascending', () => {

        })

        it('should display arrow down icon when sort descending', () => {

        })
    })

    describe('Capacity', () => {
        it('should sort ascending', () => {

        })

        it('should sort descending when its ascending', () => {

        })

        it('should sort descending', () => {

        })

        it('should sort ascending when its descending', () => {

        })

        it('should display arrow up icon when sort ascending', () => {

        })

        it('should display arrow down icon when sort descending', () => {

        })
    })
})

export { }