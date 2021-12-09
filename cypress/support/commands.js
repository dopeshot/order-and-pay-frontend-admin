const api = `${Cypress.env("apiUrl")}`

/* Table */
const tableStub = {
    "_id": "61b0c0ae5f663549ece58312",
    "createdBy": "Demo",
    "tableNumber": "7",
    "capacity": 2,
    "createdAt": "2021-12-08T14:26:54.121Z"
}

Cypress.Commands.add('getTables', () => {
    cy.intercept('GET', `${api}/tables`, { fixture: 'tables.json' }).as('getTables')
})

Cypress.Commands.add('addTable', () => {
    cy.intercept('POST', `${api}/tables`, {
        body: tableStub,
    }).as('getTables')
})