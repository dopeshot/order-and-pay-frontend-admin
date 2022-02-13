import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { faCheck, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons"
import { Form, Formik } from "formik"
import { useEffect, useState } from "react"
import * as Yup from "yup"
import { Button } from "../../components/Buttons/Button"
import { IconButton } from "../../components/Buttons/IconButton"
import { TextInput } from "../../components/Form/TextInput"
import { List } from "../../components/UI/List"
import { ListItem } from "../../components/UI/ListItem"
import { Modal } from "../../components/UI/Modal"
import { useActions, useAppState } from "../../overmind"
import { AllergenDto } from "../../overmind/allergens/effects"
import { Allergen } from "../../overmind/allergens/state"

export const Allergens: React.FC = () => {
    // Get hooks to manipulate global state
    const { getAllAllergens, createAllergen, updateAllergen, deleteAllergen } = useActions().allergens

    // Get global state
    const { allergens, isLoadingAllergens } = useAppState().allergens

    // Component States
    const [modalOpen, setModalOpen] = useState(false)
    const [modalEditData, setModalEditData] = useState<Allergen | null>(null)
    const [isModalLoading, setIsModalLoading] = useState(false)

    // Load allergens when page is loaded
    useEffect((): void => {
        getAllAllergens()
    }, [getAllAllergens])

    const initialValues: AllergenDto = {
        title: modalEditData?.title ?? "",
        icon: modalEditData?.icon ?? "user"
    }

    const validationSchema = Yup.object().shape({
        title: Yup.string().min(2).max(20).required("Title is required"),
        icon: Yup.string()
    })

    const submitForm = async (values: AllergenDto) => {
        setIsModalLoading(true)

        // Check if we are editing or creating a new allergen
        if (modalEditData) {
            if (!await updateAllergen({
                id: modalEditData._id,
                allergen: values
            }))
                return
            // Clear modal data
            setModalEditData(null)
            setModalOpen(false)
        }
        else {
            if (!await createAllergen(values))
                return
            setModalOpen(false)
        }
        setIsModalLoading(false)
    }

    const handleModelDismiss = () => {
        // Prevent closing modal when form is submitting
        if (isModalLoading)
            return

        // Close modal
        setModalOpen(false)

        // Clear modal data if we are editing a allergen
        if (modalEditData)
            setModalEditData(null)
    }

    const handleDelete = async (event: any, id: string) => {
        // This prevents the event from bubbling up the DOM to the parent node where you open edit
        event.stopPropagation()

        deleteAllergen(id)
    }

    return < div className="container md:max-w-full mt-12" >
        <div className="flex flex-col md:flex-row md:justify-between">
            <div>
                <h1 className="text-2xl text-headline-black font-semibold">Allergene</h1>
                <p className="text-lightgrey mr-3 mb-4">{!isLoadingAllergens ? allergens.length : 0} Gesamt</p>
            </div>
            <div>
                <Button icon={faPlus} onClick={() => setModalOpen(true)}>Allergen hinzufügen</Button>
            </div>
        </div>
        <List lines>
            {allergens.map((allergen) => <ListItem key={allergen._id} title={allergen.title} icon={allergen.icon as IconProp} onClick={() => {
                setModalEditData(allergen)
                setModalOpen(true)
            }}>
                <IconButton className="ml-auto mr-4" icon={faTrash} onClick={(event) => handleDelete(event, allergen._id)} />
            </ListItem>)}
        </List>

        <Modal modalHeading={modalEditData ? `Allergen bearbeiten` : `Neues Allergen hinzufügen`} open={modalOpen} onDissmis={handleModelDismiss}>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={submitForm}>
                <Form>
                    <TextInput name="title" placeholder="Gluten, Erdnüsse, Sellerie..." helperText="Wird am Gericht angezeigt" labelText="Name" labelRequired autoFocus />
                    <TextInput name="icon" placeholder="user" helperText="Font Awesome Icon eingeben!" labelText="Icon" />
                    <Button type="submit" loading={isModalLoading} icon={faCheck}>{modalEditData ? `Speichern` : `Hinzufügen`}</Button>
                </Form>
            </Formik>
        </Modal>
    </div >

}