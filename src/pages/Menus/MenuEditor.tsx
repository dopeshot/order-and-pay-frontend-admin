import { faArrowLeft, faCheck, faTrash } from "@fortawesome/free-solid-svg-icons"
import axios from "axios"
import { Form, Formik } from "formik"
import { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import * as Yup from "yup"
import { Button } from "../../components/Buttons/Button"
import { Textarea } from "../../components/Form/Textarea"
import { TextInput } from "../../components/Form/TextInput"
import { Toggle } from "../../components/Form/Toggle"
import { useActions } from "../../overmind"
import { MenuDto } from "../../overmind/menus/effects"
import { Menu } from "../../overmind/menus/state"

type Params = {
    id: string
}

export const MenuEditor: React.FC = () => {
    const { id } = useParams<Params>()
    const history = useHistory()
    const { createMenu, getMenuById, updateMenu, deleteMenu } = useActions().menus

    // Component States
    const [isLoadingSave, setIsLoadingSave] = useState(false)
    const [isLoadingDelete, setIsLoadingDelete] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [menu, setMenu] = useState<Menu>()

    useEffect((): void => {
        async function loadMenu() {
            // Check if we are editing an existing menu
            if (!id)
                return

            // Fetch menu and set editing
            setIsEditing(true)
            const menu = await getMenuById(id)

            // Check if menu exists
            if (!menu)
                return

            setMenu(menu)
        }
        loadMenu()
    })

    const initialValues: MenuDto = {
        title: menu?.title ?? "",
        description: menu?.description ?? "",
        isActive: menu?.isActive ?? false
    }
    const validationSchema = Yup.object().shape({
        title: Yup.string().min(2).max(32).required("Title is required"),
        description: Yup.string().min(0).max(240),
        isActive: Yup.boolean()
    })

    const submitForm = async (values: MenuDto) => {
        setIsLoadingSave(true)

        try {
            // Check if we are editing or creating a new menu
            if (isEditing) {
                await updateMenu({
                    id,
                    menu: values
                })
            } else {
                await createMenu(values)
            }

            history.push("/menus")
        } catch (error) {
            if (!axios.isAxiosError(error))
                return

            // MC: Put error display here (or we generalize it???)
        } finally {
            setIsLoadingSave(false)
        }
    }

    const handleDelete = async () => {
        // Check if we are editing a menu
        if (!isEditing || !menu || !id)
            return
        setIsLoadingDelete(true)

        await deleteMenu(menu._id)

        setIsLoadingDelete(false)
        history.push("/menus")
    }

    return <div className="container mt-12">
        <Button kind="tertiary" to="/menus" icon={faArrowLeft}>Zurück</Button>
        <h1 className="text-2xl text-headline-black font-semibold">Neus Menü</h1>
        <Formik initialValues={initialValues} enableReinitialize validationSchema={validationSchema} onSubmit={submitForm}>
            <Form>
                <TextInput name="title" labelText="Titel" placeholder="Mittagskarte, Abendmenu,..." labelRequired autoFocus />
                <Textarea rows={3} name="description" labelText="Beschreibung" placeholder="Beschreibung" maxLength={240} helperText="Diese Beschreibung wird in der Menü Übersicht angezeigt." />
                <Toggle name="isActive" labelText="Soll dieses Menu aktiv sein?" labelOn="Aktiv" labelOff="Inaktiv" helperText="Wenn du diese Option setzt werden alle anderen Menus deaktiviert" />
                <div className="flex flex-col md:flex-row justify-between mt-4">
                    {isEditing && <Button kind="tertiary" onClick={() => handleDelete()} loading={isLoadingDelete} icon={faTrash} className="mb-4 order-last md:order-none">Löschen</Button>}
                    <Button kind="secondary" className="ml-auto mr-0 mb-4 md:mr-4">Abbrechen</Button>
                    <Button type="submit" kind="primary" loading={isLoadingSave} icon={faCheck} className="mb-4" >Speichern</Button>
                </div>
            </Form>
        </Formik>
    </div>
}