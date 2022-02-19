// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import '@cypress/code-coverage/support'
import './commands.ts'

/// <reference types="cypress" />

declare global {
    namespace Cypress {
        interface Chainable {
            /**
             * Custom command to intercept all getTables request 
             * @example cy.getTables()
             */
            getTables(): void

            /**
             * Custom command to intercept all getTables request with empty response
             * @example cy.getEmptyTables()
             */
            getEmptyTables(): void

            /**
             * Custom command to intercept all addTable request
             * @example cy.addTable()
             */
            addTable(): void

            /**
            * Custom command to intercept all patchTable request 
            * @example cy.patchTable()
            */
            patchTable(): void

            /**
             * Custom command to intercept all deleteTable request
             * @example cy.deleteTable()
             */
            deleteTable(): void

            /**
             * Custom command to intercept all getTables request for testing the capacity icons
             * @example cy.getCapacityTables()
             */
            getCapacityTables(): void

            /**
             * Custom command to intercept all addTables duplicate errror request
             * @example cy.addDuplicateTable()
             */
            addDuplicateTable(): void

            /**
             * Custom command to intercept all addTables errror request
             * @example cy.addTableUnknownError()
             */
            addTableUnknownError(): void

            /**
             * Custom command to intercept all getTable errror request database down
             * @example cy.getTableDatabaseDown()
             */
            getTableDatabaseDown(): void

            /**
             * Custom command to intercept all change table errror request when patch leads to duplicate table
             * @example cy.changeToDuplicateTable()
             */
            changeToDuplicateTable(): void

            /**
             * Custom command to intercept all getMenuOverviewEditor requests
             * @example cy.getMenuOverviewEditor()
             */
            getMenuOverviewEditor(): void

            /**
             * Custom command to intercept all get all menus requests
             * @example cy.getAllMenus()
             */
            getAllMenus(): void

            /**
             * Custom command to intercept all create menu requests
             * @example cy.createMenu()
             */
            createMenu(): void

            /**
             * Custom command to intercept all create menu requests give duplicate error back
             * @example cy.createMenuDuplicate()
             */
            createMenuDuplicate(): void

            /**
             * Custom command to intercept all get menu by id requests
             * @example cy.getMenuById()
             */
            getMenuById(): void

            /**
             * Custom command to intercept all update menu by id requests
             * @example cy.updateMenu()
             */
            updateMenu(): void

            /**
             * Custom command to intercept all delete menu requests
             * @example cy.deleteDish()
             */
            deleteMenu(): void

            /**
             * Custom command to intercept all create dish requests
             * @example cy.createDish()
             */
            createDish(): void

            /**
             * Custom command to intercept all create dish requests give duplicate error back
             * @example cy.createDishDuplicate()
             */
            createDishDuplicate(): void

            /**
             * Custom command to intercept all get dish by id requests
             * @example cy.getDishById()
             */
            getDishById(): void

            /**
             * Custom command to intercept all update dish by id requests
             * @example cy.updateDish()
             */
            updateDish(): void

            /**
             * Custom command to intercept all delete dish requests
             * @example cy.deleteDish()
             */
            deleteDish(): void

            /**
             * Custom command to intercept all get all categories request
             * @example cy.getAllCategories()
             */
            getAllCategories(): void

            /**
             * Custom command to intercept all get all allergens request
             * @example cy.getAllAllergens()
             */
            getAllAllergens(): void

            /**
            * Custom command to intercept all create allergen request
            * @example cy.createAllergen()
            */
            createAllergen(): void

            /**
            * Custom command to intercept all create allergen request with duplicate title
            * @example cy.createAllergenDuplicateTitle()
            */
            createAllergenDuplicateTitle(): void

            /**
            * Custom command to intercept all update allergen request
            * @example cy.updateAllergen()
            */
            updateAllergen(): void

            /**
            * Custom command to intercept all update allergen request with duplicate title
            * @example cy.updateAllergenDuplicateTitle()
            */
            updateAllergenDuplicateTitle(): void

            /**
            * Custom command to intercept all delete allergen request
            * @example cy.deleteAllergen()
            */
            deleteAllergen(): void


            /**
             * Custom command to intercept all get all labels request
             * @example cy.getAllLabels()
             */
            getAllLabels(): void

            /**
            * Custom command to intercept all login request
            * @example cy.login()
            */
            login(): void

            /**
            * Custom command to intercept all profile request
            * @example cy.getCurrentUser()
            */
            getCurrentUser(): void

            /**
             * Custom command to get overmind window object
             * @overmind cy.overmind()
             */
            overmind(): Chainable

            /**
             * Custom command to login without username and password
             * @overmind cy.easyLogin()
             */
            easyLogin(): void

            /**
            * Custom command to intercept all get all users requests
            * @example cy.getAllUser()
            */
            getAllUser(): void

            /**
            * Custom command to intercept all create user request
            * @example cy.createUser()
            */
            createUser(): void

            /**
            * Custom command to intercept all create user request with duplicate email 
            * @example cy.createUserDuplicateEmail()
            */
            createUserDuplicateEmail(): void

            /**
            * Custom command to intercept all create user request with duplicate username 
            * @example cy.createUserDuplicateUsername()
            */
            createUserDuplicateUsername(): void

            /**
            * Custom command to intercept all update user request
            * @example cy.updateUser()
            */
            updateUser(): void

            /**
            * Custom command to intercept all update user request with duplicate email 
            * @example cy.createUserDuplicateEmail()
            */
            updateUserDuplicateEmail(): void

            /**
            * Custom command to intercept all update user request with duplicate username 
            * @example cy.createUserDuplicateUsername()
            */
            updateUserDuplicateUsername(): void

            /**
            * Custom command to intercept all delete user request
            * @example cy.deleteUser()
            */
            deleteUser(): void

            /*
            * Custom command to intercept all create label request
            * @example cy.createLabel()
            */
            createLabel(): void

            /**
            * Custom command to intercept all create label request with duplicate title
            * @example cy.createLabelDuplicateTitle()
            */
            createLabelDuplicateTitle(): void

            /**
            * Custom command to intercept all update label request
            * @example cy.updateLabel()
            */
            updateLabel(): void

            /**
            * Custom command to intercept all update label request with duplicate title
            * @example cy.updateLabelDuplicateTitle()
            */
            updateLabelDuplicateTitle(): void

            /**
            * Custom command to intercept all delete label request
            * @example cy.deleteLabel()
            */
            deleteLabel(): void
        }
    }
}
