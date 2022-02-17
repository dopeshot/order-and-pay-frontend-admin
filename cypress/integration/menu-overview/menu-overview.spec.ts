import menu from '../../fixtures/menu-overview.json';
import { interceptIndefinitely } from '../../support/utils';

const api = `${Cypress.env("apiUrl")}/menus/**`

describe('Menu Overview', () => {
    describe('Ui Header', () => {
        beforeEach(() => {
            cy.getMenuOverviewEditor()
            cy.visit(`/menus/${menu._id}/edit`)

            cy.wait('@getMenuOverviewEditor')
        })

        it('should display correct headline', () => {
            cy.contains(menu.title).should('be.visible')
        })

        it('should display correct description', () => {
            cy.contains(menu.description).should('be.visible')
        })

        it('should display active tag when menu is active', () => {
            cy.get('[data-cy=tag-box].bg-green-500').should('be.visible')
        })

        it('should go to "admin/menus" when click on back button', () => {
            cy.get('[data-cy="singlemenu-back-button"]').click()

            cy.url().should('include', '/admin/menus')
        })
    })

    describe('Loading', () => {
        it.only('should display loading when menu not loaded', () => {
            const interception = interceptIndefinitely('GET', `${api}/editor`, "getMenuOverviewEditorIndefinitely", { fixture: 'menu-overview.json' })

            cy.visit('/menus/${menu._id}/edit').then(() => {
                // TODO:Change when loading component implemented
                cy.contains('Loading...').should('be.visible')
                interception.sendResponse()
                cy.wait('@getMenuOverviewEditorIndefinitely')
            })
        })
    })

    describe('Ui Content', () => {
        beforeEach(() => {
            cy.getMenuOverviewEditor()
            cy.visit(`/menus/${menu._id}/edit`)

            cy.wait('@getMenuOverviewEditor')
        })

        it('should display correct count of categories', () => {

        })

        it('should display correct title of category', () => {

        })

        it('should display correct icon of category', () => {

        })

        it('should display correct count of dishes ("Gerichte") in category box', () => {

        })

        it('should display "1 Gericht" when only one dish is added', () => {

        })

        it('should display correct count of dishes', () => {

        })

        it('should display correct title of dish', () => {

        })

        it('should display correct icon of dish', () => {

        })

        it('should display correct price of dish', () => {

        })

        it('should display not available tag when dish isAvailable set to false', () => {

        })
    })

    describe('Create', () => {
        beforeEach(() => {
            cy.getMenuOverviewEditor()
            cy.visit(`/menus/${menu._id}/edit`)

            cy.wait('@getMenuOverviewEditor')
        })

        it('should go to page add category when click "Kategorie hinzufügen" button', () => {

        })

        it('should go to page edit category when click category box', () => {

        })

        it('should go to page add dish when click "Gericht hinzufügen" button', () => {

        })

        it('should go to page edit dish when click dish box', () => {

        })
    })

    describe('Delete', () => {
        beforeEach(() => {
            cy.getMenuOverviewEditor()
            cy.visit(`/menus/${menu._id}/edit`)

            cy.wait('@getMenuOverviewEditor')
        })

        it('should delete category when open delete modal and click delete', () => {

        })

        it('should delete dish when open delete modal and click delete', () => {

        })
    })
})

export { };

