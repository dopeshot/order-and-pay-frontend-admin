import menu from '../../fixtures/menu-overview.json';
import { interceptIndefinitely } from '../../support/utils';

const api = `${Cypress.env("apiUrl")}/menus/**`

describe('Menu Overview', () => {
    describe('Ui Header', () => {
        beforeEach(() => {
            cy.getMenuOverviewEditor()
            cy.visit(`/admin/menus/${menu._id}/editor`)

            cy.quickLogin()

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
            cy.getAllMenus()

            cy.get('[data-cy="singlemenu-back-button"]').click()
            cy.wait('@getAllMenus')

            cy.url().should('include', '/admin/menus')
        })
    })

    describe('Loading', () => {
        it('should display loading when menu not loaded', () => {
            const interception = interceptIndefinitely('GET', `${api}/editor`, "getMenuOverviewEditorIndefinitely", { fixture: 'menu-overview.json' })

            cy.visit(`/admin/menus/${menu._id}/editor`).then(() => {
                cy.quickLogin()
                cy.contains('Bereitet Burger zu...').should('be.visible')
                interception.sendResponse()
                cy.wait('@getMenuOverviewEditorIndefinitely')
            })
        })
    })

    describe('Ui Content', () => {
        beforeEach(() => {
            cy.getMenuOverviewEditor()
            cy.visit(`/admin/menus/${menu._id}/editor`)

            cy.quickLogin()

            cy.wait('@getMenuOverviewEditor')
        })

        it('should display correct count of categories', () => {
            cy.get('[data-cy="singlemenu-category-listitem"]').should('have.length', menu.categories.length)
        })

        it('should display correct title of category', () => {
            cy.get('[data-cy="singlemenu-category-listitem"] h4').should('contain', menu.categories[0].title)
        })

        it('should display correct icon of category', () => {
            cy.get('[data-cy="singlemenu-category-listitem"] svg').should('have.class', `fa-${menu.categories[0].icon}`)
        })

        it('should display correct count of dishes ("Gerichte") in category box', () => {
            cy.get('[data-cy="singlemenu-category-listitem"]').should('contain', `${menu.categories[0].dishes.length} Gerichte`)
        })

        it('should display "1 Gericht" when only one dish is added', () => {
            cy.get('[data-cy="singlemenu-category-listitem"]').should('contain', `1 Gericht`)
        })

        it('should display correct count of dishes', () => {
            cy.get(`[data-cy="singlemenu-${menu.categories[0].title}-dish-listitem"]`).should('have.length', menu.categories[0].dishes.length)
        })

        it('should display correct title of dish', () => {
            cy.get(`[data-cy="singlemenu-${menu.categories[0].title}-dish-listitem"]`).should('contain', menu.categories[0].dishes[0].title)
        })

        it('should display correct price of dish', () => {
            cy.get(`[data-cy="singlemenu-${menu.categories[0].title}-dish-listitem"] h6`).should('contain', '6,00')
        })

        it('should display not available tag when dish isAvailable set to false', () => {
            cy.get('[data-cy=tag-box].bg-red-600').should('be.visible')
        })
    })

    describe('Create', () => {
        beforeEach(() => {
            cy.getMenuOverviewEditor()
            cy.visit(`/admin/menus/${menu._id}/editor`)

            cy.quickLogin()

            cy.wait('@getMenuOverviewEditor')
        })

        it.skip('should go to page add category when click "Kategorie hinzufügen" button', () => {
            // TODO: Implement when categories are merged
        })

        it.skip('should go to page edit category when click category box', () => {
            // TODO: Implement when categories are merged
        })

        it('should go to page add dish when click "Gericht hinzufügen" button', () => {
            cy.getAllAllergens()
            cy.getAllCategories()
            cy.getAllLabels()
            cy.get(`[data-cy="singlemenu-${menu.categories[0].title}-dish-add"]`).click()

            cy.wait('@getAllAllergens')
            cy.wait('@getAllCategories')
            cy.wait('@getAllLabels')
            cy.url().should('include', `/admin/menus/${menu._id}/categories/${menu.categories[0]._id}/dish`)

            cy.get(`[data-cy="categoryId-dropdown-button"]`).should('contain', menu.categories[0].title)
            cy.contains('Neues Gericht erstellen').should('be.visible')
        })

        it('should go to page edit dish when click dish box', () => {
            cy.getAllAllergens()
            cy.getAllCategories()
            cy.getAllLabels()
            cy.get(`[data-cy="singlemenu-${menu.categories[0].title}-dish-listitem"]`).first().click()

            cy.wait('@getAllAllergens')
            cy.wait('@getAllCategories')
            cy.wait('@getAllLabels')
            cy.url().should('include', `menus/${menu._id}/categories/${menu.categories[0]._id}/dish`)

            cy.get(`[data-cy="categoryId-dropdown-button"]`).should('contain', menu.categories[0].title)
            cy.contains('Gericht bearbeiten').should('be.visible')
        })
    })

    describe('Delete', () => {
        beforeEach(() => {
            cy.getMenuOverviewEditor()
            cy.visit(`/admin/menus/${menu._id}/editor`)

            cy.quickLogin()

            cy.wait('@getMenuOverviewEditor')
        })

        describe.skip('Category', () => {
        })

        describe('Dish', () => {
            beforeEach(() => {
                cy.deleteDish()
                cy.getMenuOverviewEditor()
                cy.get('[data-cy="dishes-delete-button"]').first().click()
            })

            it('should open delete modal when click on delete', () => {
                cy.contains(`${menu.categories[0].dishes[0].title} löschen?`)
            })

            it('should close delete modal when click on x icon', () => {
                cy.get('[data-cy="modal-close-iconbutton"]').click()
                cy.get(`[data-cy="deletemodal-${menu.categories[0].dishes[0].title}]`).should('not.exist')
            })

            it('should delete dish when click delete on modal', () => {
                cy.get(`[data-cy="deletemodal-${menu.categories[0].dishes[0].title}-delete-button"]`).click()

                cy.wait('@deleteDish')
                cy.wait('@getMenuOverviewEditor')
            })
        })
    })
})

export { };

