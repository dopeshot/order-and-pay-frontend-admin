describe('Navigation Ui', () => {
    beforeEach(() => {
        cy.getTables()
        cy.visit('/tables')
    })

    describe('Desktop Sidebar', () => {
        it('should close sidebar', () => {
            cy.get('[data-cy="topbar-hamburger-button"]').click()

            cy.get('[data-cy="sidebar-headline-span"]').should('have.class', 'opacity-0')
            cy.get('[data-cy="sidebar-item-span"]').should('have.class', 'opacity-0')
        })

        it('should open sidebar', () => {
            /* Close sidebar */
            cy.get('[data-cy="topbar-hamburger-button"]').click()

            cy.get('[data-cy="topbar-hamburger-button"]').click()

            cy.get('[data-cy="sidebar-headline-span"]').should('have.class', 'opacity-100')
            cy.get('[data-cy="sidebar-item-span"]').should('have.class', 'opacity-100')
        })
    })

    describe('Mobile Sidebar', () => {
        beforeEach(() => {
            cy.viewport('iphone-8')
        })

        it('should not have the small sidebar when close sidebar', () => {
            cy.get('[data-cy="topbar-hamburger-button"]').click()

            cy.get('[data-cy="sidebar"]').should('have.css', 'transform', 'matrix(1, 0, 0, 1, -250, 0)')
        })

        it('should close sidebar when you click an link', () => {
            cy.get('[data-cy="sidebar-Tische"]').click()

            cy.get('[data-cy="sidebar"]').should('have.class', 'sidebar-closed')
        })

        it('should close sidebar when you click outside the sidebar', () => {
            cy.get('[data-cy="sidebar-content-overlay"]').click({ force: true })

            cy.get('[data-cy="sidebar"]').should('have.class', 'sidebar-closed')
        })
    })

    describe('Mobile Topbar', () => {
        beforeEach(() => {
            cy.viewport('iphone-8')
        })

        it('should open full search (in the future)', () => {
            cy.get('[data-cy="topbar-search-iconbutton"]').click()
        })

        it('should open notification dropdown (in the future)', () => {
            cy.get('[data-cy="topbar-notification-iconbutton"]').click()
        })
    })
})

export { }