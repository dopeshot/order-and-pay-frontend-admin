import { faEdit, faFolder, faPlus, faTrash, faUtensils } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"
import { Button } from "../../components/Buttons/Button"
import { IconButton } from "../../components/Buttons/IconButton"
import { EmptyState } from "../../components/Errors/EmptyState"
import { List } from "../../components/Lists/List"
import { ListItem } from "../../components/Lists/ListItem"
import { DeleteModal } from "../../components/Modals/DeleteModal"
import { Chip, ChipTypesEnum } from "../../components/UI/Chip"
import { Loading } from "../../components/UI/Loading"
import { useActions, useAppState } from "../../overmind"
import { Menu } from "../../overmind/menus/state"

export const Menus: React.FC = () => {
    // Get hooks to manipulate global state
    const { getAllMenus } = useActions().menus

    // Get global state
    const { menus } = useAppState().menus
    const { deleteMenu } = useActions().menus

    // Component states
    const [isLoadingMenus, setIsLoadingMenus] = useState(true)
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false)
    const [isLoadingDelete, setIsLoadingDelete] = useState(false)
    const [selectedMenu, setSelectedMenu] = useState<Menu | null>(null)

    // Load menus when page is loaded
    useEffect((): void => {
        async function loadMenus() {
            try {
                await getAllMenus()
            } catch (error) {
                // Loading menus failed
            } finally {
                setIsLoadingMenus(false)
            }
        }
        loadMenus()
    }, [getAllMenus])

    const handleDelete = async () => {
        /* istanbul ignore next // should not happen just fallback */
        if (!selectedMenu) {
            console.warn("There is no menu selected.")
            return
        }

        setIsLoadingDelete(true)

        try {
            // Delete the menu
            await deleteMenu(selectedMenu._id)

            closeDeleteModal()

            // When menu is delete update List
            getAllMenus()
        } catch (error) {
            // Delete failed
        } finally {
            setIsLoadingDelete(false)
        }
    }

    const openDeleteModal = (menu: Menu) => {
        setSelectedMenu(menu)
        setDeleteModalOpen(true)
    }

    const closeDeleteModal = () => {
        setDeleteModalOpen(false)
        setSelectedMenu(null)
    }

    if (!isLoadingMenus && menus.length === 0)
        return <EmptyState icon={faUtensils} to="/admin/menus/add" title="Erstelle Menü" description="Es wurden noch kein Menu erstellt. Erstelle eines um Gerichte und Kategorien hinzufügen zu können." buttonText="Menu hinzufügen" />

    return <div className="container md:max-w-full mt-12" >
        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between mb-4">
            <div>
                <h1 className="text-2xl text-headline-black font-semibold">Alle Menüs</h1>
                <p data-cy="menus-count" className="text-lightgrey mb-4 md:mb-0">{menus.length ?? 0} Gesamt</p>
            </div>
            <div>
                <Button icon={faPlus} to="/admin/menus/add">Menü hinzufügen</Button>
            </div>
        </div>
        {/* Header end */}

        {/* Content */}
        {(menus.length === 0 && isLoadingMenus) ? <Loading /> : <List lines>
            {menus.map((menu) => <ListItem dataCy="menus-list-item" key={menu._id} title={menu.title} icon={faFolder} to={`/admin/menus/${menu._id}/editor`} header={menu.isActive ? <Chip title="Aktiv" type={ChipTypesEnum.green} /> : undefined}>
                <IconButton dataCy="menus-edit-button" className="ml-auto mr-4" icon={faEdit} to={`/admin/menus/${menu._id}/edit`} />
                <IconButton dataCy="menus-delete-button" className="mr-4" icon={faTrash} onClick={() => openDeleteModal(menu)} />
            </ListItem>)}
        </List>
        }
        {/* Content End */}

        {/* Delete Modal */}
        <DeleteModal
            title={`${selectedMenu?.title}`}
            description="Das Löschen kann nicht rückgängig gemacht werden."
            open={isDeleteModalOpen}
            onDissmis={closeDeleteModal}
            handleDelete={handleDelete}
            isLoadingDelete={isLoadingDelete}
        />
    </div>
}