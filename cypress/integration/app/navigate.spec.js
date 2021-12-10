describe('Navigate in App', () => {
    it('should open dashboard', () => {
        cy.visit('/home')
        cy.contains('Welcome')
    })

    it('should redirect to dashboard', () => {
        cy.visit('/')
        cy.contains('Welcome')
    })

    it('should open table page', () => {
        cy.get('[data-cy="sidebar-Tische"]').click('')
        cy.contains('Tische')
    })
})