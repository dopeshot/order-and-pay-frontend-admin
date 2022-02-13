import { mount } from '@cypress/react'
import { faPizzaSlice, faYinYang } from "@fortawesome/free-solid-svg-icons"
import { Form, Formik } from "formik"
import 'tailwindcss/dist/tailwind.min.css'
import * as yup from 'yup'
import { Button } from '../Buttons/Button'
import { Dropdown } from './Dropdown'

const initialValues = {
    category: ""
}

const submitForm = (values: typeof initialValues) => {
    console.log(values);
}

const schema = yup.object().shape({
    category: yup.string().required("Category is required"),
})

const Wrapper: React.FC = ({ children }) => {
    return <Formik initialValues={initialValues} onSubmit={submitForm} validationSchema={schema} >
        {(formik) => (
            <Form>
                <div className="w-80">
                    {children}
                </div>
            </Form>
        )}
    </Formik>
}

describe('Dropdown', () => {
    const data = {
        name: "category",
        placeholder: "Wähle eine Kategorie...",
        labelText: "Kategorie",
        helperText: "Die Kategorie ist eine Gruppe an Gerichten",
        options: [
            {
                id: 1,
                label: "Pasta"
            },
            {
                id: 2,
                label: "Das ist ein sehr langer Text für ein Dropdown item",
                icon: faYinYang
            },
            {
                id: 3,
                label: "Pizza",
                icon: faPizzaSlice
            }
        ]
    }

    beforeEach(() => {
        mount(<Wrapper>
            <Dropdown name={data.name} options={data.options} placeholder={data.placeholder} labelText={data.labelText} helperText={data.helperText} />
            <Button data-cy="test-button" buttonType="primary" type="submit" className="mt-2">Hello</Button>
        </Wrapper>)
    })

    it('should initial set placeholder', () => {
        cy.get(`[data-cy="${data.name}-dropdown-button"] span`).should('contain', data.placeholder)
    })

    it('should set labeltext', () => {
        cy.get('label').should('contain', data.labelText)
    })

    it('should set label star when label required', () => {
        cy.get('label').should('not.contain', '*')
        mount(<Wrapper>
            <Dropdown name={data.name} options={data.options} placeholder={data.placeholder} labelText={data.labelText} helperText={data.helperText} labelRequired />
        </Wrapper>)
        cy.get('label').should('contain', '*')
    })

    it('should set helper text', () => {
        cy.get(`[data-cy="${data.name}-helpertext"]`).should('contain', data.helperText)
    })

    it('should set options in dropdown', () => {
        // open dropdown
        cy.get(`[data-cy="${data.name}-dropdown-button"]`).click()

        data.options.map((option) => {
            cy.get(`[data-cy="${data.name}-dropdown-option-${option.id}"]`).should('contain', option.label)
        })
    })

    it('should open dropdown when click it', () => {
        // open dropdown
        cy.get(`[data-cy="${data.name}-dropdown-button"]`).click()

        cy.get(`[data-cy="${data.name}-dropdown-menu"]`).should('be.visible')
    })

    it('should close dropdown when click it after its open', () => {
        // open dropdown
        cy.get(`[data-cy="${data.name}-dropdown-button"]`).click({ force: true })
        cy.get(`[data-cy="${data.name}-dropdown-menu"]`).should('be.visible')

        // close dropdown
        cy.get(`[data-cy="${data.name}-dropdown-button"]`).click({ force: true })
        cy.get(`[data-cy="${data.name}-dropdown-menu"]`).should('not.exist')
    })

    it('should close dropdown when click outside dropdown', () => {
        // open dropdown
        cy.get(`[data-cy="${data.name}-dropdown-button"]`).click()
        cy.get(`[data-cy="${data.name}-dropdown-menu"]`).should('be.visible')

        // close dropdown
        cy.get('body').click()
        cy.get(`[data-cy="${data.name}-dropdown-menu"]`).should('not.exist')
    })

    it('should set correct item when click on it', () => {
        // open dropdown
        cy.get(`[data-cy="${data.name}-dropdown-button"]`).click()
        cy.get(`[data-cy="${data.name}-dropdown-menu"]`).should('be.visible')

        // select first item
        cy.get(`[data-cy="${data.name}-dropdown-option-${data.options[0].id}"]`).click()

        cy.get(`[data-cy="${data.name}-dropdown-button"]`).should('contain', data.options[0].label)
    })

    it('should not have check icon when item is selected', () => {
        // open dropdown
        cy.get(`[data-cy="${data.name}-dropdown-button"]`).click()
        cy.get(`[data-cy="${data.name}-dropdown-menu"]`).should('be.visible')

        // select first item
        cy.get(`[data-cy="${data.name}-dropdown-option-${data.options[0].id}"]`).click()

        // open dropdown
        cy.get(`[data-cy="${data.name}-dropdown-button"]`).click()

        cy.get(`[data-cy="${data.name}-dropdown-option-${data.options[0].id}"] svg`).should('have.class', 'fa-check')
    })

    it('should close dropdown after select element', () => {
        // open dropdown
        cy.get(`[data-cy="${data.name}-dropdown-button"]`).click()
        cy.get(`[data-cy="${data.name}-dropdown-menu"]`).should('be.visible')

        // select first item
        cy.get(`[data-cy="${data.name}-dropdown-option-${data.options[0].id}"]`).click()

        cy.get(`[data-cy="${data.name}-dropdown-menu"]`).should('not.exist')
    })

    it('should have icon chevron-down when dropdown is closed', () => {
        cy.get(`[data-cy="${data.name}-dropdown-button"] svg`).should('have.class', 'rotate-0').and('have.class', 'fa-chevron-down')
    })

    it('should have icon rotate-180 when dropdown is open', () => {
        // open dropdown
        cy.get(`[data-cy="${data.name}-dropdown-button"]`).click()
        cy.get(`[data-cy="${data.name}-dropdown-menu"]`).should('be.visible')

        cy.get(`[data-cy="${data.name}-dropdown-button"] svg`).should('have.class', '-rotate-180').and('have.class', 'fa-chevron-down')
    })

    it('should have icon before the option when set', () => {
        // open dropdown
        cy.get(`[data-cy="${data.name}-dropdown-button"]`).click()
        cy.get(`[data-cy="${data.name}-dropdown-menu"]`).should('be.visible')

        cy.get(`[data-cy="${data.name}-dropdown-option-${data.options[2].id}"] svg`).should('have.class', 'fa-pizza-slice')
    })

    it('should not have icon before the option when not set', () => {
        // open dropdown
        cy.get(`[data-cy="${data.name}-dropdown-button"]`).click()
        cy.get(`[data-cy="${data.name}-dropdown-menu"]`).should('be.visible')

        cy.get(`[data-cy="${data.name}-dropdown-option-${data.options[0].id}"] svg`).should('not.exist')
    })

    it('should show error message when dropdown is not filled', () => {
        cy.get(`[data-cy="${data.name}-helpertext"]`).should('contain', data.helperText)

        // click button to submit form
        cy.get('button[type="submit"]').click()

        cy.get('span').should('contain', 'Category is required')
    })
})
