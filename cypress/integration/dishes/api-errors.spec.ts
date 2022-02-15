const api = `${Cypress.env("apiUrl")}/dishes`

describe('Api Error Handling', () => {
    describe('Create Dish Errors', () => {
        beforeEach(() => {
            cy.visit('/menus/1/categories/1/dish')
        })

        it('should handle create duplicate Dish Title', () => {

        })

        it('should handle dish title to short (min 2 letters)', () => {

        })

        it('should handle dish title to long (max 30 letters)', () => {

        })

        it('should handle dish title can not be empty', () => {

        })

        it('should handle description to short (min 2 letters)', () => {

        })

        it('should handle description to long (max 200 letters)', () => {

        })

        it('should handle description can not be empty', () => {

        })

        it('should handle price cannot be negative', () => {

        })

        it('should handle price can not be empty', () => {

        })

        it('should handle image url to short (min 2 letters)', () => {

        })

        it('should handle image url to long (max 100 letters)', () => {

        })

        it('should handle category can not be empty', () => {

        })
    })
})

export { }

