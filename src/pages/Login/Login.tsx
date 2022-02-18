import { faSignInAlt } from "@fortawesome/free-solid-svg-icons"
import { Form, Formik } from "formik"
import { useState } from "react"
import * as Yup from 'yup'
import { Button } from "../../components/Buttons/Button"
import { TextInput } from "../../components/Form/TextInput"

export const Login: React.FC = () => {
    const [isLoginLoading] = useState(false)

    // Formik
    const initialValues: any = {
        email: "",
        password: ""
    }

    // Formik Validation
    const validationSchema = Yup.object().shape({
        email: Yup.string().required("Dies ist ein Pflichtfeld"),
        password: Yup.string().required("Dies ist ein Pflichtfeld")
    })

    const submitForm = (values: typeof initialValues) => {
        console.log(values)
    }

    return <div className="h-screen flex flex-col items-center justify-center mx-4">
        <div style={{ maxWidth: "500px" }}>
            <h1 className="text-4xl text-center text-headline-black font-semibold mb-2">Einloggen</h1>
            <p className="text-center mb-3">Logge dich ein um dein Restaurant zu bearbeiten, Bestellungen einzusehen und neue Mitarbeiter hinzuzufügen.</p>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={submitForm}>
                <Form>
                    <TextInput name="email" placeholder="name@adresse.de" labelText="E-Mail" />
                    <TextInput name="password" placeholder="Passwort eingeben" labelText="Passwort" />
                    <Button type="submit" loading={isLoginLoading} icon={faSignInAlt} className="min-w-full">Login</Button>
                </Form>
            </Formik>
        </div>
    </div>
}