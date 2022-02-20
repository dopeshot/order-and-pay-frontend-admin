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

Cypress.Commands.add('getAllMenus', () => {
    cy.intercept('GET', `${api}/menus`, {
        fixture: 'menus.json'
    }).as('getAllMenus')
})

Cypress.Commands.add('createMenu', () => {
    cy.intercept('POST', `${api}/menus`, {
        fixture: 'menu.json'
    }).as('createMenu')
})

Cypress.Commands.add('createMenuDuplicate', () => {
    cy.intercept('POST', `${api}/menus`, {
        statusCode: 409,
        body: {
            "statusCode": 409,
            "message": "This menu title already exists",
            "error": "Conflict"
        }
    }).as('createMenuDuplicate')
})

Cypress.Commands.add('getMenuById', () => {
    cy.intercept('GET', `${api}/menus/**`, {
        fixture: 'menu.json'
    }).as('getMenuById')
})

Cypress.Commands.add('updateMenu', () => {
    cy.intercept('PATCH', `${api}/menus/**`, {
        fixture: 'update-menu.json'
    }).as('updateMenu')
})

Cypress.Commands.add('deleteMenu', () => {
    cy.intercept('DELETE', `${api}/menus/**`, {
        statusCode: 204
    }).as('deleteMenu')
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

/********* Categories *********/
Cypress.Commands.add('getAllCategories', () => {
    cy.intercept('GET', `${api}/categories`, {
        fixture: 'categories.json'
    }).as('getAllCategories')
})

Cypress.Commands.add('getCategoryById', () => {
    cy.intercept('GET', `${api}/categories/**`, {
        fixture: 'category.json'
    }).as('getCategoryById')
})

Cypress.Commands.add('createCategory', () => {
    cy.intercept('POST', `${api}/categories`, {
        fixture: 'category.json'
    }).as('createCategory')
})

Cypress.Commands.add('updateCategory', () => {
    cy.intercept('PATCH', `${api}/categories/**`, {
        fixture: 'update-category.json'
    }).as('updateCategory')
})

Cypress.Commands.add('deleteCategory', () => {
    cy.intercept('DELETE', `${api}/categories/**`, {
        statusCode: 204
    }).as('deleteCategory')
})

/********* Allergen *********/
Cypress.Commands.add('getAllAllergens', () => {
    cy.intercept('GET', `${api}/allergens`, {
        fixture: 'allergens.json'
    }).as('getAllAllergens')
})

Cypress.Commands.add('getAllAllergensEmpty', () => {
    cy.intercept('GET', `${api}/allergens`, []).as('getAllAllergensEmpty')
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

/********* Labels *********/
Cypress.Commands.add('getAllLabels', () => {
    cy.intercept('GET', `${api}/labels`, {
        fixture: 'labels.json'
    }).as('getAllLabels')
})

Cypress.Commands.add('getAllLabelsEmpty', () => {
    cy.intercept('GET', `${api}/labels`, []).as('getAllLabelsEmpty')
})

Cypress.Commands.add('createLabel', () => {
    cy.intercept('POST', `${api}/labels`, {
        fixture: 'label.json'
    }).as('createLabel')
})

Cypress.Commands.add('createLabelDuplicateTitle', () => {
    cy.intercept('POST', `${api}/labels`, {
        statusCode: 409,
        body: {
            "statusCode": 409,
            "message": "Title is already taken.",
            "error": "Conflict"
        }
    }).as('createLabelDuplicateTitle')
})

Cypress.Commands.add('updateLabel', () => {
    cy.intercept('PATCH', `${api}/labels/**`, {
        fixture: 'update-label.json'
    }).as('updateLabel')
})

Cypress.Commands.add('updateLabelDuplicateTitle', () => {
    cy.intercept('PATCH', `${api}/labels/**`, {
        statusCode: 409,
        body: {
            "statusCode": 409,
            "message": "Title is already taken.",
            "error": "Conflict"
        }
    }).as('updateLabelDuplicateTitle')
})

Cypress.Commands.add('deleteLabel', () => {
    cy.intercept('DELETE', `${api}/labels/**`, {
        statusCode: 204
    }).as('deleteLabel')
})

/********* Login *********/
Cypress.Commands.add('login', () => {
    cy.intercept('POST', `${api}/auth/login`, {
        fixture: 'access_token.json'
    }).as('login')
})

Cypress.Commands.add('getCurrentUser', () => {
    cy.intercept('GET', `${api}/users/profile`, {
        fixture: 'current-user.json'
    }).as('getCurrentUser')
})

Cypress.Commands.add('quickLogin', () => {
    cy.overmind().its('actions').invoke('auth.loginTest')
})

/********* Overmind *********/
Cypress.Commands.add('overmind', () => {
    let overmind: any

    const cmd = Cypress.log({
        name: 'overmind',
        consoleProps() {
            return {
                Overmind: overmind
            }
        }
    })

    return (
        cy.window().then((window: any) => {
            overmind = window.overmind
            cmd.end()
            return overmind
        })
    )
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

