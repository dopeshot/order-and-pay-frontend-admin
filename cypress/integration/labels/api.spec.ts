import labels from '../../fixtures/labels.json';
import updatelabel from '../../fixtures/update-label.json';
import { interceptIndefinitely } from '../../support/utils';

const api = `${Cypress.env("apiUrl")}`

describe('Api Endpoints Labels', () => {
    describe('Get All Labels', () => {
        beforeEach(() => {
            cy.getAllLabels()
            cy.visit('/menus/labels')

            cy.wait('@getAllLabels')
        })

        it('should list all labels', () => {
            cy.get('[data-cy="labels-list-item"]').should('have.length', labels.length)
        })

        it('should display correct count for labels', () => {
            cy.get('[data-cy="labels-count"]').should('contain', `${labels.length} Gesamt`)
        })
    })

    describe('Create Labels', () => {
        beforeEach(() => {
            cy.getAllLabels()
            cy.visit('/menus/labels')

            cy.wait('@getAllLabels')
            cy.contains('Label hinzufügen').click()
        })

        it('should open modal when click add label', () => {
            cy.contains('Neues Label hinzufügen').should('be.visible')
            cy.get(`[data-cy="labels-modal-add-edit"]`).should('be.visible')
        })

        it('should create one label', () => {
            cy.get(`[data-cy="textinput-title-input"]`).type(labels[0].title)
            cy.get(`[data-cy="textinput-icon-input"]`).type(labels[0].icon)

            cy.createLabel()
            cy.get(`[data-cy="labels-modal-add-edit-button"]`).click()
            cy.wait('@createLabel')
        })

        // TODO: remove skip when user merged
        it.skip('should have disabled state when inputs are wrong', () => {
            cy.get(`[data-cy="textinput-title-input"]`).focus().blur()

            cy.get(`[data-cy="labels-modal-add-edit-button"]`).should('have.class', 'opacity-80')
        })

        it('should have loading icon when sending', () => {
            cy.get(`[data-cy="textinput-title-input"]`).type(labels[0].title)
            cy.get(`[data-cy="textinput-icon-input"]`).type(labels[0].icon)

            const interception = interceptIndefinitely('POST', `${api}/labels`, "createLabelIndefinitely", { fixture: 'label.json' })

            cy.get(`[data-cy="labels-modal-add-edit-button"]`).click().then(() => {
                cy.get(`[data-cy="labels-modal-add-edit-button"] svg`).should('have.class', 'fa-spinner')
                interception.sendResponse()
                cy.wait('@createLabelIndefinitely')
            })
        })
    })

    describe('Update Label', () => {
        beforeEach(() => {
            cy.getAllLabels()
            cy.visit('/menus/labels')

            cy.get('[data-cy="labels-list-item"]').first().click()
        })

        it('should open modal when click label list item', () => {
            cy.contains('Label bearbeiten').should('be.visible')
            cy.get(`[data-cy="labels-modal-add-edit"]`).should('be.visible')
        })

        it('should close modal when click x icon', () => {
            cy.get(`[data-cy="modal-close-iconbutton"]`).click()
            cy.get(`[data-cy="labels-modal-add-edit"]`).should('not.exist')
        })

        it('should have filled all fields', () => {
            cy.get(`[data-cy="textinput-title-input"]`).should('have.value', labels[0].title)
            cy.get(`[data-cy="textinput-icon-input"]`).should('have.value', labels[0].icon)
        })

        it('should update label', () => {
            cy.get(`[data-cy="textinput-title-input"]`).clear().type(updatelabel.title)

            cy.updateLabel()
            cy.get(`[data-cy="labels-modal-add-edit-button"]`).click()
            cy.wait('@updateLabel')
        })
    })

    describe('Delete Label', () => {
        beforeEach(() => {
            cy.getAllLabels()
            cy.visit('/menus/labels')

            cy.get('[data-cy="labels-delete-button"]').first().click()
        })

        it('should open delete modal when click on delete', () => {
            cy.get('h2').should('contain', `${labels[0].title} löschen?`)
        })

        it('should close delete modal when click on x icon', () => {
            cy.get('[data-cy="modal-close-iconbutton"]').click()
            cy.get(`[data-cy="deletemodal-${labels[0].title}]`).should('not.exist')
        })

        it('should delete label when click delete on modal', () => {
            cy.deleteLabel()
            cy.get(`[data-cy="deletemodal-${labels[0].title}-delete-button"]`).click()
            cy.wait('@deleteLabel')
        })

        it('should have loading icon when deleting', () => {
            const interception = interceptIndefinitely('DELETE', `${api}/labels/**`, "deleteLabelIndefinitely", { statusCode: 204 })

            cy.get(`[data-cy="deletemodal-${labels[0].title}-delete-button"]`).click().then(() => {
                cy.get(`[data-cy="deletemodal-${labels[0].title}-delete-button"] svg`).should('have.class', 'fa-spinner')
                interception.sendResponse()
                cy.wait('@deleteLabelIndefinitely')
                cy.wait('@getAllLabels')
            })
        })
    })
})

export { };

