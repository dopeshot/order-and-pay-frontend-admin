import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { faLeaf, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"
import { Button } from "../../components/Buttons/Button"
import { IconButton } from "../../components/Buttons/IconButton"
import { EmptyState } from "../../components/Errors/EmptyState"
import { List } from "../../components/Lists/List"
import { ListItem } from "../../components/Lists/ListItem"
import { DeleteModal } from "../../components/Modals/DeleteModal"
import { LabelModal } from "../../components/Modals/LabelModal"
import { Loading } from "../../components/ProgressIndicators/Loading"
import { useActions, useAppState } from "../../overmind"
import { Label } from "../../overmind/labels/type"
import { setDocumentTitle } from "../../services/setDocumentTitle"

export const Labels: React.FC = () => {
    // Get hooks to manipulate global state
    const { getAllLabels, deleteLabel } = useActions().labels

    // Get global state
    const { labels } = useAppState().labels

    // Component States
    const [isLoadingLabels, setIsLoadingLabels] = useState(true)
    const [modalOpen, setModalOpen] = useState(false)
    const [modalEditData, setModalEditData] = useState<Label | null>(null)
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false)
    const [isLoadingDelete, setIsLoadingDelete] = useState(false)
    const [selectedLabel, setSelectedLabel] = useState<Label | null>(null)

    // Load labels when page is loaded
    useEffect((): void => {
        async function loadLabels() {
            try {
                await getAllLabels()
            } catch (error) {
                // Loading labels failed
            } finally {
                setIsLoadingLabels(false)
            }
        }

        loadLabels()
        setDocumentTitle("Labels")
    }, [getAllLabels])

    const handleDelete = async () => {
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

    if (!isLoadingLabels && labels.length === 0)
        return <EmptyState icon={faLeaf} title="Erstelle Labels" setModalOpen={setModalOpen} description="Es wurden noch keine Labels erstellt. Erstelle neue um sie den Gerichten hinzuf??gen zu k??nnen." buttonText="Label hinzuf??gen">
            <LabelModal modalOpen={modalOpen} setModalOpen={setModalOpen} modalEditData={modalEditData} setModalEditData={setModalEditData} />
        </EmptyState>

    return <div className="container md:max-w-full mt-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between">
            <div>
                <h1 className="text-2xl text-headline-black font-semibold">Labels</h1>
                <p data-cy="labels-count" className="text-lightgrey mr-3 mb-4">{labels.length ?? 0} Gesamt</p>
            </div>
            <div>
                <Button icon={faPlus} onClick={() => setModalOpen(true)}>Label hinzuf??gen</Button>
            </div>
        </div>
        {/* Header end */}

        {/* Content */}
        {(labels.length === 0 && isLoadingLabels) ? <Loading /> : <List lines>
            {labels.map((label) => <ListItem dataCy="labels-list-item" key={label._id} title={label.title} icon={label.icon as IconProp} onClick={() => {
                setModalEditData(label)
                setModalOpen(true)
            }}>
                <IconButton dataCy="labels-delete-button" className="ml-auto mr-4" icon={faTrash} onClick={() => openDeleteModal(label)} />
            </ListItem>)}
        </List>
        }
        {/* Content End */}

        {/* Add/Edit Label Modal */}
        <LabelModal modalOpen={modalOpen} setModalOpen={setModalOpen} modalEditData={modalEditData} setModalEditData={setModalEditData} />

        {/* Delete Modal */}
        <DeleteModal
            title={`${selectedLabel?.title}`}
            description={`Das L??schen kann nicht r??ckg??ngig gemacht werden. ${selectedLabel?.title} wird auch aus allen Kategorien entfernt.`}
            open={isDeleteModalOpen}
            onDissmis={closeDeleteModal}
            handleDelete={handleDelete}
            isLoadingDelete={isLoadingDelete}
        />
    </div>
}