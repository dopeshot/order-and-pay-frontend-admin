import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"
import { AllergensModal } from "../../components/Allergens/AllergensModal"
import { Button } from "../../components/Buttons/Button"
import { IconButton } from "../../components/Buttons/IconButton"
import { DeleteModal } from "../../components/UI/DeleteModal"
import { List } from "../../components/UI/List"
import { ListItem } from "../../components/UI/ListItem"
import { useActions, useAppState } from "../../overmind"
import { Allergen } from "../../overmind/allergens/state"

export const Allergens: React.FC = () => {
    // Get hooks to manipulate global state
    const { getAllAllergens, deleteAllergen } = useActions().allergens

    // Get global state
    const { allergens, isLoadingAllergens } = useAppState().allergens

    // Component States
    const [modalOpen, setModalOpen] = useState(false)
    const [modalEditData, setModalEditData] = useState<Allergen | null>(null)
    const [hasDeleteModal, setHasDeleteModal] = useState(false)
    const [isLoadingDelete, setIsLoadingDelete] = useState(false)
    const [selectedAllergen, setSelectedAllergen] = useState<Allergen | null>(null)

    // Load allergens when page is loaded
    useEffect((): void => {
        getAllAllergens()
    }, [getAllAllergens])

    const handleDelete = async (event: any) => {
        if (!selectedAllergen) {
            console.warn("There is no allergen selected.")
            return
        }

        setIsLoadingDelete(true)

        // Delete the allergen
        await deleteAllergen(selectedAllergen._id)

        setHasDeleteModal(false)
        setIsLoadingDelete(false)

        // When allergen is delete update List
        getAllAllergens()
    }

    const openDeleteModal = (allergen: Allergen) => {
        setSelectedAllergen(allergen)
        setHasDeleteModal(true)
    }

    const closeDeleteModal = () => {
        setHasDeleteModal(false)
        setSelectedAllergen(null)
    }

    return <div className="container md:max-w-full mt-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between">
            <div>
                <h1 className="text-2xl text-headline-black font-semibold">Allergene</h1>
                <p className="text-lightgrey mr-3 mb-4">{!isLoadingAllergens ? allergens.length : 0} Gesamt</p>
            </div>
            <div>
                <Button icon={faPlus} onClick={() => setModalOpen(true)}>Allergen hinzufügen</Button>
            </div>
        </div>
        {/* Header end */}

        {/* Content */}
        <List lines>
            {allergens.map((allergen) => <ListItem key={allergen._id} title={allergen.title} icon={allergen.icon as IconProp} onClick={() => {
                setModalEditData(allergen)
                setModalOpen(true)
            }}>
                <IconButton className="ml-auto mr-4" icon={faTrash} onClick={() => openDeleteModal(allergen)} />
            </ListItem>)}
        </List>
        {/* Content End */}

        {/* Add/Edit Allergen Modal */}
        <AllergensModal modalOpen={modalOpen} setModalOpen={setModalOpen} modalEditData={modalEditData} setModalEditData={setModalEditData} />

        {/* Delete Modal */}
        <DeleteModal
            title={`${selectedAllergen?.title}`}
            description={`Das Löschen kann nicht rückgängig gemacht werden. ${selectedAllergen?.title} wird auch aus allen Kategorien entfernt.`}
            open={hasDeleteModal}
            onDissmis={closeDeleteModal}
            handleDelete={handleDelete}
            isLoadingDelete={isLoadingDelete}
        />
    </div>
}