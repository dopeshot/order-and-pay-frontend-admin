const api = `${Cypress.env("apiUrl")}/tables`

describe('Api Error Handling', () => {
    beforeEach(() => {
        cy.getTables()
        cy.addTable()
        cy.patchTable()
        cy.deleteTable()

        cy.visit('/tables')
    })

    describe(('General Errors'), () => {
        it('should handle it when database down'), () => {

        }

        it('should handle when tables are empty'), () => {

        }
    })

    describe('Table Add Errors', () => {
        it('should handle create duplicate tableNumber'), () => {

        }

        it('should handle tableNumber to long (over 8 letters)'), () => {

        }

        it('should handle tableNumber can not be empty'), () => {

        }

        it('should handle capacity to big (over 100)'), () => {

        }

        it('should handle capacity can not be 0'), () => {

        }

        it('should handle capacity can not be empty'), () => {

        }
    })

    describe('Table Edit Errors', () => {
        it('should handle edit duplicate tableNumber'), () => {

        }

        it('should handle tableNumber to long (over 8 letters)'), () => {

        }

        it('should handle tableNumber can not be empty'), () => {

        }

        it('should handle capacity to big (over 100)'), () => {

        }

        it('should handle capacity can not be 0'), () => {

        }

        it('should handle capacity can not be empty'), () => {

        }
    })
})

export { }