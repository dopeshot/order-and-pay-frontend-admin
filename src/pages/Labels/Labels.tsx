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

export const Labels: React.FC = () => {
    // Get hooks to manipulate global state
    const { getAllLabels, createLabel } = useActions().labels

    // Get global state
    const { labels, isLoadingLabels } = useAppState().labels

    // Component States
    const [modalOpen, setModalOpen] = useState(false)
    const [isLoadingCreateLabel, setIsLoadingCreateLabel] = useState(false)

    // Load labels when page is loaded
    useEffect((): void => {
        getAllLabels()
    }, [getAllLabels])

    const initialValues: LabelDto = {
        title: "",
        icon: "user"
    }

    const validationSchema = Yup.object().shape({
        title: Yup.string().min(2).max(20).required("Title is required"),
        icon: Yup.string()
    })

    const submitForm = async (values: LabelDto) => {
        setIsLoadingCreateLabel(true)
        // Close modal when create label was successful 
        if (await createLabel(values))
            setModalOpen(false)
        setIsLoadingCreateLabel(false)
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

        <Button kind="primary" onClick={() => createLabel({
            icon: "user",
            title: Math.random().toString()
        })}>Create Label</Button>
        <List lines>
            {labels.map((label) => <ListItem key={label._id} title={label.title} icon={label.icon as IconProp} onClick={() => console.log("List")}>
                <IconButton className="ml-auto mr-4" icon={faTrash} onClick={() => console.log("trash me")} />
            </ListItem>)}
        </List>

        <Modal modalHeading="Neues Label hinzufügen" open={modalOpen} onDissmis={() => {
            // Prevent closing modal when form is submitting
            if (!isLoadingCreateLabel)
                setModalOpen(false)
        }}>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={submitForm}>
                <Form>
                    <TextInput name="title" placeholder="Gesund, Empfohlen, Lecker..." helperText="Wird am Gericht angezeigt" labelText="Name" labelRequired />
                    <TextInput name="icon" placeholder="user" helperText="Font Awesome Icon eingeben!" labelText="Icon" />
                    <Button type="submit" loading={isLoadingCreateLabel} icon={faCheck}>Speichern</Button>
                </Form>
            </Formik>
        </Modal>
    </div >
}