import access_token from '../../fixtures/access_token.json';
import user from '../../fixtures/current-user.json';

describe.skip('Login', () => {
    describe('Login Functionality', () => {
        beforeEach(() => {
            cy.login()
            cy.getCurrentUser()
            cy.visit('/login')

            cy.get('[data-cy="textinput-email-input"]').type(user.email)
            cy.get('[data-cy="password-input"]').type('12345678')

            cy.contains('Login').click()

            cy.wait('@login')
            cy.wait('@getCurrentUser')
        })

        it('should login when type email and password', () => {
            cy.url().should('include', '/admin/home')
        })

        it('should set access token in localstorage when login', () => {
            expect(localStorage.getItem('access_token')).to.eq(access_token.access_token)
        })

        it('should logout user when click logout', () => {
            cy.get('[data-cy="avatar-dropdown"]').click()
            cy.get('[data-cy="avatar-dropdown-delete"]').click()

            cy.url().should('include', '/admin/login')
        })

        it('should remove access token in localstorage when logout', () => {
            cy.get('[data-cy="avatar-dropdown"]').click()
            cy.get('[data-cy="avatar-dropdown-delete"]').click().should(ls => {
                expect(localStorage.getItem('access_token')).to.be.null
            })
        })
    })

    describe('Routing', () => {
        describe('Logged In', () => {
            beforeEach(() => {
                cy.visit('/')
                cy.easyLogin()
            })

            it.only('should redirect to /home when logged in', () => {

            })

            it('should redirect to /home when try to access /login when logged in', () => {

            })
        })

        describe('Not Logged In/Guest', () => {
            it('should redirect to /login when try to access private route', () => {

            })
        })
    })
})

export { };

