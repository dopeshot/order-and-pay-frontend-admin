const api = `${Cypress.env("apiUrl")}`

/* Table */
const tableStub = {
    "_id": "61b0c0ae5f663549ece58312",
    "createdBy": "Demo",
    "tableNumber": "7",
    "capacity": 2,
    "createdAt": "2021-12-08T14:26:54.121Z"
}

const updateTableStub = {
    "_id": "61b0c0ae5f663549ece58312",
    "createdBy": "Demo",
    "tableNumber": "10",
    "capacity": 20,
    "createdAt": "2021-12-08T14:26:54.121Z"
}

Cypress.Commands.add('getTables', () => {
    cy.intercept('GET', `${api}/tables`, {
        fixture: 'tables.json'
    }).as('getTables')
})

Cypress.Commands.add('addTable', () => {
    cy.intercept('POST', `${api}/tables`, {
        body: tableStub,
    }).as('addTable')
})

Cypress.Commands.add('patchTable', () => {
    cy.intercept('PATCH', `${api}/tables/**`, {
        body: updateTableStub,
    }).as('patchTable')
})

Cypress.Commands.add('deleteTable', () => {
    cy.intercept('DELETE', `${api}/tables/**`, {
        statusCode: 204
    }).as('deleteTable')
})