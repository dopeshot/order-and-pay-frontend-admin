import labels from '../../fixtures/labels.json';
import updatelabels from '../../fixtures/update-label.json';

describe('Error Handling Labels', () => {
    describe('Empty', () => {
        beforeEach(() => {
            cy.getAllLabelsEmpty()
            cy.visit('/admin/menus/labels')

            cy.quickLogin()
            cy.wait('@getAllLabelsEmpty')
        })

        it('should show empty state when there are no labels', () => {
            cy.contains('Erstelle Label').should('be.visible')
        })
    })

    describe('Duplicates', () => {
        beforeEach(() => {
            cy.getAllLabels()
            cy.visit('/admin/menus/labels')

            cy.quickLogin()
            cy.wait('@getAllLabels')
        })

        it('should handle when create duplicate Label', () => {
            cy.contains('Label hinzufügen').click()

            cy.get(`[data-cy="textinput-title-input"]`).type(labels[0].title)
            cy.get(`[data-cy="textinput-icon-input"]`).type(labels[0].icon)

            cy.createLabelDuplicateTitle()
            cy.get(`[data-cy="labels-modal-add-edit-button"]`).click()
            cy.wait('@createLabelDuplicateTitle')

            cy.contains('Title is already taken.').should('be.visible')
        })

        it('should handle when update duplicate Label', () => {
            cy.get('[data-cy="labels-list-item"]').first().click()

            cy.get(`[data-cy="textinput-title-input"]`).clear().type(updatelabels.title)

            cy.updateLabelDuplicateTitle()
            cy.get(`[data-cy="labels-modal-add-edit-button"]`).click()
            cy.wait('@updateLabelDuplicateTitle')

            cy.contains('Title is already taken.').should('be.visible')
        })
    })
})

export { };

