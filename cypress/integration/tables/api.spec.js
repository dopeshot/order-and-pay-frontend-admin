import { interceptIndefinitely } from '../../support/utils.ts';

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
      const interception = interceptIndefinitely(api)

      cy.getTables()
      cy.visit('/tables')

      cy.get('[data-cy="table-spinner"]').should('be.visible').then(() => {
        interception.sendResponse()
        cy.wait('@getTables')
        cy.get('[data-cy="table-spinner"]').should('not.exist')
        cy.get('tbody tr').should('be.visible')
      });
    })

    it('should list all tables', () => {
      cy.wait('@getTables')
      cy.get('tbody tr').should('have.length', 6)
    })
  })

  describe('Create Table', () => {
    beforeEach(() => {
      cy.get('button#table-add').contains('Tisch hinzufügen').click()
    })

    it('should open add table modal', () => {
      cy.get('#table-modal').should('be.visible')
    })

    it('should create one table using only input', () => {
      cy.get('input#tablenumber').type('7')
      cy.get('input#peopleCount').type('2')

      cy.get('button#table-save').click()
      cy.wait('@addTable')
      cy.get('tbody tr').should('have.length', 7)
    })

    it('should create one table using input and quick people count', () => {
      cy.get('input#tablenumber').type('7')
      cy.get('#peoplecount-quick-0').click()

      cy.get('button#table-save').click()
      cy.wait('@addTable')
      cy.get('tbody tr').should('have.length', 7)
    })

    it('should close add table modal because of clicking outside the element', () => {
      cy.get('#table-modal-background').click({ force: true })
      cy.get('#table-modal').should('not.exist')
    })

    it('should close add table modal because of clicking cancel button', () => {
      cy.get('button#table-cancel').click()
      cy.get('#table-modal').should('not.exist')
    })
  })

  describe('Update Table', () => {
    it('should change to edit mode for the first table', () => {
      cy.get('#table-table-row-0 td > button').as('editButton').click()

      cy.get('#table-table-row-0 #tablenumber-0').should('be.visible')
      cy.get('#table-table-row-0 #tablecapacity-0').should('be.visible')
    })

    it('should edit the first table', () => {
      cy.get('#table-table-row-0 td > button').as('editButton').click()

      cy.get('#table-table-row-0 #tablenumber-0').clear().type(10)
      cy.get('#table-table-row-0 #tablecapacity-0').clear().type(20)
      
      cy.get('#table-table-row-0 td > button').as('saveButton').click()
      cy.wait('@patchTable')

      cy.get('#table-table-row-0 td:nth-of-type(2)').as('tablenumber').contains(10)
      cy.get('#table-table-row-0 td div p').as('tablecapacity').contains(20)
    })
  })

  describe('Delete Table', () => {
    it('should open delete dropdown for the first table', () => {
      cy.get('#table-table-row-0 td.text-lightgrey div button').as('dotsicon').click()

      cy.get('#table-table-row-0 #table-delete-dropdown').should('be.visible')
    })

    it.only('should delete the first table', () => {
      cy.get('#table-table-row-0 td.text-lightgrey div button').as('dotsicon').click()

      cy.get('#table-table-row-0 #table-delete-dropdown').click()
      cy.wait('@deleteTable')

      //cy.get('tbody tr').should('have.length', 5)
    })
  })
})