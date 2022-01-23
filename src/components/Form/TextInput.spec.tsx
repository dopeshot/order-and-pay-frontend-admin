import { mount } from '@cypress/react'
import { faEuroSign } from "@fortawesome/free-solid-svg-icons"
import { Form, Formik } from "formik"
import * as React from 'react'
import 'tailwindcss/dist/tailwind.min.css'
import * as yup from 'yup'
import { TextInput } from './TextInput'


const initialValues = {
    title: ""
}

const submitForm = (values: typeof initialValues) => {
    console.log(values);
}

const Schema = yup.object().shape({
    title: yup.string().required("Title is required"),
})

it('Input', () => {
    mount(<Formik initialValues={initialValues} onSubmit={submitForm} validationSchema={Schema} >
        {(formik) => (
            <Form>
                <div className="w-32">
                    <TextInput name="title" placeholder="Hello" labelText="Titel" helperText="Hello" labelRequired icon={faEuroSign} />
                </div>
            </Form>
        )}
    </Formik>)
    cy.get('input').invoke('attr', 'placeholder').should('contain', 'Hello')
})