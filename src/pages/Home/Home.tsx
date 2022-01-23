import { faTimes, faWineGlass, faYinYang } from "@fortawesome/free-solid-svg-icons"
import { Form, Formik } from "formik"
import { Link } from "react-router-dom"
import * as yup from 'yup'
import { Dropdown } from "../../components/Form/Dropdown"

export const Home: React.FunctionComponent = () => {
    const initialValues = {
        title: "",
        toggle: false,
        test: null,
    }

    const submitForm = (values: typeof initialValues) => {
        console.log(values);
    }

    const Schema = yup.object().shape({
        test: yup.string().required("Title is required"),
    })

    const options = [
        {
            id: 1,
            label: "rot",
            icon: faTimes
        },
        {
            id: 2,
            label: "grün",
            icon: faYinYang
        },
        {
            id: 3,
            label: "gelb",
            icon: faWineGlass
        }
    ]

    return (
        <div className="container mt-12">
            <h3 className="text-2xl font-bold">Welcome</h3>
            <Link to="/tables">Gehe zu Tabellen</Link>
            <Formik initialValues={initialValues} onSubmit={submitForm} validationSchema={Schema} >
                {(formik) => (
                    <Form>
                        <div className="w-52">
                            <Dropdown name="test" labelText="Text" options={options} placeholder="Test" />
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}