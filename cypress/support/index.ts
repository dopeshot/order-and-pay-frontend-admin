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
            * Custom command to intercept all get all labels request
            * @example cy.getAllLabels()
            */
            getAllLabels(): void

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
            * Custom command to intercept all delete user request
            * @example cy.deleteUser()
            */
            deleteUser(): void
        }
    }
}
