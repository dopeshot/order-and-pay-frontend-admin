import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { faGlassWhiskey, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"
import { Button } from "../../components/Buttons/Button"
import { IconButton } from "../../components/Buttons/IconButton"
import { EmptyState } from "../../components/Errors/EmptyState"
import { List } from "../../components/Lists/List"
import { ListItem } from "../../components/Lists/ListItem"
import { AllergensModal } from "../../components/Modals/AllergensModal"
import { DeleteModal } from "../../components/Modals/DeleteModal"
import { Loading } from "../../components/ProgressIndicators/Loading"
import { useActions, useAppState } from "../../overmind"
import { Allergen } from "../../overmind/allergens/type"

export const Allergens: React.FC = () => {
    // Get hooks to manipulate global state
    const { getAllAllergens, deleteAllergen } = useActions().allergens

    // Get global state
    const { allergens } = useAppState().allergens

    // Component States
    const [modalOpen, setModalOpen] = useState(false)
    const [isLoadingAllergens, setLoadingAllergens] = useState(true)
    const [modalEditData, setModalEditData] = useState<Allergen | null>(null)
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false)
    const [isLoadingDelete, setIsLoadingDelete] = useState(false)
    const [selectedAllergen, setSelectedAllergen] = useState<Allergen | null>(null)

    // Load allergens when page is loaded
    useEffect((): void => {
        async function loadAllergens() {
            try {
                await getAllAllergens()
            } catch (error) {
                // Loading allergens failed
            } finally {
                setLoadingAllergens(false)
            }
        }

        loadAllergens()
    }, [getAllAllergens])

    const handleDelete = async (event: any) => {
        /* istanbul ignore next // should not happen just fallback */
        if (!selectedAllergen) {
            console.warn("There is no allergen selected.")
            return
        }

        setIsLoadingDelete(true)

        // Delete the allergen and close modal when succesfull
        if (await deleteAllergen(selectedAllergen._id))
            closeDeleteModal()

        setIsLoadingDelete(false)

        // When allergen is delete update List
        getAllAllergens()
    }

    const openDeleteModal = (allergen: Allergen) => {
        setSelectedAllergen(allergen)
        setDeleteModalOpen(true)
    }

    const closeDeleteModal = () => {
        setDeleteModalOpen(false)
        setSelectedAllergen(null)
    }

    if (!isLoadingAllergens && allergens.length === 0)
        return <EmptyState icon={faGlassWhiskey} title="Erstelle Allergene" setModalOpen={setModalOpen} description="Es wurden noch keine Allergenen erstellt. Erstelle neue um sie den Gerichten hinzufügen zu können." buttonText="Allergen hinzufügen">
            <AllergensModal modalOpen={modalOpen} setModalOpen={setModalOpen} modalEditData={modalEditData} setModalEditData={setModalEditData} />
        </EmptyState>

    return <div className="container md:max-w-full mt-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between">
            <div>
                <h1 className="text-2xl text-headline-black font-semibold">Allergene</h1>
                <p data-cy="allergens-count" className="text-lightgrey mr-3 mb-4">{allergens.length ?? 0} Gesamt</p>
            </div>
            <div>
                <Button icon={faPlus} onClick={() => setModalOpen(true)}>Allergen hinzufügen</Button>
            </div>
        </div>
        {/* Header end */}

        {/* Content */}
        {(allergens.length === 0 && isLoadingAllergens) ? <Loading /> : <List lines>
            {allergens.map((allergen) => <ListItem dataCy="allergens-list-item" key={allergen._id} title={allergen.title} icon={allergen.icon as IconProp} onClick={() => {
                setModalEditData(allergen)
                setModalOpen(true)
            }}>
                <IconButton dataCy="allergens-delete-button" className="ml-auto mr-4" icon={faTrash} onClick={() => openDeleteModal(allergen)} />
            </ListItem>)}
        </List>
        }
        {/* Content End */}

        {/* Add/Edit Allergen Modal */}
        <AllergensModal modalOpen={modalOpen} setModalOpen={setModalOpen} modalEditData={modalEditData} setModalEditData={setModalEditData} />

        {/* Delete Modal */}
        <DeleteModal
            title={`${selectedAllergen?.title}`}
            description={`Das Löschen kann nicht rückgängig gemacht werden. ${selectedAllergen?.title} wird auch aus allen Kategorien entfernt.`}
            open={isDeleteModalOpen}
            onDissmis={closeDeleteModal}
            handleDelete={handleDelete}
            isLoadingDelete={isLoadingDelete}
        />
    </div>
}