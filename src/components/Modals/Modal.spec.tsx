import { mount } from '@cypress/react'
import 'tailwindcss/tailwind.css'
import { Modal } from './Modal'

describe('Tags', () => {

    describe('Basic', () => {
        const data = {
            modalHeading: 'Modal Heading',
            onDissmis: () => ""
        }

        // Mount component with only required params
        beforeEach(() => {
            mount(<Modal open={true} modalHeading={data.modalHeading} onDissmis={data.onDissmis}>
            </Modal>)
        })

        it('should display modal heading', () => {
            cy.get('[data-cy="modal-heading"]').should('contain', data.modalHeading)
        })

        it('should display dismiss icon', () => {
            cy.get('[data-cy="modal-dismiss"]').should('be.visible')
        })
    })

    describe('Content tests', () => {
        const data = {
            modalHeading: 'Modal Heading',
            onDissmis: () => ""
        }

        const contentData = {
            h1: "Hello World!",
            p: "Nice"
        }

        beforeEach(() => {
            mount(<Modal open={true} modalHeading={data.modalHeading} onDissmis={data.onDissmis}>
                <h1 data-cy="modal-content-h1">{contentData.h1}</h1>
                <p data-cy="modal-content-p">{contentData.p}</p>
            </Modal>)
        })

        it('should containt headline', () => {
            cy.get('[data-cy="modal-content-h1"]')
                .should('be.visible')
                .should('contain', contentData.h1)
        })

        it('should containt paragraph', () => {
            cy.get('[data-cy="modal-content-p"]')
                .should('be.visible')
                .should('contain', contentData.p)
        })
    })
})
