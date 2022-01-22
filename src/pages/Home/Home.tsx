import { faEuroSign } from "@fortawesome/free-solid-svg-icons"
import { Form, Formik } from "formik"
import { Link } from "react-router-dom"
import * as yup from 'yup'
import { TextInput } from "../../components/Form/TextInput"

export const Home: React.FunctionComponent = () => {
    const initialValues = {
        title: ""
    }

    const submitForm = (values: typeof initialValues) => {
        console.log(values);
    }

    const Schema = yup.object().shape({
        title: yup.string().required("Title is required"),
    })

    return (
        <div className="container mt-12">
            <h3 className="text-2xl font-bold">Welcome</h3>
            <Link to="/tables">Gehe zu Tabellen</Link>
            <Formik initialValues={initialValues} onSubmit={submitForm} validationSchema={Schema} >
                {(formik) => (
                    <Form>
                        <div className="w-32">
                            <TextInput name="title" placeholder="Hello" labelText="Titel" helperText="Hello" labelRequired icon={faEuroSign} />
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}