import { faCheck } from "@fortawesome/free-solid-svg-icons"
import { Form, Formik } from "formik"
import { useState } from "react"
import * as Yup from "yup"
import { useActions } from "../../overmind"
import { Allergen, AllergenDto } from "../../overmind/allergens/type"
import { LabelDto } from "../../overmind/labels/effects"
import { Button } from "../Buttons/Button"
import { TextInput } from "../Forms/TextInput"
import { Modal } from "./Modal"

type AllergensModalProps = {
    /** State Data from allergen to edit */
    modalEditData?: Allergen | null
    /** State Setter from modalEditData */
    setModalEditData?: React.Dispatch<React.SetStateAction<Allergen | null>>
    /** State for modal open/close */
    modalOpen: boolean
    /** State Setter for modalOpen */
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

/**
 * Modal for add and edit allergens, possible to use only add functionality
 */
export const AllergensModal: React.FunctionComponent<AllergensModalProps> = ({ modalEditData, setModalEditData, modalOpen, setModalOpen }) => {
    // Global Actions
    const { createAllergen, updateAllergen } = useActions().allergens

    // Local State
    const [isModalLoading, setIsModalLoading] = useState(false)

    // Formik
    const initialValues: AllergenDto = {
        title: modalEditData?.title ?? "",
        icon: modalEditData?.icon ?? "user"
    }

    // Formik Validation
    const validationSchema = Yup.object().shape({
        title: Yup.string().min(2).max(20).required("Title is required"),
        icon: Yup.string()
    })

    // Formik Submit Form
    const submitForm = async (values: LabelDto) => {
        setIsModalLoading(true)

        try {
            // Check if we are editing or creating a new label
            if (modalEditData) {
                await updateAllergen({
                    id: modalEditData._id,
                    allergen: values
                })

                // Clear modal data
                if (setModalEditData)
                    setModalEditData(null)
                setModalOpen(false)
            }
            else {
                await createAllergen(values)
            }
            setModalOpen(false)

        } catch (error) {
            // Create or update failed
        } finally {
            setIsModalLoading(false)
        }
    }

    const handleModelDismiss = () => {
        // istanbul ignore if // Prevent closing modal when form is submitting
        if (isModalLoading)
            return

        setModalOpen(false)

        // Clear modal data if we are editing a label
        if (modalEditData && setModalEditData)
            setModalEditData(null)
    }

    return (
        <Modal dataCy="allergens-modal-add-edit" modalHeading={modalEditData ? `Allergen bearbeiten` : `Neues Allergen hinzufügen`} open={modalOpen} onDissmis={handleModelDismiss}>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={submitForm}>
                {({ dirty, isValid }) => (
                    <Form>
                        <TextInput name="title" placeholder="Gluten, Erdnüsse, Sellerie..." helperText="Wird am Gericht angezeigt" labelText="Name" labelRequired autoFocus />
                        <TextInput name="icon" placeholder="user" helperText="Font Awesome Icon eingeben!" labelText="Icon" />
                        <div className="flex justify-end">
                            <Button dataCy="allergens-modal-add-edit-button" type="submit" loading={isModalLoading} disabled={!(dirty && isValid)} icon={faCheck}>{modalEditData ? `Speichern` : `Hinzufügen`}</Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </Modal>
    )
}