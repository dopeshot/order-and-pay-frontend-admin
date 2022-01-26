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
import { LabelDto } from "../../overmind/labels/effects"
import { Label } from "../../overmind/labels/state"

export const Labels: React.FC = () => {
    // Get hooks to manipulate global state
    const { getAllLabels, createLabel, updateLabel, deleteLabel } = useActions().labels

    // Get global state
    const { labels, isLoadingLabels } = useAppState().labels

    // Component States
    const [modalOpen, setModalOpen] = useState(false)
    const [modalEditData, setModalEditData] = useState<Label | null>(null)
    const [isModalLoading, setIsModalLoading] = useState(false)

    // Load labels when page is loaded
    useEffect((): void => {
        getAllLabels()
    }, [getAllLabels])

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
            await updateLabel({
                id: modalEditData._id,
                label: values
            })
            // Clear modal data
            setModalEditData(null)
            setModalOpen(false)
        }
        else {
            await createLabel(values)
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
        if (modalEditData)
            setModalEditData(null)
    }

    const handleDelete = async (event: any, id: string) => {
        // This prevents the event from bubbling up the DOM to the parent node where you open edit
        event.stopPropagation()

        deleteLabel(id)
    }

    return < div className="container md:max-w-full mt-12" >
        <div className="flex flex-col md:flex-row md:justify-between">
            <div>
                <h1 className="text-2xl text-headline-black font-semibold">Labels</h1>
                <p className="text-lightgrey mr-3 mb-4">{!isLoadingLabels ? labels.length : 0} Gesamt</p>
            </div>
            <div>
                <Button icon={faPlus} onClick={() => setModalOpen(true)}>Label hinzufügen</Button>
            </div>
        </div>
        <List lines>
            {labels.map((label) => <ListItem key={label._id} title={label.title} icon={label.icon as IconProp} onClick={() => {
                setModalEditData(label)
                setModalOpen(true)
            }}>
                <IconButton className="ml-auto mr-4" icon={faTrash} onClick={(event) => handleDelete(event, label._id)} />
            </ListItem>)}
        </List>

        <Modal modalHeading={modalEditData ? `Label bearbeiten` : `Neues Label hinzufügen`} open={modalOpen} onDissmis={handleModelDismiss}>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={submitForm}>
                <Form>
                    <TextInput name="title" placeholder="Gesund, Empfohlen, Lecker..." helperText="Wird am Gericht angezeigt" labelText="Name" labelRequired />
                    <TextInput name="icon" placeholder="user" helperText="Font Awesome Icon eingeben!" labelText="Icon" />
                    <Button type="submit" loading={isModalLoading} icon={faCheck}>{modalEditData ? `Speichern` : `Hinzufügen`}</Button>
                </Form>
            </Formik>
        </Modal>
    </div >
}