describe('Sidebar', () => {
    beforeEach(() => {
        cy.getTables()
        cy.visit('/tables')
    })

    describe('Desktop Navigation', () => {
        it('should close sidebar', () => {
            cy.get('[data-cy="topbar-hamburger-button"]').click()

            cy.get('[data-cy="sidebar-headline-span"]').should('have.class', 'opacity-0')
            cy.get('[data-cy="sidebar-item-span"]').should('have.class', 'opacity-0')
        })
    })
})