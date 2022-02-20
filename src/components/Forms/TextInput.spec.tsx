import { mount } from '@cypress/react'
import { faEuroSign } from "@fortawesome/free-solid-svg-icons"
import { Form, Formik } from "formik"
import 'tailwindcss/tailwind.css'
import * as yup from 'yup'
import { TextInput } from './TextInput'

const initialValues = {
    title: ""
}

const submitForm = (values: typeof initialValues) => {
    console.log(values);
}

const schema = yup.object().shape({
    title: yup.string().required("Title is required"),
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

describe('Text Input', () => {
    const data = {
        name: "title",
        placeholder: "Hello...",
        labelText: "Titel",
        helperText: "The title is shown at the top of the page.",
        type: "email"
    }

    beforeEach(() => {
        mount(<Wrapper>
            <TextInput name={data.name} placeholder={data.placeholder} labelText={data.labelText} helperText={data.helperText} />
        </Wrapper>)
    })

    it('should set name in input attribute', () => {
        cy.get('input').invoke('attr', 'name').should('contain', data.name)
    })

    it('should set placeholder', () => {
        cy.get('input').invoke('attr', 'placeholder').should('contain', data.placeholder)
    })

    it('should set labeltext', () => {
        cy.get('label').should('contain', data.labelText)
    })

    it('should set label star when label required', () => {
        cy.get('label').should('not.contain', '*')
        mount(<Wrapper>
            <TextInput name={data.name} placeholder={data.placeholder} labelText={data.labelText} labelRequired />
        </Wrapper>)
        cy.get('label').should('contain', '*')
    })

    it('should set helper text', () => {
        cy.get('p').should('contain', data.helperText)
    })

    it('should show error message instead of helper text when error occurres', () => {
        cy.get('p').should('contain', data.helperText)
        cy.get('input').focus().blur()
        cy.get('p').should('not.exist')
        cy.get('span').should('contain', 'Title is required')
    })

    it('should have icon at the end when set icon', () => {
        mount(<Wrapper>
            <TextInput name={data.name} placeholder={data.placeholder} labelText={data.labelText} icon={faEuroSign} />
        </Wrapper>)
        cy.get('svg').should('be.visible')
        cy.get('svg').should('have.class', 'fa-euro-sign')
    })

    it('should have type text by default', () => {
        cy.get('input').invoke('attr', 'type').should('contain', 'text')
    })

    it('should have type email when set type', () => {
        mount(<Wrapper>
            <TextInput name={data.name} type="email" placeholder={data.placeholder} labelText={data.labelText} icon={faEuroSign} />
        </Wrapper>)
        cy.get('input').invoke('attr', 'type').should('contain', 'email')
    })

    it('should set error message when error occures', () => {
        cy.get('input').focus().blur()
        cy.get('span').should('contain', 'Title is required')
    })
})
