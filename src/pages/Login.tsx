import { faSignInAlt } from "@fortawesome/free-solid-svg-icons"
import { Form, Formik } from "formik"
import * as Yup from 'yup'
import { Button } from "../components/Buttons/Button"
import { PasswordInput } from "../components/Forms/PasswortInput"
import { TextInput } from "../components/Forms/TextInput"
import { useActions, useAppState } from "../overmind"
import { Credentials } from "../overmind/auth/type"

export const Login: React.FC = () => {
    const { authenticating } = useAppState().auth
    const { login } = useActions().auth

    const initialLoginValues: Credentials = {
        email: "",
        password: ""
    }

    const validationLoginSchema: Yup.SchemaOf<Credentials> = Yup.object().shape({
        email: Yup.string().email("Diese E-Mail-Adresse ist ungültig. Versuche es mit einer anderen.").required("Dies ist ein Pflichtfeld"),
        password: Yup.string().required("Dies ist ein Pflichtfeld")
    })

    const submitForm = async (credentials: Credentials) => {
        await login(credentials)
    }

    return <div className="h-screen flex flex-col items-center justify-center mx-4">
        <div style={{ maxWidth: "500px" }}>
            <h1 className="text-4xl text-center text-headline-black font-semibold mb-2">Einloggen</h1>
            <p className="text-center mb-3">Logge dich ein um dein Restaurant zu bearbeiten, Bestellungen einzusehen und neue Mitarbeiter hinzuzufügen.</p>
            <Formik initialValues={initialLoginValues} validationSchema={validationLoginSchema} onSubmit={submitForm}>
                {({ dirty, isValid }) => (
                    <Form>
                        <TextInput name="email" placeholder="E-Mail eingeben" labelText="E-Mail" />
                        <PasswordInput />
                        <Button type="submit" loading={authenticating} icon={faSignInAlt} disabled={!(dirty && isValid)} className="min-w-full">Login</Button>
                    </Form>
                )}
            </Formik>
        </div>
    </div>
}