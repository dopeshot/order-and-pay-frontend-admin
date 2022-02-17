import { mount } from '@cypress/react'
import { faCarrot, faPiggyBank } from "@fortawesome/free-solid-svg-icons"
import { Form, Formik } from "formik"
import 'tailwindcss/dist/tailwind.min.css'
import { Button } from '../Buttons/Button'
import { Checkbox } from './Checkbox'

const initialValues = {
    category: ""
}

const submitForm = (values: typeof initialValues) => {
    console.log(values);
}

const Wrapper: React.FC = ({ children }) => {
    return <Formik initialValues={initialValues} onSubmit={submitForm} >
        {(formik) => (
            <Form>
                {children}
            </Form>
        )}
    </Formik>
}

describe('Checkbox', () => {
    const data = {
        name: "label",
        labelText: "Labels",
        helperText: "Die Labels können Gerichten hinzugefügt werden.",
        options: [
            {
                id: 1,
                label: "vegan"
            },
            {
                id: 2,
                label: "vegetarisch",
                icon: faCarrot
            },
            {
                id: 3,
                label: "ohne Schweinefleisch",
                icon: faPiggyBank
            }
        ]
    }

    beforeEach(() => {
        mount(<Wrapper>
            <Checkbox name={data.name} options={data.options} labelText={data.labelText} helperText={data.helperText} />
            <Button kind="primary" type="submit" className="mt-2">Hello</Button>
        </Wrapper>)
    })

    it('should set labeltext', () => {
        cy.get('h5 ').should('contain', data.labelText)
    })

    it('should set helper text', () => {
        cy.get(`[data-cy="${data.name}-helpertext"]`).should('contain', data.helperText)
    })

    it('should display all options', () => {
        data.options.map((option) => {
            cy.get(`[data-cy="${data.name}-option-${option.id}"]`).should('contain', option.label)
        })
    })

    it('should check box when click on it', () => {
        cy.get(`[data-cy="${data.name}-option-${data.options[0].id}"] input`).check().should('be.checked')
        cy.get(`[data-cy="${data.name}-option-${data.options[1].id}"] input`).should('not.be.checked')
    })

    it('should uncheck box when click on it after it is checked', () => {
        cy.get(`[data-cy="${data.name}-option-${data.options[0].id}"] input`).check().should('be.checked')
        cy.get(`[data-cy="${data.name}-option-${data.options[0].id}"] input`).click().should('not.be.checked')
    })

    it('should display icon before label when defined', () => {
        cy.get(`[data-cy="${data.name}-option-${data.options[1].id}"] svg`).should('have.class', 'fa-carrot').and('be.visible')
    })

    it('should not display icon before label when not defined', () => {
        cy.get(`[data-cy="${data.name}-option-${data.options[0].id}"] svg`).should('not.exist')
    })
})
