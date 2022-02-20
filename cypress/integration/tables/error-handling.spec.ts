import table from '../../fixtures/table.json'
import tables from '../../fixtures/tables.json'

describe('Api Error Handling', () => {
    describe('General Errors', () => {
        it('should show empty table content when tables are empty', () => {
            cy.getEmptyTables()
            cy.visit('/admin/tables')

            cy.quickLogin()

            cy.contains('Erstelle Tische').should('be.visible')
        })

        it('should display table list when after creating a table on empty table content', () => {
            cy.getEmptyTables()
            cy.addTable()
            cy.visit('/admin/tables')

            cy.quickLogin()

            cy.wait('@getEmptyTables')

            cy.contains('Tisch hinzufügen').click()

            cy.get('[data-cy="textinput-tableNumber-input"]').type(table.tableNumber)
            cy.get('[data-cy="textinput-capacity-input"]').type(table.capacity.toString())

            cy.get('[data-cy="table-save"]').click()
            cy.wait('@addTable')
            cy.get('[data-cy="table-table-row"]').should('have.length', 1)
        })
    })

    describe('Table Add Errors', () => {
        beforeEach(() => {
            cy.getTables()
            cy.visit('/admin/tables')

            cy.quickLogin()

            cy.get('[data-cy="table-add"]').contains('Tisch hinzufügen').click()
        })

        it('should handle create duplicate tableNumber', () => {
            cy.addDuplicateTable()
            cy.visit('/admin/tables')

            cy.quickLogin()

            cy.get('[data-cy="table-add"]').contains('Tisch hinzufügen').click()

            cy.get('[data-cy="textinput-tableNumber-input"]').type("a1")
            cy.get('[data-cy="textinput-capacity-input"]').type("20")

            cy.get('[data-cy="table-save"]').click()

            cy.contains('This table number already exists').should('be.visible')
        })

        it('should handle tableNumber to long (over 8 letters)', () => {
            cy.get('[data-cy="textinput-tableNumber-input"]').type('a'.repeat(9)).blur()
            cy.get('[data-cy="textinput-tableNumber-form-error"]').should('contain', 'Die Tischnummer darf nicht länger als 8 Zeichen sein.')
        })

        it('should handle tableNumber can not be empty', () => {
            cy.get('[data-cy="textinput-tableNumber-input"]').click().blur()
            cy.get('[data-cy="textinput-tableNumber-form-error"]').should('contain', 'Dies ist ein Pflichtfeld.')
        })

        it('should handle capacity to big (over 100)', () => {
            cy.get('[data-cy="textinput-capacity-input"]').clear().type("101").blur()
            cy.get('[data-cy="textinput-capacity-form-error"]').should('contain', 'Die Personenanzahl darf nicht größer als 100 sein.')
        })

        it('should handle capacity can not be 0', () => {
            cy.get('[data-cy="textinput-capacity-input"]').clear().type("0").blur()
            cy.get('[data-cy="textinput-capacity-form-error"]').should('contain', 'Die Personenanzahl muss mindestens 1 sein.')
        })

        it('should handle capacity can not be empty', () => {
            cy.get('[data-cy="textinput-capacity-input"]').clear().blur()
            cy.get('[data-cy="textinput-capacity-form-error"]').should('contain', 'Dies ist ein Pflichtfeld.')
        })
    })

    describe('Table Edit Duplicate', () => {
        it('should handle edit duplicate tableNumber', () => {
            cy.getTables()
            cy.visit('/admin/tables')

            cy.quickLogin()

            cy.changeToDuplicateTable()
            cy.get('[data-cy="table-table-edit-button-0"]').contains('Bearbeiten').click()

            cy.get('[data-cy="table-table-tablenumber-input-0"]').clear().type(tables[1].tableNumber)

            cy.get('[data-cy="table-table-save-button-0"]').click()

            cy.contains('This table number already exists').should('be.visible')
        })
    })

    describe('Table Edit Errors', () => {
        beforeEach(() => {
            cy.getTables()
            cy.visit('/admin/tables')

            cy.quickLogin()

            cy.get('[data-cy="table-table-edit-button-0"]').contains('Bearbeiten').click()
        })

        it('should handle tableNumber to long (over 8 letters)', () => {
            cy.get('[data-cy="table-table-tablenumber-input-0"]').clear().type("123456789").blur()
            cy.get('[data-cy="table-table-tablenumber-error"]').should('contain', 'Die Tischnummer darf nicht länger als 8 Zeichen sein.')
        })

        it('should handle tableNumber can not be empty', () => {
            cy.get('[data-cy="table-table-tablenumber-input-0"]').clear().blur()
            cy.get('[data-cy="table-table-tablenumber-error"]').should('contain', 'Dies ist ein Pflichtfeld.')
        })

        it('should handle capacity to big (over 100)', () => {
            cy.get('[data-cy="table-table-capacity-input-0"]').clear().type("101").blur()
            cy.get('[data-cy="table-table-capacity-error"]').should('contain', 'Die Personenanzahl darf nicht größer als 100 sein.')
        })

        it('should handle capacity can not be 0', () => {
            cy.get('[data-cy="table-table-capacity-input-0"]').clear().type("0").blur()
            cy.get('[data-cy="table-table-capacity-error"]').should('contain', 'Die Personenanzahl muss mindestens 1 sein.')
        })

        it('should handle capacity can not be empty', () => {
            cy.get('[data-cy="table-table-capacity-input-0"]').clear().blur()
            cy.get('[data-cy="table-table-capacity-error"]').should('contain', 'Dies ist ein Pflichtfeld.')
        })
    })

})

export { }

