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

/********* Allergen *********/
Cypress.Commands.add('getAllAllergens', () => {
    cy.intercept('GET', `${api}/allergens`, {
        fixture: 'allergens.json'
    }).as('getAllAllergens')
})

Cypress.Commands.add('createAllergen', () => {
    cy.intercept('POST', `${api}/allergens`, {
        fixture: 'allergen.json'
    }).as('createAllergen')
})

Cypress.Commands.add('createAllergenDuplicateTitle', () => {
    cy.intercept('POST', `${api}/allergens`, {
        statusCode: 409,
        body: {
            "statusCode": 409,
            "message": "Title is already taken.",
            "error": "Conflict"
        }
    }).as('createAllergenDuplicateTitle')
})

Cypress.Commands.add('updateAllergen', () => {
    cy.intercept('PATCH', `${api}/allergens/**`, {
        fixture: 'update-allergen.json'
    }).as('updateAllergen')
})

Cypress.Commands.add('updateAllergenDuplicateTitle', () => {
    cy.intercept('PATCH', `${api}/allergens/**`, {
        statusCode: 409,
        body: {
            "statusCode": 409,
            "message": "Title is already taken.",
            "error": "Conflict"
        }
    }).as('updateAllergenDuplicateTitle')
})

Cypress.Commands.add('deleteAllergen', () => {
    cy.intercept('DELETE', `${api}/allergens/**`, {
        statusCode: 204
    }).as('deleteAllergen')
})



export { }

