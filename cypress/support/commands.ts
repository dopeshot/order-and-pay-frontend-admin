const api = `${Cypress.env("apiUrl")}`

Cypress.Commands.add('getTables', () => {
    cy.intercept('GET', `${api}/tables`, {
        fixture: 'tables.json'
    }).as('getTables')
})

Cypress.Commands.add('addTable', () => {
    cy.intercept('POST', `${api}/tables`, {
        fixture: 'table.json'
    }).as('addTable')
})

Cypress.Commands.add('patchTable', () => {
    cy.intercept('PATCH', `${api}/tables/**`, {
        fixture: 'update-table.json'
    }).as('patchTable')
})

Cypress.Commands.add('deleteTable', () => {
    cy.intercept('DELETE', `${api}/tables/**`, {
        statusCode: 204
    }).as('deleteTable')
})

export { }