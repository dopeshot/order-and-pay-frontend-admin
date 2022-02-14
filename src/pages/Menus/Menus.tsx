import { faEdit, faFolder, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { Button } from "../../components/Buttons/Button"
import { IconButton } from "../../components/Buttons/IconButton"
import { List } from "../../components/UI/List"
import { ListItem } from "../../components/UI/ListItem"
import { Modal } from "../../components/UI/Modal"
import { Tag, TagTypesEnum } from "../../components/UI/Tag"
import { useActions, useAppState } from "../../overmind"
import { Menu } from "../../overmind/menus/state"

export const Menus: React.FC = () => {
    const history = useHistory()

    // Get hooks to manipulate global state
    const { getAllMenus } = useActions().menus

    // Get global state
    const { menus, isLoadingMenus } = useAppState().menus
    const { deleteMenu } = useActions().menus

    // Component states
    const [hasDeleteModal, setHasDeleteModal] = useState(false)
    const [isLoadingDelete, setIsLoadingDelete] = useState(false)
    const [selectedMenu, setSelectedMenu] = useState<Menu | null>(null)

    // Load labels when page is loaded
    useEffect((): void => {
        getAllMenus()
    }, [getAllMenus])

    const handleDelete = async (event: any) => {
        if (!selectedMenu) {
            console.warn("There is no menu selected.")
            return
        }

        setIsLoadingDelete(true)

        // Delete the menu
        await deleteMenu(selectedMenu._id)

        setHasDeleteModal(false)
        setIsLoadingDelete(false)

        // When menu is delete update List
        getAllMenus()
    }

    const openDeleteModal = (event: any, menu: Menu) => {
        // This prevents the event from bubbling up the DOM to the parent node where you open edit
        event.stopPropagation()
        event.preventDefault()

        setSelectedMenu(menu)
        setHasDeleteModal(true)
    }

    const closeDeleteModal = () => {
        setHasDeleteModal(false)
        setSelectedMenu(null)
    }

    const editMenu = (event: any, menu: Menu) => {
        // This prevents the event from bubbling up the DOM to the parent node where you open edit
        event.stopPropagation()
        event.preventDefault()

        history.push(`/menus/${menu._id}/edit`)
    }

    return <div className="container md:max-w-full mt-12" >
        <div className="flex flex-col md:flex-row md:justify-between mb-4">
            <div>
                <h1 className="text-2xl text-headline-black font-semibold">Alle Menüs</h1>
                <p className="text-lightgrey mb-4 md:mb-0">{!isLoadingMenus ? menus.length : 0} Gesamt</p>
            </div>
            <div>
                <Button icon={faPlus} to="/menus/add">Menü hinzufügen</Button>
            </div>
        </div>
        <List lines>
            {menus.map((menu) => <ListItem key={menu._id} title={menu.title} icon={faFolder} to={`/menus/${menu._id}/editor`}>
                {menu.isActive && <Tag title="Aktiv" type={TagTypesEnum.green} />}
                <IconButton className="ml-auto mr-4" icon={faEdit} onClick={(event) => editMenu(event, menu)} />
                <IconButton className="mr-4" icon={faTrash} onClick={(event) => openDeleteModal(event, menu)} />
            </ListItem>)}
        </List>
        <Modal modalHeading={`${selectedMenu?.title} löschen?`} open={hasDeleteModal} onDissmis={closeDeleteModal}>
            <p>Das löschen kann nicht rückgängig gemacht werden.</p>
            <div className="flex md:justify-between flex-col md:flex-row">
                <Button kind="tertiary" onClick={closeDeleteModal} className="my-4 md:my-0">Abbrechen</Button>
                <Button kind="primary" onClick={(event) => handleDelete(event)} loading={isLoadingDelete} icon={faTrash} >Löschen</Button>
            </div>
        </Modal>
    </div>
}