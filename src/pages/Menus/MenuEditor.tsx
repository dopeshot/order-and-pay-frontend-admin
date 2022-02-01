import { faArrowLeft, faCheck } from "@fortawesome/free-solid-svg-icons"
import { Form, Formik } from "formik"
import { useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import * as Yup from "yup"
import { Button } from "../../components/Buttons/Button"
import { Textarea } from "../../components/Form/Textarea"
import { TextInput } from "../../components/Form/TextInput"
import { Toggle } from "../../components/Form/Toggle"
import { useActions } from "../../overmind"
import { MenuDto } from "../../overmind/menus/effects"

type Params = {
    id: string
}

export const MenuEditor: React.FC = () => {
    const { id } = useParams<Params>()
    const history = useHistory()
    const { createMenu } = useActions().menus

    // Component States
    const [isLoadingSave, setIsLoadingSave] = useState(false)
    const [isEditing, setIsEditing] = useState(false)

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
        setIsLoadingSave(true)

        // Check if we are editing or creating a new menu
        if (isEditing) {

        } else {
            await createMenu(values)
            history.push("/menus")
        }

        setIsLoadingSave(false)
    }

    return <div className="container mt-12">
        <Button kind="tertiary" to="/menus" icon={faArrowLeft}>Zurück</Button>
        <h1 className="text-2xl text-headline-black font-semibold">Neus Menü</h1>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={submitForm}>
            <Form>
                <TextInput name="title" labelText="Titel" placeholder="Mittagskarte, Abendmenu,..." labelRequired autoFocus />
                <Textarea rows={3} name="description" labelText="Beschreibung" placeholder="Beschreibung" maxLength={240} helperText="Diese Beschreibung wird in der Menü Übersicht angezeigt." />
                <Toggle name="isActive" labelText="Soll dieses Menu aktiv sein?" labelOn="Aktiv" labelOff="Inaktiv" helperText="Wenn du diese Option setzt werden alle anderen Menus deaktiviert" />
                <div className="flex flex-col md:flex-row justify-between mt-4">
                    <Button kind="tertiary" type="submit" className="mb-4 order-last md:order-none">Löschen</Button>
                    <Button kind="secondary" className="ml-auto mr-0 mb-4 md:mr-4">Abbrechen</Button>
                    <Button type="submit" kind="primary" loading={isLoadingSave} icon={faCheck} className="mb-4" >Speichern</Button>
                </div>
            </Form>
        </Formik>
    </div>
}