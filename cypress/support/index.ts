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
import './commands.ts'
import '@cypress/code-coverage/support'

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
             * Custom command to intercept all addTable request
             * @example cy.addTable()
             */
            addTable(): void

            /**
            * Custom command to intercept all patchTable request 
            * @example cy.getTables()
            */
            patchTable(): void

            /**
             * Custom command to intercept all deleteTable request
             * @example cy.getTables()
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
        }
    }
}