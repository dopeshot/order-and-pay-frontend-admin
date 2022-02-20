import category from '../../fixtures/category.json';
import updatecategory from '../../fixtures/update-category.json';
import { interceptIndefinitely } from '../../support/utils';

const api = `${Cypress.env("apiUrl")}/categories`

describe('Api Endpoints Categories', () => {
    describe('Create category', () => {
        beforeEach(() => {
            cy.visit(`/admin/menus/1/categories/`)

            cy.quickLogin()
        })

        it('should have "Neues Kategorie erstellen" as headline', () => {
            cy.contains('Neue Kategorie erstellen').should('be.visible')
        })

        it('should create one category', () => {
            cy.get(`[data-cy="textinput-title-input"]`).type(category.title)
            cy.get(`[data-cy="textarea-description-input"]`).type(category.description)
            cy.get(`[data-cy="textinput-image-input"]`).type(category.image)
            cy.get(`[data-cy="textinput-icon-input"]`).type(category.icon)

            // Add choice
            cy.contains('Neue Auswahlmöglichkeit').click()
            cy.get(`[data-cy="choices-modal"] [data-cy="textinput-title-input"]`).type(category.choices[0].title)
            cy.contains('Hinzufügen').click()

            // Add option
            cy.contains('Neue Option').click()
            cy.get(`[data-cy="options-modal"] [data-cy="textinput-title-input"]`).type(category.choices[0].options[0].title)
            cy.contains('Hinzufügen').click()

            cy.createCategory()
            cy.getMenuOverviewEditor()
            cy.get('[data-cy="category-save-button"]').click()

            cy.wait('@createCategory')
            cy.wait('@getMenuOverviewEditor')

            cy.url().should('include', '/admin/menus/1/editor')
        })

        it('should have disabled state when inputs are wrong', () => {
            cy.get(`[data-cy="textinput-title-input"]`).focus().blur()

            cy.get('[data-cy="category-save-button"]').should('have.class', 'opacity-80')
        })

        it('should have loading icon when sending', () => {
            cy.get(`[data-cy="textinput-title-input"]`).type(category.title)
            cy.get(`[data-cy="textarea-description-input"]`).type(category.description)

            const interception = interceptIndefinitely('POST', api, "createCategoryIndefinitely", { fixture: 'dish.json' })
            cy.getMenuOverviewEditor()

            cy.get('[data-cy="category-save-button"]').click().then(() => {
                cy.get('[data-cy="category-save-button"] svg').should('have.class', 'fa-spinner')
                interception.sendResponse()
                cy.wait('@createCategoryIndefinitely')
                cy.wait('@getMenuOverviewEditor')
            })
        })

        it('should go to "/admin/menus/1/editor" when click back button', () => {
            cy.getMenuOverviewEditor()
            cy.get('[data-cy="category-back-button"]').click()

            cy.wait('@getMenuOverviewEditor')
            cy.url().should('include', '/admin/menus/1/editor')
        })
    })

    describe('Update Category', () => {
        beforeEach(() => {
            cy.getCategoryById()
            cy.visit(`/admin/menus/1/categories/${category._id}`)

            cy.quickLogin()

            cy.wait('@getCategoryById')
        })

        it('should have "Kategorie bearbeiten" as headline', () => {
            cy.contains('Kategorie bearbeiten').should('be.visible')
        })

        it('should have delete button', () => {
            cy.get('[data-cy="category-delete-button"]').should('exist')
        })

        it('should have filled all fields', () => {
            cy.get(`[data-cy="textinput-title-input"]`).should('have.value', category.title)
            cy.get(`[data-cy="textarea-description-input"]`).should('have.value', category.description)
            cy.get(`[data-cy="textinput-image-input"]`).should('have.value', category.image)
            cy.get(`[data-cy="textinput-icon-input"]`).should('have.value', category.icon)
        })

        it('should update category', () => {
            cy.get(`[data-cy="textinput-title-input"]`).type(updatecategory.title)
            cy.updateCategory()
            cy.getMenuOverviewEditor()

            // Update choice
            cy.get('[data-cy="choices-list-item"]').first().click()
            cy.get(`[data-cy="choices-modal"] [data-cy="textinput-title-input"]`).clear().type(updatecategory.choices[0].title)
            cy.get('[data-cy="category-choices-save-button"]').click()

            // Update option
            cy.get('[data-cy="options-list-item"]').first().click()
            cy.get(`[data-cy="options-modal"] [data-cy="textinput-title-input"]`).clear().type(updatecategory.choices[0].options[0].title)
            cy.get(`[data-cy="isDefault-clickdiv"]`).click()
            cy.get('[data-cy="category-options-save-button"]').click()

            // Update option
            cy.get('[data-cy="options-list-item"]').first().click()
            cy.get(`[data-cy="options-modal"] [data-cy="textinput-title-input"]`).clear().type(updatecategory.choices[0].options[0].title)
            cy.get(`[data-cy="isDefault-clickdiv"]`).click()
            cy.get('[data-cy="category-options-save-button"]').click()

            cy.get('[data-cy="category-save-button"]').click()
            cy.wait('@updateCategory')
            cy.wait('@getMenuOverviewEditor')
        })

        it('should not display "Neue Option" when is mobile', () => {
            cy.viewport('iphone-8')
            cy.get('body').click('right')
            cy.contains('Neue Option').should('not.exist')
            cy.get('[data-cy="category-mobile-add-choice"]').first().click()
            cy.get(`[data-cy="options-modal"]`).should('be.visible')
        })
    })

    describe('Delete Category', () => {
        beforeEach(() => {
            cy.getCategoryById()
            cy.visit(`/admin/menus/1/categories/${category._id}`)

            cy.quickLogin()

            cy.wait('@getCategoryById')
        })

        it('should open delete modal when click on delete', () => {
            cy.get('[data-cy="category-delete-button"]').click()
            cy.contains(`Kategorie-"${category.title}" löschen?`).should('be.visible')
        })

        it('should close delete modal when click on x icon', () => {
            cy.get('[data-cy="category-delete-button"]').click()
            cy.get('[data-cy="modal-close-iconbutton"]').click()
            cy.get(`[data-cy="deletemodal-${category.title}]`).should('not.exist')
        })

        it('should delete category when click delete on modal', () => {
            cy.deleteCategory()
            cy.getMenuOverviewEditor()
            cy.get('[data-cy="category-delete-button"]').click()
            cy.get(`[data-cy='deletemodal-Kategorie-"${category.title}"-delete-button']`).click()

            cy.wait('@deleteCategory')
            cy.wait('@getMenuOverviewEditor')
            cy.url().should('include', '/admin/menus/1/editor')
        })

        it('should delete choice when click delete on choices modal', () => {
            cy.getMenuOverviewEditor()
            cy.get('[data-cy="choices-delete-button"]').first().click()
            cy.get(`[data-cy='deletemodal-Auswahl-"${category.choices[0].title}"-delete-button']`).click()
            cy.contains(category.choices[0].title).should('not.exist')
        })

        it('should delete option when click delete on options modal', () => {
            cy.getMenuOverviewEditor()
            cy.get('[data-cy="options-delete-button"]').first().click()
            cy.get(`[data-cy='deletemodal-Option-"${category.choices[0].options[0].title}"-delete-button']`).click()
            cy.contains(category.choices[0].options[0].title).should('not.exist')
        })

        it('should have loading icon when deleting', () => {
            const interception = interceptIndefinitely('DELETE', `${api}/**`, "deleteDishIndefinitely", { statusCode: 204 })
            cy.getMenuOverviewEditor()

            cy.get('[data-cy="category-delete-button"]').click()
            cy.get(`[data-cy='deletemodal-Kategorie-"${category.title}"-delete-button']`).click().then(() => {
                cy.get(`[data-cy='deletemodal-Kategorie-"${category.title}"-delete-button'] svg`).should('have.class', 'fa-spinner')
                interception.sendResponse()
                cy.wait('@deleteDishIndefinitely')
                cy.wait('@getMenuOverviewEditor')
            })
        })
    })
})

export { };

