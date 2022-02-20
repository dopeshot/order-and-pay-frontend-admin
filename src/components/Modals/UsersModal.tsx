import { faCheck } from "@fortawesome/free-solid-svg-icons"
import { Form, Formik } from "formik"
import { useState } from "react"
import * as Yup from "yup"
import { useActions } from "../../overmind"
import { User, UserDto } from "../../overmind/users/type"
import { Button } from "../Buttons/Button"
import { PasswordInput } from "../Forms/PasswortInput"
import { TextInput } from "../Forms/TextInput"
import { Modal } from "./Modal"

type UsersModalProps = {
    /** State Data from user to edit */
    modalEditData: User | null
    /** State Setter from modalEditData */
    setModalEditData: React.Dispatch<React.SetStateAction<User | null>>
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
    const validatePasswordAdd = Yup.string().min(8, 'Das Passwort muss aus mindestens 8 Zeichen bestehen.').max(124, 'Das Passwort darf nicht länger als 124 Zeichen sein.').required('Dies ist ein Pflichtfeld')
    const validatePasswordEdit = Yup.string().min(8, 'Das Passwort muss aus mindestens 8 Zeichen bestehen.').max(124, 'Das Passwort darf nicht länger als 124 Zeichen sein.')

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Diese E-Mail-Adresse ist ungültig. Versuche es mit einer anderen.').required('Dies ist ein Pflichtfeld'),
        username: Yup.string().min(3, 'Der Username muss aus mindestens 3 Zeichen bestehen.').max(24, 'Der Username darf nicht länger als 24 Zeichen sein.').required('Dies ist ein Pflichtfeld'),
        password: modalEditData ? validatePasswordEdit : validatePasswordAdd
    })

    // Formik Submit Form
    const submitForm = async (user: UserDto) => {
        setIsModalLoading(true)

        try {
            if (modalEditData) {
                await updateUser({
                    _id: modalEditData._id,
                    user: user
                })

                // Clear modal data
                setModalEditData(null)
            }
            else {
                await createUser(user)
            }

            setModalOpen(false)
        } catch (error) {
            // Create or update failed
        } finally {
            setIsModalLoading(false)
        }
    }


    // Modal close handler
    const handleModelDismiss = () => {
        // istanbul ignore if // Prevent closing modal when form is submitting
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
                        <TextInput name="username" placeholder="user" labelText="Username" autoFocus />
                        <TextInput name="email" placeholder="name@adresse.de" labelText="E-Mail" labelRequired />
                        <PasswordInput />
                        <div className="flex justify-end">
                            <Button dataCy="users-modal-add-edit-button" type="submit" loading={isModalLoading} disabled={!(dirty && isValid)} icon={faCheck}>{modalEditData ? `Speichern` : `Hinzufügen`}</Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </Modal>
    )
}