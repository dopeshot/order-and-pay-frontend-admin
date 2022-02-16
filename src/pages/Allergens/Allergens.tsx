import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"
import { AllergensModal } from "../../components/Allergens/AllergensModal"
import { Button } from "../../components/Buttons/Button"
import { IconButton } from "../../components/Buttons/IconButton"
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

    // Load allergens when page is loaded
    useEffect((): void => {
        getAllAllergens()
    }, [getAllAllergens])

    const handleDelete = async (event: any, id: string) => {
        // This prevents the event from bubbling up the DOM to the parent node where you open edit
        event.stopPropagation()

        deleteAllergen(id)
    }

    return <div className="container md:max-w-full mt-12">
        <div className="flex flex-col md:flex-row md:justify-between">
            <div>
                <h1 className="text-2xl text-headline-black font-semibold">Allergene</h1>
                <p className="text-lightgrey mr-3 mb-4">{!isLoadingAllergens ? allergens.length : 0} Gesamt</p>
            </div>
            <div>
                <Button icon={faPlus} onClick={() => setModalOpen(true)}>Allergen hinzufügen</Button>
            </div>
        </div>
        <List lines>
            {allergens.map((allergen) => <ListItem key={allergen._id} title={allergen.title} icon={allergen.icon as IconProp} onClick={() => {
                setModalEditData(allergen)
                setModalOpen(true)
            }}>
                <IconButton className="ml-auto mr-4" icon={faTrash} onClick={(event) => handleDelete(event, allergen._id)} />
            </ListItem>)}
        </List>

        <AllergensModal modalOpen={modalOpen} setModalOpen={setModalOpen} modalEditData={modalEditData} setModalEditData={setModalEditData} />
    </div>

}