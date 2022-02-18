describe('Login', () => {
    it('should login when type email and password', () => {

    })

    it('should set access token in localstorage when login', () => {

    })

    it('should logout user when click logout', () => {

    })

    it('should remove access token in localstorage when logout', () => {

    })

    describe('Routing', () => {
        describe('Logged In', () => {
            beforeEach(() => {
                cy.visit('/')
            })

            it('should redirect to /home when logged in', () => {

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

export { }

