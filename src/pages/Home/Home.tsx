import { Form, Formik } from "formik"
import { Link } from "react-router-dom"
import * as yup from 'yup'
import { Toggle } from "../../components/Form/Toggle"

export const Home: React.FunctionComponent = () => {
    const initialValues = {
        title: "",
        toggle: false
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
                        <div className="">
                            <Toggle name="toggle" labelText="Ist das Gericht gerade verfügbar?" helperText="Wenn du diese Option setzt " labelOff="nicht aktiv" labelOn="aktiv" />
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}