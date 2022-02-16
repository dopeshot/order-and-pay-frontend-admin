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
    modalEditData?: Label | null
    setModalEditData?: React.Dispatch<React.SetStateAction<Label | null>> | null
    modalOpen: boolean
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const LabelModal: React.FunctionComponent<LabelModalProps> = ({ modalEditData, setModalEditData, modalOpen, setModalOpen }) => {
    const { createLabel, updateLabel } = useActions().labels
    const [isModalLoading, setIsModalLoading] = useState(false)

    const initialValues: LabelDto = {
        title: modalEditData?.title ?? "",
        icon: modalEditData?.icon ?? "user"
    }

    const validationSchema = Yup.object().shape({
        title: Yup.string().min(2).max(20).required("Title is required"),
        icon: Yup.string()
    })

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
                <Form>
                    <TextInput name="title" placeholder="Gesund, Empfohlen, Lecker..." helperText="Wird am Gericht angezeigt" labelText="Name" labelRequired autoFocus />
                    <TextInput name="icon" placeholder="user" helperText="Font Awesome Icon eingeben!" labelText="Icon" />
                    <Button type="submit" loading={isModalLoading} icon={faCheck}>{modalEditData ? `Speichern` : `Hinzufügen`}</Button>
                </Form>
            </Formik>
        </Modal>
    )
}