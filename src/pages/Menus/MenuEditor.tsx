import { faArrowLeft, faCheck } from "@fortawesome/free-solid-svg-icons"
import { Form, Formik } from "formik"
import { useParams } from "react-router-dom"
import * as Yup from "yup"
import { Button } from "../../components/Buttons/Button"
import { Textarea } from "../../components/Form/Textarea"
import { TextInput } from "../../components/Form/TextInput"
import { Toggle } from "../../components/Form/Toggle"
import { MenuDto } from "../../overmind/menus/effects"

type Params = {
    id: string
}

export const MenuEditor: React.FC = () => {
    const { id } = useParams<Params>()

    const initialValues: MenuDto = {
        title: "",
        description: "",
        isActive: false
    }
    const validationSchema = Yup.object().shape({
        title: Yup.string().min(2).max(32).required("Title is required"),
        description: Yup.string().min(0).max(240),
        isActive: Yup.boolean()
    })

    const submitForm = async (values: MenuDto) => {
        console.log(values)
    }

    return <div className="container mt-12">
        <Button kind="tertiary" to="/menus" icon={faArrowLeft}>Zurück</Button>
        <h1 className="text-2xl text-headline-black font-semibold">Neus Menü</h1>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={submitForm}>
            <Form>
                <TextInput name="title" labelText="Titel" placeholder="Mittagskarte, Abendmenu,..." labelRequired autoFocus />
                <Textarea rows={3} name="description" labelText="Beschreibung" placeholder="Beschreibung" maxLength={240} helperText="Diese Beschreibung wird in der Menü Übersicht angezeigt." />
                <Toggle name="isActive" labelText="Soll dieses Menu aktiv sein?" labelOn="Aktiv" labelOff="Inaktiv" helperText="Wenn du diese Option setzt werden alle anderen Menus deaktiviert" />
                <Button type="submit" kind="primary" icon={faCheck}>Speichern</Button>
            </Form>
        </Formik>
    </div>
}