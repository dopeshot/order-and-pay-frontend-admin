import { faCheck } from "@fortawesome/free-solid-svg-icons"
import { Form, Formik } from "formik"
import { useState } from "react"
import * as Yup from "yup"
import { useActions } from "../../overmind"
import { LabelDto } from "../../overmind/labels/effects"
import { Label } from "../../overmind/labels/state"
import { Button } from "../Buttons/Button"
import { TextInput } from "../Form/TextInput"
import { Modal } from "../UI/Modal"

type LabelModalProps = {
    /** State Data from label to edit */
    modalEditData?: Label | null
    /** State Setter from modalEditData */
    setModalEditData?: React.Dispatch<React.SetStateAction<Label | null>> | null
    /** State for modal open/close */
    modalOpen: boolean
    /** State Setter for modalOpen */
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

/**
 * Modal for add and edit labels, possible to use only add functionality
 */
export const LabelModal: React.FunctionComponent<LabelModalProps> = ({ modalEditData, setModalEditData, modalOpen, setModalOpen }) => {
    // Global State
    const { createLabel, updateLabel } = useActions().labels

    // Local State
    const [isModalLoading, setIsModalLoading] = useState(false)

    // Formik
    const initialValues: LabelDto = {
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

        // Check if we are editing or creating a new label
        if (modalEditData) {
            if (!await updateLabel({
                id: modalEditData._id,
                label: values
            }))
                return
            // Clear modal data
            if (setModalEditData)
                setModalEditData(null)
            setModalOpen(false)
        }
        else {
            if (!await createLabel(values))
                return
            setModalOpen(false)
        }
        setIsModalLoading(false)
    }

    // Modal close handler
    const handleModelDismiss = () => {
        // Prevent closing modal when form is submitting
        if (isModalLoading)
            return

        // Close modal
        setModalOpen(false)

        // Clear modal data if we are editing a label
        if (modalEditData && setModalEditData)
            setModalEditData(null)
    }

    return (
        <Modal modalHeading={modalEditData ? `Label bearbeiten` : `Neues Label hinzufügen`} open={modalOpen} onDissmis={handleModelDismiss}>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={submitForm}>
                {({ dirty, isValid }) => (
                    <Form>
                        <TextInput name="title" placeholder="Gesund, Empfohlen, Lecker..." helperText="Wird am Gericht angezeigt" labelText="Name" labelRequired autoFocus />
                        <TextInput name="icon" placeholder="user" helperText="Font Awesome Icon eingeben!" labelText="Icon" />
                        <div className="flex justify-end">
                            <Button type="submit" loading={isModalLoading} disabled={!(dirty && isValid)} icon={faCheck}>{modalEditData ? `Speichern` : `Hinzufügen`}</Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </Modal>
    )
}