import table from '../../fixtures/table.json'
import tables from '../../fixtures/tables.json'

const api = `${Cypress.env("apiUrl")}/tables`

describe('Api Error Handling', () => {
    describe(('General Errors'), () => {
        it('should handle it when database down', () => {
            cy.getTableDatabaseDown()
            cy.visit('/tables')

            cy.get('[data-cy="error-banner"]').should('be.visible')
            cy.get('[data-cy="error-banner"]').contains(`Cannot connect to ${api}!`)
        })

        it('should show empty table content when tables are empty', () => {
            cy.getEmptyTables()
            cy.visit('/tables')

            cy.contains('Erstelle Tische').should('be.visible')
        })

        it('should display table list when after creating a table on empty table content', () => {
            cy.getEmptyTables()
            cy.addTable()
            cy.visit('/tables')

            cy.contains('Tisch hinzufügen').click()

            cy.get('[data-cy="textinput-tableNumber-input"]').type(table.tableNumber)
            cy.get('[data-cy="textinput-capacity-input"]').type(table.capacity.toString())

            cy.get('[data-cy="table-save"]').click()
            cy.wait('@addTable')
            cy.get('[data-cy="table-table-row"]').should('have.length', 1)
        })

        it('should have not have class bg-table-empty when switch to mobile', () => {
            cy.getEmptyTables()
            cy.viewport('iphone-8')
            cy.visit('/tables')

            cy.get('[data-cy="empty-tables-background"]').should('not.have.class', 'bg-table-empty')

            cy.viewport(1920, 1080)
            cy.get('[data-cy="empty-tables-background"]').should('have.class', 'bg-table-empty')
        })
    })

    describe('Table Add Errors', () => {
        beforeEach(() => {
            cy.getTables()
            cy.visit('/tables')

            cy.get('[data-cy="table-add"]').contains('Tisch hinzufügen').click()
        })

        it('should handle create duplicate tableNumber', () => {
            cy.addDuplicateTable()
            cy.visit('/tables')
            cy.get('[data-cy="table-add"]').contains('Tisch hinzufügen').click()

            cy.get('[data-cy="textinput-tableNumber-input"]').type("a1")
            cy.get('[data-cy="textinput-capacity-input"]').type("20")

            cy.get('[data-cy="table-save"]').click()

            cy.get('[data-cy="error-banner"]').should('be.visible').contains('This table number already exists')
        })

        it('should handle tableNumber to long (over 8 letters)', () => {
            cy.get('[data-cy="textinput-tableNumber-input"]').type("123456789").blur()
            cy.get('[data-cy="textinput-tableNumber-form-error"]').should('be.visible').contains('Table number cannot be greater than 8 letters')
        })

        it('should handle tableNumber can not be empty', () => {
            cy.get('[data-cy="textinput-tableNumber-input"]').click().blur()
            cy.get('[data-cy="textinput-tableNumber-form-error"]').should('be.visible').contains('Table number must be defined')
        })

        it('should handle capacity to big (over 100)', () => {
            cy.get('[data-cy="textinput-capacity-input"]').clear().type("101").blur()
            cy.get('[data-cy="textinput-capacity-form-error"]').should('be.visible').contains('Capacity cannot be greater than 100')
        })

        it('should handle capacity can not be 0', () => {
            cy.get('[data-cy="textinput-capacity-input"]').clear().type("0").blur()
            cy.get('[data-cy="textinput-capacity-form-error"]').should('be.visible').contains('Capacity must be greater than 1')
        })

        it('should handle capacity can not be empty', () => {
            cy.get('[data-cy="textinput-capacity-input"]').clear().blur()
            cy.get('[data-cy="textinput-capacity-form-error"]').should('be.visible').contains('Capacity must be defined')
        })
    })

    describe('Table Edit Errors', () => {
        beforeEach(() => {
            cy.getTables()
            cy.visit('/tables')
        })

        it('should handle edit duplicate tableNumber', () => {
            cy.changeToDuplicateTable()
            cy.get('[data-cy="table-table-edit-button-0"]').contains('Bearbeiten').click()

            cy.get('[data-cy="table-table-tablenumber-input-0"]').clear().type(tables[1].tableNumber)

            cy.get('[data-cy="table-table-save-button-0"]').click()

            cy.get('[data-cy="error-banner"]').should('be.visible').contains('This table number already exists')
        })

        it('should handle tableNumber to long (over 8 letters)', () => {
            cy.get('[data-cy="table-table-edit-button-0"]').contains('Bearbeiten').click()

            cy.get('[data-cy="table-table-tablenumber-input-0"]').clear().type("123456789")
            cy.get('[data-cy="table-table-save-button-0"]').click()

            cy.get('[data-cy="table-table-tablenumber-error"]').should('be.visible').contains('Table number cannot be greater than 8 letters')
        })

        it('should handle tableNumber can not be empty', () => {
            cy.get('[data-cy="table-table-edit-button-0"]').contains('Bearbeiten').click()

            cy.get('[data-cy="table-table-tablenumber-input-0"]').clear()
            cy.get('[data-cy="table-table-save-button-0"]').click()

            cy.get('[data-cy="table-table-tablenumber-error"]').should('be.visible').contains('Table number must be defined')
        })

        it('should handle capacity to big (over 100)', () => {
            cy.get('[data-cy="table-table-edit-button-0"]').contains('Bearbeiten').click()

            cy.get('[data-cy="table-table-capacity-input-0"]').clear().type("101")
            cy.get('[data-cy="table-table-save-button-0"]').click()

            cy.get('[data-cy="table-table-capacity-error"]').should('be.visible').contains('Capacity cannot be greater than 100')
        })

        it('should handle capacity can not be 0', () => {
            cy.get('[data-cy="table-table-edit-button-0"]').contains('Bearbeiten').click()

            cy.get('[data-cy="table-table-capacity-input-0"]').clear().type("0")
            cy.get('[data-cy="table-table-save-button-0"]').click()

            cy.get('[data-cy="table-table-capacity-error"]').should('be.visible').contains('Capacity must be greater than 1')
        })

        it('should handle capacity can not be empty', () => {
            cy.get('[data-cy="table-table-edit-button-0"]').contains('Bearbeiten').click()

            cy.get('[data-cy="table-table-capacity-input-0"]').clear()
            cy.get('[data-cy="table-table-save-button-0"]').click()

            cy.get('[data-cy="table-table-capacity-error"]').should('be.visible').contains('Capacity must be defined')
        })
    })

})

export { }

