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
import { Loading } from "../../components/UI/Loading"
import { Modal } from "../../components/UI/Modal"
import { useActions } from "../../overmind"
import { MenuDto } from "../../overmind/menus/effects"
import { Menu } from "../../overmind/menus/state"

type Params = {
    id: string
}

export const MenuEditor: React.FC = () => {
    const { id } = useParams<Params>()
    const isEditing = Boolean(id)
    const history = useHistory()

    // Get hooks to manipulate global state
    const { createMenu, getMenuById, updateMenu, deleteMenu } = useActions().menus

    // Component States
    const [isLoading, setIsLoading] = useState(isEditing) // Why do we use isEditing here? When we edit we want to load the state from the backend so we set loading state to true till it's fetched.
    const [isLoadingSave, setIsLoadingSave] = useState(false)
    const [isLoadingDelete, setIsLoadingDelete] = useState(false)
    const [hasDeleteModal, setHasDeleteModal] = useState(false)
    const [menu, setMenu] = useState<Menu>()

    // Load menu when id is set in url
    useEffect(() => {
        let isMounted = true;
        async function loadMenu() {
            try {
                // Fetch menu and set editing
                const menu = await getMenuById(id)

                if (!isMounted)
                    return

                setMenu(menu)
                setIsLoading(false)
            } catch (error) {
                console.error("Menu not found")
                // MC: Implement error here

                return
            }
        }
        // Check if we are editing an existing menu
        if (isEditing)
            loadMenu()

        return () => { isMounted = false }
    }, [getMenuById, isEditing, id])

    const initialValues: MenuDto = {
        title: menu?.title ?? "",
        description: menu?.description ?? "",
        isActive: menu?.isActive ?? false
    }

    const validationSchema = Yup.object().shape({
        title: Yup.string().min(2, "Der Titel muss aus mindestens 2 Zeichen bestehen.").max(32, "Der Titel darf nicht länger als 32 Zeichen sein.").required("Dies ist ein Pflichtfeld."),
        description: Yup.string().max(240, "Die Beschreibung darf nicht länger als 240 Zeichen sein."),
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
        if (!isEditing)
            return

        setIsLoadingDelete(true)

        await deleteMenu(id)

        setIsLoadingDelete(false)
        history.push("/menus")
    }

    return <div className="container mt-12">
        <Button kind="tertiary" to="/menus" icon={faArrowLeft} className="mb-3 inline-block text-darkgrey">Zurück</Button>
        {isLoading ? <Loading /> : <div style={{ maxWidth: "500px" }}>
            <h1 className="text-2xl text-headline-black font-semibold mb-2">{isEditing ? 'Menü bearbeiten' : 'Neues Menü erstellen'}</h1>
            <Formik initialValues={initialValues} enableReinitialize validationSchema={validationSchema} onSubmit={submitForm}>
                <Form>
                    <TextInput name="title" labelText="Titel" placeholder="Mittagskarte, Abendmenu,..." labelRequired autoFocus />
                    <Textarea rows={3} name="description" labelText="Beschreibung" placeholder="Beschreibung" maxLength={240} helperText="Diese Beschreibung wird in der Menü Übersicht angezeigt." />
                    <Toggle name="isActive" labelText="Soll dieses Menu aktiv sein?" labelOn="Aktiv" labelOff="Inaktiv" helperText="Wenn du diese Option setzt werden alle anderen Menus deaktiviert" />
                    <div className="flex flex-col md:flex-row justify-between mt-4">
                        {isEditing && <Button kind="tertiary" onClick={() => setHasDeleteModal(true)} icon={faTrash} className="mb-4 order-last md:order-none">Löschen</Button>}
                        <Button type="submit" kind="primary" loading={isLoadingSave} icon={faCheck} className="ml-auto mr-0 mb-4 md:mr-4">Speichern</Button>
                    </div>
                </Form>
            </Formik>
            <Modal modalHeading="Menü für immer löschen?" open={hasDeleteModal} onDissmis={() => setHasDeleteModal(false)}>
                <p>Das löschen kann nicht rückgängig gemacht werden.</p>
                <div className="flex md:justify-between flex-col md:flex-row">
                    <Button kind="tertiary" onClick={() => setHasDeleteModal(false)} className="my-4 md:my-0">Abbrechen</Button>
                    <Button kind="primary" onClick={() => handleDelete()} loading={isLoadingDelete} icon={faTrash} >Löschen</Button>
                </div>
            </Modal>
        </div>}

    </div>
}