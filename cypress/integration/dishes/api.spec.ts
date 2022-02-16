import dish from '../../fixtures/dish.json';
import { interceptIndefinitely } from '../../support/utils';

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
            cy.contains('Neues Gericht erstellen').should('be.visible')
        })

        it('should create one dish', () => {
            cy.get('input[name="image"]').type(dish.image)
            cy.get('input[name="title"]').type(dish.title)
            cy.get('input[name="price"]').clear().type(`${dish.price}`)
            cy.get('textarea[name="description"]').type(dish.description)

            cy.get(`[data-cy="category-dropdown-button"]`).click()
            cy.get(`[data-cy="category-dropdown-option-${dish.category}"]`).click()
            cy.get(`[data-cy="isActive-clickdiv"]`).click()
            cy.get(`[data-cy="labels-option-${dish.labels[0]}"] input`).check().should('be.checked')
            cy.get(`[data-cy="allergens-option-${dish.allergens[0]}"] input`).check().should('be.checked')

            cy.createDish()
            cy.get('[data-cy="dishes-save-button"]').click()
            cy.wait('@createDish')

            cy.url().should('include', '/admin/home')
        })

        it('should have disabled state when inputs are wrong', () => {
            cy.get('input[name="title"]').focus().blur()

            cy.get('[data-cy="dishes-save-button"]').should('have.class', 'opacity-80')
        })

        it('should have disabled state when inputs are empty', () => {
            cy.contains('Speichern').should('have.class', 'opacity-80')

            cy.get('input[name="title"]').type(dish.title)
            cy.get('input[name="price"]').clear().type(`${dish.price}`)
            cy.get('textarea[name="description"]').type(dish.description)
            cy.get(`[data-cy="category-dropdown-button"]`).click()
            cy.get(`[data-cy="category-dropdown-option-${dish.category}"]`).click()

            cy.get('[data-cy="dishes-save-button"]').should('not.have.class', 'opacity-80')
        })

        it('should have loading icon when sending', () => {
            cy.get('input[name="image"]').type(dish.image)
            cy.get('input[name="title"]').type(dish.title)
            cy.get('input[name="price"]').clear().type(`${dish.price}`)
            cy.get('textarea[name="description"]').type(dish.description)

            cy.get(`[data-cy="category-dropdown-button"]`).click()
            cy.get(`[data-cy="category-dropdown-option-${dish.category}"]`).click()
            cy.get(`[data-cy="isActive-clickdiv"]`).click()
            cy.get(`[data-cy="labels-option-${dish.labels[0]}"] input`).check().should('be.checked')
            cy.get(`[data-cy="allergens-option-${dish.allergens[0]}"] input`).check().should('be.checked')

            const interception = interceptIndefinitely('POST', api, "createDishIndefinitely", { fixture: 'dish.json' })

            cy.get('[data-cy="dishes-save-button"]').click().then(() => {
                cy.get('[data-cy="dishes-save-button"] svg').should('have.class', 'fa-spinner')
                interception.sendResponse()
                cy.wait('@createDishIndefinitely')
            })
        })

        it('should go to "/admin/menus" when click back button', () => {
            cy.get('[data-cy="dishes-back-button"]').click()

            cy.url().should('include', '/admin/menus')
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

export { };

