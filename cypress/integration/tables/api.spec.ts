import table from '../../fixtures/table.json';
import updateTable from '../../fixtures/update-table.json';
import { interceptIndefinitely } from '../../support/utils';

const api = `${Cypress.env("apiUrl")}/tables`

describe('Api Endpoints', () => {
  beforeEach(() => {
    cy.getTables()
    cy.addTable()
    cy.patchTable()
    cy.deleteTable()

    cy.visit('/tables')
  })

  describe('Get Tables', () => {
    it('should show the loading spinner when load table data and hide afterwards', () => {
      const interception = interceptIndefinitely('GET', api, 'getTableIndefinitely', { fixture: 'tables.json' })

      cy.visit('/tables')

      cy.get('[data-cy="table-spinner"]').should('be.visible').then(() => {
        interception.sendResponse()
        cy.wait('@getTableIndefinitely')
        cy.get('[data-cy="table-spinner"]').should('not.exist')
        cy.get('[data-cy="table-table-row"]').should('be.visible')
      })
    })

    it('should list all tables', () => {
      cy.wait('@getTables')
      cy.get('[data-cy="table-table-row"]').should('have.length', 4)
    })

    it('should load tables again when click on loadicon', () => {
      const interception = interceptIndefinitely('GET', api, 'getTableIndefinitely', { fixture: 'tables.json' })

      cy.get('[data-cy="table-table-load-iconbutton"]').click()

      cy.get('[data-cy="table-spinner"]').should('be.visible').then(() => {
        interception.sendResponse()
        cy.wait('@getTableIndefinitely')
        cy.get('[data-cy="table-spinner"]').should('not.exist')
        cy.get('[data-cy="table-table-row"]').should('be.visible')
      })
    })
  })

  describe('Create Table', () => {
    beforeEach(() => {
      cy.get('[data-cy="table-add"]').contains('Tisch hinzufügen').click()
    })

    it('should open add table modal', () => {
      cy.get('[data-cy="table-modal"]').should('be.visible')
    })

    it('should create one table using only input', () => {
      cy.get('[data-cy="table-table-row"]').should('have.length', 4)

      cy.get('[data-cy="table-modal-tablenumber-input"]').type(table.tableNumber)
      cy.get('[data-cy="table-modal-capacity-input"]').type(table.capacity.toString())

      cy.get('[data-cy="table-save"]').click()
      cy.wait('@addTable')
      cy.get('[data-cy="table-table-row"]').should('have.length', 5)
    })

    it('should create one table using input and quick people count', () => {
      cy.get('[data-cy="table-table-row"]').should('have.length', 4)

      cy.get('[data-cy="table-modal-tablenumber-input"]').type(table.tableNumber)
      cy.get('[data-cy="capacity-quick-2"]').click()

      cy.get('[data-cy="table-save"]').click()
      cy.wait('@addTable')
      cy.get('[data-cy="table-table-row"]').should('have.length', 5)
    })

    it('should close add table modal because of clicking outside the element', () => {
      cy.get('[data-cy="table-modal-background"]').click({ force: true })
      cy.get('[data-cy="table-modal"]').should('not.exist')
    })

    it('should close add table modal because of clicking cancel button', () => {
      cy.get('[data-cy="table-cancel"]').click()
      cy.get('[data-cy="table-modal"]').should('not.exist')
    })

    it('should have disabled state when inputs are wrong', () => {
      cy.get('[data-cy="table-modal-capacity-input"]').type("0")
      cy.get('[data-cy="table-modal"]').click()

      cy.get('[data-cy="table-save"]').should('have.class', 'opacity-80')
    })

    it('should have disabled state when inputs are empty', () => {
      cy.get('[data-cy="table-save"]').should('have.class', 'opacity-80')

      cy.get('[data-cy="table-modal-tablenumber-input"]').type(table.tableNumber)
      cy.get('[data-cy="table-modal-capacity-input"]').type(table.capacity.toString())

      cy.get('[data-cy="table-save"]').should('not.have.class', 'opacity-80')
    })

    it('should have loading icon when sending', () => {
      const interception = interceptIndefinitely('POST', api, "createTableIndefinitely", { fixture: 'table.json' })

      cy.get('[data-cy="table-modal-tablenumber-input"]').type(table.tableNumber)
      cy.get('[data-cy="table-modal-capacity-input"]').type(table.capacity.toString())

      cy.get('[data-cy="table-save"] svg').should('be.visible').then(() => {
        cy.get('[data-cy="table-save"]').click()
        cy.get('[data-cy="table-save"] svg').should('have.class', 'fa-spinner')
        interception.sendResponse()
        cy.wait('@createTableIndefinitely')
      })
    })
  })

  describe('Update Table', () => {
    beforeEach(() => {
      cy.get('[data-cy="table-table-edit-button-0"]').click()
    })

    it('should change to edit mode for the first table', () => {
      cy.get('[data-cy="table-table-tablenumber-input-0"]').should('be.visible')
      cy.get('[data-cy="table-table-capacity-input-0"]').should('be.visible')
    })

    it('should edit the first table', () => {
      cy.get('input[data-cy="table-table-tablenumber-input-0"]').clear().type(updateTable.tableNumber)
      cy.get('input[data-cy="table-table-capacity-input-0"]').clear().type(updateTable.capacity.toString())

      cy.get('[data-cy="table-table-save-button-0"]').click()
      cy.wait('@patchTable')

      cy.get('[data-cy="table-table-tablenumber-0"]').contains(updateTable.tableNumber)
      cy.get('[data-cy="table-table-capacity-0"]').contains(updateTable.capacity)
    })

    it('should have disabled state when inputs are wrong', () => {
      cy.get('[data-cy="table-table-tablenumber-input-0"]').clear()
      cy.get('[data-cy="table-table-save-button-0"]').should('have.class', 'text-opacity-60')

      cy.get('[data-cy="table-table-tablenumber-input-0"]').type(updateTable.tableNumber)

      cy.get('[data-cy="table-table-save-button-0"]').should('not.have.class', 'text-opacity-60')
    })

    it('should have loading icon when sending', () => {
      const interception = interceptIndefinitely('PATCH', `${api}/**`, 'patchTableIndefinitely', { fixture: 'table.json' })

      cy.get('input[data-cy="table-table-tablenumber-input-0"]').clear().type(updateTable.tableNumber)
      cy.get('input[data-cy="table-table-capacity-input-0"]').clear().type(updateTable.capacity.toString())

      cy.get('[data-cy="table-table-save-button-0"] svg').should('be.visible').then(() => {
        cy.get('[data-cy="table-table-save-button-0"]').click()
        cy.get('[data-cy="table-table-save-button-0"] svg').should('have.class', 'fa-spinner')
        interception.sendResponse()
        cy.wait('@patchTableIndefinitely')
      })
    })
  })

  describe('Delete Table', () => {
    it('should open delete dropdown for the first table', () => {
      cy.get('[data-cy="table-table-delete-iconbutton-0"]').click()

      cy.get('[data-cy="table-table-delete-dropdown-0"]').should('be.visible')
    })

    it('should close delete dropdown for the first table when click outside', () => {
      // Open dropdown
      cy.get('[data-cy="table-table-delete-iconbutton-0"]').click()

      cy.get('[data-cy="table-table-delete-background-0"]').click()

      cy.get('[data-cy="table-table-delete-dropdown-0"]').should('not.exist')
    })

    it('should delete the first table', () => {
      cy.get('[data-cy="table-table-row"]').should('have.length', 4)
      cy.get('[data-cy="table-table-delete-iconbutton-0"').click()

      cy.get('[data-cy="table-table-delete-button-0"]').click()
      cy.wait('@deleteTable')

      cy.get('[data-cy="table-table-row"]').should('have.length', 3)
    })
  })
})

export { };

