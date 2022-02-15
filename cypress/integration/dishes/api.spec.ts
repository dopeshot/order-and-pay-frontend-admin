const api = `${Cypress.env("apiUrl")}/dishes`

describe('Api Endpoints', () => {
    describe('Create dish', () => {
        beforeEach(() => {
            cy.getAllAllergens()
            cy.getAllLabels()
            cy.getAllCategories()
            cy.visit('/menus/1/categories/1/dish')

            cy.wait('@getAllAllergens')
            cy.wait('@getAllLabels')
            cy.wait('@getAllCategories')
        })

        it('should have "Neues Gericht erstellen" as headline', () => {

        })

        it('should create one dish', () => {

        })

        it('should have disabled state when inputs are wrong', () => {

        })

        it('should have disabled state when inputs are empty', () => {

        })

        it('should have loading icon when sending', () => {

        })

        it('should go to "/admin/menus" when click back button', () => {

        })
    })

    describe('Update dish', () => {
        it('should have "Gericht bearbeiten" as headline', () => {

        })

        it('should have delete button', () => {

        })

        it('should edit dish', () => {

        })

        it('should have disabled state when inputs are wrong', () => {

        })

        it('should have loading icon when sending', () => {

        })
    })

    describe('Delete Dish', () => {
        it('should open delete modal when click on delete', () => {

        })

        it('should delete dish when click delete on modal', () => {

        })
    })
})

export { }

