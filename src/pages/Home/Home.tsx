import { faWineGlass, faYinYang } from "@fortawesome/free-solid-svg-icons"
import { Form, Formik } from "formik"
import { Link } from "react-router-dom"
import * as yup from 'yup'
import { Button } from "../../components/Buttons/Button"
import { Checkbox } from "../../components/Form/Checkbox"

export const Home: React.FunctionComponent = () => {
    const initialValues = {
        ids: []
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
            <Formik initialValues={initialValues} onSubmit={submitForm} >
                {(formik) => (
                    <Form>
                        <div className="w-full">
                            <Checkbox name="ids" labelText="Text" options={options} helperText="Hello" />
                            <Button buttonType="primary" type="submit">Submit</Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}