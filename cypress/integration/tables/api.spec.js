import { interceptIndefinitely } from '../../support/utils.ts';

const api = `${Cypress.env("apiUrl")}/tables`

describe('Api Endpoints', () => {
  beforeEach(() => {
    cy.visit('/tables')
  })

  describe('Get Tables', () => {
    it('should show the loading spinner when load table data and hide afterwards', () => {
      const interception = interceptIndefinitely(api)

      cy.visit('/tables')

      cy.get('#table-spinner').should('be.visible').then(() => {
        interception.sendResponse()
        cy.get('#table-spinner').should('not.exist')
        cy.get('tbody tr').should('be.visible')
      });
    })

    it('should list all tables', () => {
      cy.get('tbody tr').should('have.length', 4)
    })
  })
})