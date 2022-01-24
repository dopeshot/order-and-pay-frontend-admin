import { Form, Formik } from "formik"
import { Link } from "react-router-dom"
import * as yup from 'yup'
import { Textarea } from "../../components/Form/Textarea"

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
                            <Textarea name="title" placeholder="Placeholder" labelRequired labelText="Textarea" helperText="nice" rows={20} maxLength={240} />
                        </div>
                        <button type="submit" className="bg-primary-blue text-white px-4 py-2 rounded-lg">Submit</button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}