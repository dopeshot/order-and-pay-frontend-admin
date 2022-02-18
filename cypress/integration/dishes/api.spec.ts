import dish from '../../fixtures/dish.json';
import { interceptIndefinitely } from '../../support/utils';

const api = `${Cypress.env("apiUrl")}/dishes`

describe('Api Endpoints', () => {
    describe('Create dish', () => {
        beforeEach(() => {
            cy.getAllAllergens()
            cy.getAllLabels()
            cy.getAllCategories()
            cy.visit(`/menus/1/categories/${dish.category}/dish`)

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
            cy.get(`[data-cy="isAvailable-clickdiv"]`).click()
            cy.get(`[data-cy="labels-option-${dish.labels[0]}"] input`).check().should('be.checked')
            cy.get(`[data-cy="allergens-option-${dish.allergens[0]}"] input`).check().should('be.checked')

            cy.createDish()
            cy.getMenuOverviewEditor()
            cy.get('[data-cy="dishes-save-button"]').click()

            cy.wait('@createDish')
            cy.wait('@getMenuOverviewEditor')

            cy.url().should('include', '/admin/menus/1/editor')
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
            cy.get(`[data-cy="isAvailable-clickdiv"]`).click()
            cy.get(`[data-cy="labels-option-${dish.labels[0]}"] input`).check().should('be.checked')
            cy.get(`[data-cy="allergens-option-${dish.allergens[0]}"] input`).check().should('be.checked')

            const interception = interceptIndefinitely('POST', api, "createDishIndefinitely", { fixture: 'dish.json' })
            cy.getMenuOverviewEditor()

            cy.get('[data-cy="dishes-save-button"]').click().then(() => {
                cy.get('[data-cy="dishes-save-button"] svg').should('have.class', 'fa-spinner')
                interception.sendResponse()
                cy.wait('@createDishIndefinitely')
                cy.wait('@getMenuOverviewEditor')
            })
        })

        it('should go to "/admin/menus/1/editor" when click back button', () => {
            cy.getMenuOverviewEditor()
            cy.get('[data-cy="dishes-back-button"]').click()

            cy.wait('@getMenuOverviewEditor')
            cy.url().should('include', '/admin/menus/1/editor')
        })

        it('should open labels modal when click add label', () => {
            cy.contains('Label hinzufügen').click()
            cy.contains('Neues Label hinzufügen').should('be.visible')
        })

        it('should open allergens modal when click add allergen', () => {
            cy.contains('Allergene hinzufügen').click()
            cy.contains('Neues Allergen hinzufügen').should('be.visible')
        })
    })

    describe('Update dish', () => {
        beforeEach(() => {
            cy.getDishById()
            cy.getAllAllergens()
            cy.getAllLabels()
            cy.getAllCategories()
            cy.visit(`/menus/1/categories/${dish.category}/dish/${dish._id}`)

            cy.wait('@getDishById')
            cy.wait('@getAllAllergens')
            cy.wait('@getAllLabels')
            cy.wait('@getAllCategories')
        })

        it('should have "Gericht bearbeiten" as headline', () => {
            cy.contains('Gericht bearbeiten').should('be.visible')
        })

        it('should have delete button', () => {
            cy.get('[data-cy="dishes-delete-button"]').should('be.visible')
        })

        it('should have filled all fields', () => {
            cy.get('input[name="image"]').should('have.value', dish.image)
            cy.get('input[name="title"]').should('have.value', dish.title)
            cy.get('input[name="price"]').should('have.value', `${dish.price}`)
            cy.get('textarea[name="description"]').should('have.value', dish.description)

            cy.get(`[data-cy="category-dropdown-button"]`).should('contain', 'Burger')
            cy.get(`[data-cy="isAvailable-labeltext"]`).should('contain', 'Verfügbar')
            cy.get(`[data-cy="labels-option-${dish.labels[0]}"] input`).should('be.checked')
            cy.get(`[data-cy="allergens-option-${dish.allergens[0]}"] input`).should('be.checked')
        })

        it('should update dish', () => {
            cy.get('input[name="title"]').type('Hello')
            cy.updateDish()
            cy.getMenuOverviewEditor()

            cy.get('[data-cy="dishes-save-button"]').click()
            cy.wait('@updateDish')
            cy.wait('@getMenuOverviewEditor')
        })
    })

    describe.only('Delete Dish', () => {
        beforeEach(() => {
            cy.getDishById()
            cy.getAllAllergens()
            cy.getAllLabels()
            cy.getAllCategories()
            cy.visit(`/menus/1/categories/${dish.category}/dish/${dish._id}`)

            cy.wait('@getDishById')
            cy.wait('@getAllAllergens')
            cy.wait('@getAllLabels')
            cy.wait('@getAllCategories')
        })

        it('should open delete modal when click on delete', () => {
            cy.get('[data-cy="dishes-delete-button"]').click()
            cy.contains(`${dish.title} löschen?`)
        })

        it('should delete dish when click delete on modal', () => {
            cy.deleteDish()
            cy.getMenuOverviewEditor()
            cy.get('[data-cy="dishes-delete-button"]').click()
            cy.get(`[data-cy="deletemodal-${dish.title}-delete-button"]`).click()

            cy.wait('@deleteDish')
            cy.wait('@getMenuOverviewEditor')
            cy.url().should('include', '/admin/menus/1/editor')
        })

        it('should have loading icon when deleting', () => {
            const interception = interceptIndefinitely('DELETE', `${api}/**`, "deleteDishIndefinitely", { fixture: 'dish.json' })
            cy.getMenuOverviewEditor()

            cy.get('[data-cy="dishes-delete-button"]').click()
            cy.get(`[data-cy="deletemodal-${dish.title}-delete-button"]`).click().then(() => {
                cy.get(`[data-cy="deletemodal-${dish.title}-delete-button"] svg`).should('have.class', 'fa-spinner')
                interception.sendResponse()
                cy.wait('@deleteDishIndefinitely')
                cy.wait('@getMenuOverviewEditor')
            })
        })
    })
})

export { };

