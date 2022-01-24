import { mount } from '@cypress/react'
import { Form, Formik } from "formik"
import 'tailwindcss/dist/tailwind.min.css'
import * as yup from 'yup'
import { Textarea } from './Textarea'

const maxLength = 20

const initialValues = {
    title: ""
}

const submitForm = (values: typeof initialValues) => {
    console.log(values);
}

const schema = yup.object().shape({
    title: yup.string().max(maxLength).required("Title is required"),
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

describe('Textarea', () => {
    const data = {
        name: "title",
        placeholder: "Hello...",
        labelText: "Titel",
        helperText: "The title is shown at the top of the page."
    }


    describe("textarea basics", () => {
        beforeEach(() => {
            mount(<Wrapper>
                <Textarea name={data.name} placeholder={data.placeholder} labelText={data.labelText} helperText={data.helperText} />
            </Wrapper>)
        })

        it('should set name in textarea attribute', () => {
            cy.get('textarea').invoke('attr', 'name').should('contain', data.name)
        })

        it('should set placeholder', () => {
            cy.get('textarea').invoke('attr', 'placeholder').should('contain', data.placeholder)
        })

        it('should set labeltext', () => {
            cy.get('label').should('contain', data.labelText)
        })

        it('should set helper text', () => {
            cy.get('p').should('contain', data.helperText)
        })

        it('should show error message instead of helper text when error occurres', () => {
            cy.get('p').should('contain', data.helperText)
            cy.get('textarea').focus().blur()
            cy.get('p').should('not.exist')
            cy.get('span').should('contain', 'Title is required')
        })

        it('should set error message when error occures', () => {
            cy.get('textarea').focus().blur()
            cy.get('span').should('contain', 'Title is required')
        })
    })

    describe('textarea character count', () => {
        const selector = `[data-cy="${data.name}-character-count"]`

        beforeEach(() => {
            mount(<Wrapper>
                <Textarea name={data.name} maxLength={maxLength} placeholder={data.placeholder} labelText={data.labelText} helperText={data.helperText} />
            </Wrapper>)
        })

        it('should display max length next to current length', () => {
            cy.get(selector).should('contain', maxLength)
        })

        it('should display 0 items when there is nothing typed', () => {
            cy.get(selector).should('contain', 0)
        })

        it('should sperate current count and max length with slash', () => {
            cy.get(selector).should('contain', 0 + '/' + maxLength)
        })

        it('should display correct length when typing', () => {
            cy.get('textarea').type('textarea')
            cy.get(selector).should('contain', 8)
        })

        it('should update character count when typing', () => {
            cy.get('textarea').type('a')
            cy.get(selector).should('contain', 1)

            cy.get('textarea').type('b')
            cy.get(selector).should('contain', 2)

            cy.get('textarea').clear()
            cy.get(selector).should('contain', 0)
        })

        it('should display error when there are more characters than allowed', () => {
            cy.get('textarea').type('a'.repeat(maxLength + 1))
            cy.get(selector).should('contain', maxLength)
            cy.get('textarea').blur()
            cy.get('span').should('contain', `title must be at most ${maxLength} characters`)
        })

        it('should show error message instead of helper text when error occurres', () => {
            cy.get('p').should('contain', data.helperText)
            cy.get('textarea').focus().blur()
            cy.get('p').should('not.exist')
            cy.get('span').should('contain', 'Title is required')
        })
    })

    describe('textarea other features', () => {
        it('should set label star when label required', () => {
            mount(<Wrapper>
                <Textarea name={data.name} labelRequired placeholder={data.placeholder} labelText={data.labelText} helperText={data.helperText} />
            </Wrapper>)
            cy.get('label').should('contain', '*')
        })

        it('should set rows to textarea', () => {
            mount(<Wrapper>
                <Textarea name={data.name} rows={3} placeholder={data.placeholder} labelText={data.labelText} helperText={data.helperText} />
            </Wrapper>)
            cy.get('textarea').invoke('attr', 'rows').should('contain', 3)
        })
    })
})
