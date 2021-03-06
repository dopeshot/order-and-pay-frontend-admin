import { faCheck, faTrash } from "@fortawesome/free-solid-svg-icons"
import { Form, Formik } from "formik"
import { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import * as Yup from "yup"
import { BackButton } from "../../components/Buttons/BackButton"
import { Button } from "../../components/Buttons/Button"
import { Textarea } from "../../components/Forms/Textarea"
import { TextInput } from "../../components/Forms/TextInput"
import { Toggle } from "../../components/Forms/Toggle"
import { DeleteModal } from "../../components/Modals/DeleteModal"
import { Loading } from "../../components/ProgressIndicators/Loading"
import { useActions } from "../../overmind"
import { Menu, MenuDto } from "../../overmind/menus/type"
import { setDocumentTitle } from "../../services/setDocumentTitle"

type Params = {
    menuId: string
}

export const MenusEditor: React.FC = () => {
    const { menuId } = useParams<Params>()
    const isEditing = Boolean(menuId)
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
                const menu = await getMenuById(menuId)

                // istanbul ignore next // is just for handling async correct
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

        setDocumentTitle(isEditing ? 'Men?? bearbeiten' : 'Neues Men?? erstellen')
        return () => { isMounted = false }
    }, [getMenuById, isEditing, menuId])

    const initialValues: MenuDto = {
        title: menu?.title ?? "",
        description: menu?.description ?? "",
        isActive: menu?.isActive ?? false
    }

    const validationSchema = Yup.object().shape({
        title: Yup.string().min(2, "Der Titel muss aus mindestens 2 Zeichen bestehen.").max(32, "Der Titel darf nicht l??nger als 32 Zeichen sein.").required("Dies ist ein Pflichtfeld."),
        description: Yup.string().max(240, "Die Beschreibung darf nicht l??nger als 240 Zeichen sein."),
        isActive: Yup.boolean()
    })

    const submitForm = async (menu: MenuDto) => {
        setIsLoadingSave(true)

        try {
            // Check if we are editing or creating a new menu
            if (isEditing) {
                await updateMenu({
                    menuId,
                    menu
                })
            } else {
                await createMenu(menu)
            }

            history.push("/admin/menus")
        } catch (error) {
            // Create or update failed
        } finally {
            setIsLoadingSave(false)
        }
    }

    const handleDelete = async () => {
        // istanbul ignore next // Should not happen
        if (!isEditing)
            return

        setIsLoadingDelete(true)

        try {
            await deleteMenu(menuId)
            history.push("/admin/menus")
        } catch (error) {
            // Delete failed
        } finally {
            setIsLoadingDelete(false)
        }
    }

    return <div className="container mt-12">
        <BackButton dataCy="menus-back-button" to="/admin/menus" />
        {isLoading ? <Loading /> : <div style={{ maxWidth: "500px" }}>
            <h1 className="text-2xl text-headline-black font-semibold mb-2">{isEditing ? 'Men?? bearbeiten' : 'Neues Men?? erstellen'}</h1>
            <Formik initialValues={initialValues} enableReinitialize validationSchema={validationSchema} onSubmit={submitForm}>
                {({ dirty, isValid }) => (
                    <Form>
                        <TextInput name="title" labelText="Titel" placeholder="Mittagskarte, Abendmenu,..." labelRequired autoFocus />
                        <Textarea rows={3} name="description" labelText="Beschreibung" placeholder="Beschreibung" maxLength={240} helperText="Diese Beschreibung wird in der Men?? ??bersicht angezeigt." />
                        <Toggle name="isActive" labelText="Soll dieses Menu aktiv sein?" labelOn="Aktiv" labelOff="Inaktiv" helperText="Wenn du diese Option setzt werden alle anderen Menus deaktiviert" />
                        <div className="flex flex-col md:flex-row justify-between mt-4">
                            {isEditing && <Button dataCy="menus-delete-button" kind="tertiary" onClick={() => setHasDeleteModal(true)} icon={faTrash} className="mb-4 order-last md:order-none">L??schen</Button>}
                            <Button dataCy="menus-add-edit-save-button" type="submit" kind="primary" loading={isLoadingSave} icon={faCheck} disabled={!(dirty && isValid)} className="ml-auto mb-4">Speichern</Button>
                        </div>
                    </Form>
                )}
            </Formik>

            {/* Delete Modal */}
            <DeleteModal
                title={`${menu?.title}`}
                description="Das L??schen kann nicht r??ckg??ngig gemacht werden."
                open={hasDeleteModal}
                onDissmis={() => setHasDeleteModal(false)}
                handleDelete={() => handleDelete()}
                isLoadingDelete={isLoadingDelete}
            />
        </div>}

    </div>
}