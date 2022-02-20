import allergens from '../../fixtures/allergens.json';
import updateAllergen from '../../fixtures/update-allergen.json';

describe('Api Error Handling Allergens', () => {
    describe('Empty', () => {
        beforeEach(() => {
            cy.getAllAllergensEmpty()
            cy.visit('/admin/menus/allergens')

            cy.quickLogin()
            cy.wait('@getAllAllergensEmpty')
        })

        it('should show empty state when there are no allergens', () => {
            cy.contains('Erstelle Allergene').should('be.visible')
        })
    })

    describe('Duplicates', () => {
        beforeEach(() => {
            cy.getAllAllergens()
            cy.visit('/admin/menus/allergens')

            cy.quickLogin()
            cy.wait('@getAllAllergens')
        })

        it('should handle when create duplicate Allergen', () => {
            cy.contains('Allergen hinzufügen').click()

            cy.get(`[data-cy="textinput-title-input"]`).type(allergens[0].title)
            cy.get(`[data-cy="textinput-icon-input"]`).type(allergens[0].icon)

            cy.createAllergenDuplicateTitle()
            cy.get(`[data-cy="allergens-modal-add-edit-button"]`).click()
            cy.wait('@createAllergenDuplicateTitle')

            cy.contains('Title is already taken.').should('be.visible')
        })

        it('should handle when update duplicate Allergen', () => {
            cy.get('[data-cy="allergens-list-item"]').first().click()

            cy.get(`[data-cy="textinput-title-input"]`).clear().type(updateAllergen.title)

            cy.updateAllergenDuplicateTitle()
            cy.get(`[data-cy="allergens-modal-add-edit-button"]`).click()
            cy.wait('@updateAllergenDuplicateTitle')

            cy.contains('Title is already taken.').should('be.visible')
        })
    })
})

export { };

