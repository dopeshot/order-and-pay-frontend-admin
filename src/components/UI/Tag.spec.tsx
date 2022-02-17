import { mount } from '@cypress/react'
import 'tailwindcss/dist/tailwind.min.css'
import { Tag, TagTypesEnum } from './Tag'

describe('Tags', () => {
    // Define default tag color
    const defaultTagType = TagTypesEnum.blue

    describe('Basic', () => {
        const data = {
            title: 'Tag or Badge?',
            type: defaultTagType
        }

        // Mount component with only required params
        beforeEach(() => {
            mount(<Tag title={data.title} />)
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
            type: TagTypesEnum.red
        }

        beforeEach(() => {
            mount(<Tag title={data.title} type={data.type} />)
        })

        it('should have red text color', () => {
            cy.get('[data-cy="tag-title"]').should('have.class', `text-${data.type}`)
        })

        it('should have red background on box', () => {
            cy.get('[data-cy="tag-box"]').should('have.class', `bg-${data.type}`)
        })
    })
})
