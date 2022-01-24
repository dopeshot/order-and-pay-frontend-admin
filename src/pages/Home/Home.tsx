import { faWineGlass, faYinYang } from "@fortawesome/free-solid-svg-icons"
import { Form, Formik } from "formik"
import { Link } from "react-router-dom"
import * as yup from 'yup'
import { Button } from "../../components/Buttons/Button"
import { Checkbox } from "../../components/Form/Checkbox"
import { Dropdown } from "../../components/Form/Dropdown"
import { TextInput } from "../../components/Form/TextInput"

export const Home: React.FunctionComponent = () => {
    const initialValues = {
        ids: [],
        e: "",
        d: ""
    }

    const submitForm = (values: typeof initialValues) => {
        console.log(values);
    }

    const schema = yup.object().shape({
        e: yup.string().required('Hello')
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
            <Formik initialValues={initialValues} onSubmit={submitForm} validationSchema={schema} >
                {(formik) => (
                    <Form>
                        <div className="w-full">
                            <Checkbox name="ids" labelText="Text" options={options} helperText="Hello" />
                            <TextInput name="d" labelText="Text" placeholder="ddd" helperText="Hello" />
                            <Dropdown name="e" labelText="Text" placeholder="ff" options={options} helperText="Hello" />

                            <Button buttonType="primary" type="submit">Submit</Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}