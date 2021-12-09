/// <reference types="cypress" />

describe('Tables Overview', () => {
    it('Should open table overview page', () => {
      cy.visit('http://localhost:3000/admin/tables')

      cy.contains('Tische')
    })
  })