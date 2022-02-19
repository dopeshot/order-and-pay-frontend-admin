import { faCheck } from "@fortawesome/free-solid-svg-icons"
import { Form, Formik } from "formik"
import { useState } from "react"
import * as Yup from "yup"
import { useActions } from "../../overmind"
import { User, UserDto } from "../../overmind/users/effects"
import { Button } from "../Buttons/Button"
import { PasswordInput } from "../Form/PasswortInput"
import { TextInput } from "../Form/TextInput"
import { Modal } from "../UI/Modal"

type UsersModalProps = {
    /** State Data from user to edit */
    modalEditData?: User | null
    /** State Setter from modalEditData */
    setModalEditData?: React.Dispatch<React.SetStateAction<User | null>> | null
    /** State for modal open/close */
    modalOpen: boolean
    /** State Setter for modalOpen */
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

/**
 * Modal for add and edit users, possible to use only add functionality
 */
export const UsersModal: React.FunctionComponent<UsersModalProps> = ({ modalEditData, setModalEditData, modalOpen, setModalOpen }) => {
    // Global State
    const { createUser, updateUser } = useActions().users

    // Local State
    const [isModalLoading, setIsModalLoading] = useState(false)

    // Formik
    const initialValues: UserDto = {
        email: modalEditData?.email ?? "",
        username: modalEditData?.username ?? "",
        password: ""
    }

    // Formik Validation
    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Diese E-Mail-Adresse ist ungültig. Versuche es mit einer anderen.').required('Dies ist ein Pflichtfeld'),
        username: Yup.string().min(3, 'Der Username muss aus mindestens 3 Zeichen bestehen.').max(24, 'Der Username darf nicht länger als 24 Zeichen sein.').required('Dies ist ein Pflichtfeld'),
        password: Yup.string().min(8, 'Das Passwort muss aus mindestens 8 Zeichen bestehen.').max(124, 'Das Passwort darf nicht länger als 124 Zeichen sein.').required('Dies ist ein Pflichtfeld')
    })

    // Formik Submit Form
    const submitForm = async (user: UserDto) => {
        setIsModalLoading(true)

        // Check if we are editing or creating a new label
        if (modalEditData) {
            if (!await updateUser({
                _id: modalEditData._id,
                user: user
            }))
                return
            // Clear modal data
            if (setModalEditData)
                setModalEditData(null)
            setModalOpen(false)
        }
        else {
            if (!await createUser(user))
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
        <Modal dataCy="users-modal-add-edit" modalHeading={modalEditData ? `Benutzer bearbeiten` : `Neuen Benutzer hinzufügen`} open={modalOpen} onDissmis={handleModelDismiss}>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={submitForm}>
                {({ dirty, isValid }) => (
                    <Form>
                        <TextInput name="username" placeholder="user" labelText="Username" />
                        <TextInput name="email" placeholder="name@adresse.de" labelText="E-Mail" labelRequired autoFocus />
                        <PasswordInput />
                        <div className="flex justify-end">
                            <Button type="submit" loading={isModalLoading} disabled={!(dirty && isValid)} icon={faCheck}>{modalEditData ? `Speichern` : `Hinzufügen`}</Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </Modal>
    )
}