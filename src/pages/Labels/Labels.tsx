import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"
import { Button } from "../../components/Buttons/Button"
import { IconButton } from "../../components/Buttons/IconButton"
import { LabelModal } from "../../components/Labels/LabelModal"
import { DeleteModal } from "../../components/UI/DeleteModal"
import { List } from "../../components/UI/List"
import { ListItem } from "../../components/UI/ListItem"
import { useActions, useAppState } from "../../overmind"
import { Label } from "../../overmind/labels/state"

export const Labels: React.FC = () => {
    // Get hooks to manipulate global state
    const { getAllLabels, deleteLabel } = useActions().labels

    // Get global state
    const { labels, isLoadingLabels } = useAppState().labels

    // Component States
    const [modalOpen, setModalOpen] = useState(false)
    const [modalEditData, setModalEditData] = useState<Label | null>(null)
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false)
    const [isLoadingDelete, setIsLoadingDelete] = useState(false)
    const [selectedLabel, setSelectedLabel] = useState<Label | null>(null)

    // Load labels when page is loaded
    useEffect((): void => {
        getAllLabels()
    }, [getAllLabels])

    const handleDelete = async (event: any) => {
        /* istanbul ignore next // should not happen just fallback */
        if (!selectedLabel) {
            console.warn("There is no label selected.")
            return
        }

        setIsLoadingDelete(true)

        // Delete the label and close modal when succesfull
        if (await deleteLabel(selectedLabel._id))
            closeDeleteModal()

        setIsLoadingDelete(false)

        // When allergen is delete update List
        getAllLabels()
    }

    const openDeleteModal = (label: Label) => {
        setSelectedLabel(label)
        setDeleteModalOpen(true)
    }

    const closeDeleteModal = () => {
        setDeleteModalOpen(false)
        setSelectedLabel(null)
    }

    return <div className="container md:max-w-full mt-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between">
            <div>
                <h1 className="text-2xl text-headline-black font-semibold">Labels</h1>
                <p data-cy="labels-count" className="text-lightgrey mr-3 mb-4">{!isLoadingLabels ? labels.length : 0} Gesamt</p>
            </div>
            <div>
                <Button icon={faPlus} onClick={() => setModalOpen(true)}>Label hinzufügen</Button>
            </div>
        </div>
        {/* Header end */}

        {/* Content */}
        <List lines>
            {labels.map((label) => <ListItem dataCy="labels-list-item" key={label._id} title={label.title} icon={label.icon as IconProp} onClick={() => {
                setModalEditData(label)
                setModalOpen(true)
            }}>
                <IconButton dataCy="labels-delete-button" className="ml-auto mr-4" icon={faTrash} onClick={() => openDeleteModal(label)} />
            </ListItem>)}
        </List>
        {/* Content End */}

        {/* Add/Edit Label Modal */}
        <LabelModal modalOpen={modalOpen} setModalOpen={setModalOpen} modalEditData={modalEditData} setModalEditData={setModalEditData} />

        {/* Delete Modal */}
        <DeleteModal
            title={`${selectedLabel?.title}`}
            description={`Das Löschen kann nicht rückgängig gemacht werden. ${selectedLabel?.title} wird auch aus allen Kategorien entfernt.`}
            open={isDeleteModalOpen}
            onDissmis={closeDeleteModal}
            handleDelete={handleDelete}
            isLoadingDelete={isLoadingDelete}
        />
    </div>
}