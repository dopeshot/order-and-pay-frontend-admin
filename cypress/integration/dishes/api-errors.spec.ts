describe('Api Error Handling', () => {
    describe('Create Dish Errors', () => {
        beforeEach(() => {
            cy.getAllAllergens()
            cy.getAllLabels()
            cy.getAllCategories()
            cy.visit('/menus/1/categories/1/dish')

            cy.wait('@getAllAllergens')
            cy.wait('@getAllLabels')
            cy.wait('@getAllCategories')
        })

        it.skip('should handle create duplicate Dish Title', () => {
            //TODO: needs to be implemented when feature ready
        })

        it('should handle dish title to short (min 2 letters)', () => {
            cy.get('input[name="title"]').type('a').blur()
            cy.get('[data-cy="textinput-title-form-error"]').should('contain', 'Der Titel muss aus mindestens 2 Zeichen bestehen.')
        })

        it('should handle dish title to long (max 30 letters)', () => {
            cy.get('input[name="title"]').type('a'.repeat(31)).blur()
            cy.get('[data-cy="textinput-title-form-error"]').should('contain', 'Der Titel darf nicht länger als 30 Zeichen sein.')
        })

        it('should handle dish title can not be empty', () => {
            cy.get('input[name="title"]').focus().blur()
            cy.get('[data-cy="textinput-title-form-error"]').should('contain', 'Dies ist ein Pflichtfeld.')
        })

        it('should handle description to short (min 2 letters)', () => {
            cy.get('textarea[name="description"]').type('a').blur()
            cy.get('[data-cy="textarea-description-form-error"]').should('contain', 'Die Beschreibung muss aus mindestens 2 Zeichen bestehen.')
        })

        it('should handle description to long (max 200 letters)', () => {
            cy.get('textarea[name="description"]').type('a'.repeat(201)).blur()
            cy.get('[data-cy="textarea-description-form-error"]').should('contain', 'Die Beschreibung darf nicht länger als 200 Zeichen sein.')
        })

        it('should handle description can not be empty', () => {
            cy.get('textarea[name="description"]').focus().blur()
            cy.get('[data-cy="textarea-description-form-error"]').should('contain', 'Dies ist ein Pflichtfeld.')
        })

        it('should handle price cannot be negative', () => {
            cy.get('input[name="price"]').clear().type('-1').blur()
            cy.get('[data-cy="textinput-price-form-error"]').should('contain', 'Der Preis muss 0 oder größer sein')
        })

        it('should handle price can not be empty', () => {
            cy.get('input[name="price"]').clear().blur()
            cy.get('[data-cy="textinput-price-form-error"]').should('contain', 'Dies ist ein Pflichtfeld.')
        })

        it('should handle image url to short (min 2 letters)', () => {
            cy.get('input[name="image"]').type('a').blur()
            cy.get('[data-cy="textinput-image-form-error"]').should('contain', 'Die Titelbild-URL muss aus mindestens 2 Zeichen bestehen.')
        })

        it('should handle image url to long (max 100 letters)', () => {
            cy.get('input[name="image"]').type('a'.repeat(101)).blur()
            cy.get('[data-cy="textinput-image-form-error"]').should('contain', 'Die Titelbild-URL darf nicht länger als 100 Zeichen sein.')
        })

        it('should handle category can not be empty', () => {
            cy.get('[data-cy="dishes-save-button"]').click()
            cy.get('[data-cy="dropdown-category-form-error"]').should('contain', 'Dies ist ein Pflichtfeld.')
        })
    })
})

export { }

