const api = `${Cypress.env("apiUrl")}`

/********* Tables *********/
Cypress.Commands.add('getTables', () => {
    cy.intercept('GET', `${api}/tables`, {
        fixture: 'tables.json'
    }).as('getTables')
})

Cypress.Commands.add('getEmptyTables', () => {
    cy.intercept('GET', `${api}/tables`, []).as('getEmptyTables')
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

Cypress.Commands.add('getCapacityTables', () => {
    cy.intercept('GET', `${api}/tables`, {
        fixture: 'capacity-tables.json'
    }).as('getCapacityTables')
})

Cypress.Commands.add('addDuplicateTable', () => {
    cy.intercept('POST', `${api}/tables`, {
        statusCode: 409,
        body: {
            "statusCode": 409,
            "message": "This table number already exists",
            "error": "Conflict"
        }
    }).as('addDuplicateTable')
})

Cypress.Commands.add('addTableUnknownError', () => {
    cy.intercept('POST', `${api}/tables`, {
        statusCode: 500
    }).as('addTableUnknownError')
})

Cypress.Commands.add('getTableDatabaseDown', () => {
    cy.intercept('GET', `${api}/tables`, {
        forceNetworkError: true
    }).as('getTableDatabaseDown')
})

Cypress.Commands.add('changeToDuplicateTable', () => {
    cy.intercept('PATCH', `${api}/tables/**`, {
        statusCode: 409,
        body: {
            "statusCode": 409,
            "message": "This table number already exists",
            "error": "Conflict"
        }
    }).as('changeToDuplicateTable')
})

/********** Menu ***********/
Cypress.Commands.add('getMenuOverviewEditor', () => {
    cy.intercept('GET', `${api}/menus/**/editor`, {
        fixture: 'menu-overview.json'
    }).as('getMenuOverviewEditor')
})

/********* Dishes *********/
Cypress.Commands.add('createDish', () => {
    cy.intercept('POST', `${api}/dishes`, {
        fixture: 'dish.json'
    }).as('createDish')
})

Cypress.Commands.add('createDishDuplicate', () => {
    cy.intercept('POST', `${api}/dishes`, {
        statusCode: 409,
        body: {
            "statusCode": 409,
            "message": "This category title already exists",
            "error": "Conflict"
        }
    }).as('createDishDuplicate')
})

Cypress.Commands.add('getDishById', () => {
    cy.intercept('GET', `${api}/dishes/**`, {
        fixture: 'dish.json'
    }).as('getDishById')
})

Cypress.Commands.add('updateDish', () => {
    cy.intercept('PATCH', `${api}/dishes/**`, {
        fixture: 'dish.json'
    }).as('updateDish')
})

Cypress.Commands.add('deleteDish', () => {
    cy.intercept('DELETE', `${api}/dishes/**`, {
        statusCode: 204
    }).as('deleteDish')
})

Cypress.Commands.add('getAllCategories', () => {
    cy.intercept('GET', `${api}/categories`, {
        fixture: 'categories.json'
    }).as('getAllCategories')
})

Cypress.Commands.add('getAllLabels', () => {
    cy.intercept('GET', `${api}/labels`, {
        fixture: 'labels.json'
    }).as('getAllLabels')
})

Cypress.Commands.add('getAllAllergens', () => {
    cy.intercept('GET', `${api}/allergens`, {
        fixture: 'allergens.json'
    }).as('getAllAllergens')
})

/********* Users *********/
Cypress.Commands.add('getAllUser', () => {
    cy.intercept('GET', `${api}/users`, {
        fixture: 'users.json'
    }).as('getAllUser')
})

Cypress.Commands.add('createUser', () => {
    cy.intercept('POST', `${api}/auth/register`, {
        fixture: 'access_token.json'
    }).as('createUser')
})

Cypress.Commands.add('createUserDuplicateEmail', () => {
    cy.intercept('POST', `${api}/auth/register`, {
        statusCode: 409,
        body: {
            "statusCode": 409,
            "message": "Username is already taken.",
            "error": "Conflict"
        }
    }).as('createUserDuplicateEmail')
})

Cypress.Commands.add('createUserDuplicateUsername', () => {
    cy.intercept('POST', `${api}/auth/register`, {
        statusCode: 409,
        body: {
            "statusCode": 409,
            "message": "Email is already taken.",
            "error": "Conflict"
        }
    }).as('createUserDuplicateUsername')
})

Cypress.Commands.add('updateUser', () => {
    cy.intercept('PATCH', `${api}/users/**`, {
        fixture: 'update-user.json'
    }).as('updateUser')
})

Cypress.Commands.add('updateUserDuplicateUsername', () => {
    cy.intercept('PATCH', `${api}/users/**`, {
        statusCode: 409,
        body: {
            "statusCode": 409,
            "message": "Username is already taken.",
            "error": "Conflict"
        }
    }).as('updateUserDuplicateUsername')
})

Cypress.Commands.add('updateUserDuplicateEmail', () => {
    cy.intercept('PATCH', `${api}/users/**`, {
        statusCode: 409,
        body: {
            "statusCode": 409,
            "message": "Email is already taken.",
            "error": "Conflict"
        }
    }).as('updateUserDuplicateEmail')
})

Cypress.Commands.add('deleteUser', () => {
    cy.intercept('DELETE', `${api}/users/**`, {
        statusCode: 204
    }).as('deleteUser')
})




export { }

