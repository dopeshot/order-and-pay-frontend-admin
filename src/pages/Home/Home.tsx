import { faWineGlass, faYinYang } from "@fortawesome/free-solid-svg-icons"
import { Form, Formik } from "formik"
import { Link } from "react-router-dom"
import * as yup from 'yup'
import { Dropdown } from "../../components/Form/Dropdown"

export const Home: React.FunctionComponent = () => {
    const initialValues = {
        test: ""
    }

    const submitForm = (values: typeof initialValues) => {
        console.log(values);
    }

    const Schema = yup.object().shape({
        test: yup.string().required('Hello')
    })

    const options = [
        {
            id: 1,
            label: "rot"
        },
        {
            id: 2,
            label: "grün fdkjfksjflksdfjlsdfjskdfjkdfjsdfjslkdfösdfk",
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
                        <div className="w-56">
                            <Dropdown name="test" labelText="Text" options={options} placeholder="Wähle eine Farbe..." helperText="Hello" />
                            <Dropdown name="test" labelText="Text" options={options} placeholder="Wähle eine Farbe..." helperText="Hello" />
                            <button type="submit">Submit</button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}