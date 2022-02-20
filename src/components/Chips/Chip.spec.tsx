import { mount } from '@cypress/react'
import 'tailwindcss/tailwind.css'
import { Chip, ChipTypesEnum } from './Chip'

describe('Chips', () => {
    // Define default tag color
    const defaultTagType = ChipTypesEnum.blue

    describe('Basic', () => {
        const data = {
            title: 'Tag or Badge?',
            type: defaultTagType
        }

        // Mount component with only required params
        beforeEach(() => {
            mount(<Chip title={data.title} />)
        })

        it('should display text', () => {
            cy.get('[data-cy="tag-title"]').should('contain', data.title)
        })

        it('should have default text color', () => {
            cy.get('[data-cy="tag-title"]').should('have.class', `text-${data.type}`)
        })

        it('should have default background color on box', () => {
            cy.get('[data-cy="tag-box"]').should('have.class', `bg-${data.type}`)
        })
    })

    describe('Advanced', () => {
        const data = {
            title: "It's tag!",
            type: ChipTypesEnum.red
        }

        beforeEach(() => {
            mount(<Chip title={data.title} type={data.type} />)
        })

        it('should have red text color', () => {
            cy.get('[data-cy="tag-title"]').should('have.class', `text-${data.type}`)
        })

        it('should have red background on box', () => {
            cy.get('[data-cy="tag-box"]').should('have.class', `bg-${data.type}`)
        })
    })
})
