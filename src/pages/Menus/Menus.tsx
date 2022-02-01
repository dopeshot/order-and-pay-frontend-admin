import { faFolder, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons"
import { useEffect } from "react"
import { Button } from "../../components/Buttons/Button"
import { IconButton } from "../../components/Buttons/IconButton"
import { List } from "../../components/UI/List"
import { ListItem } from "../../components/UI/ListItem"
import { Tag, TagTypesEnum } from "../../components/UI/Tag"
import { useActions, useAppState } from "../../overmind"

export const Menus: React.FC = () => {
    // Get hooks to manipulate global state
    const { getAllMenus } = useActions().menus

    // Get global state
    const { menus, isLoadingMenus } = useAppState().menus
    const { deleteMenu } = useActions().menus

    // Load labels when page is loaded
    useEffect((): void => {
        getAllMenus()
    }, [getAllMenus])

    const handleDelete = async (event: any, id: string) => {
        // This prevents the event from bubbling up the DOM to the parent node where you open edit
        event.stopPropagation()
        event.preventDefault()

        // Delete the menu
        await deleteMenu(id)

        // When menu is delete update List
        getAllMenus()
    }

    return <div className="container md:max-w-full mt-12" >
        <div className="flex flex-col md:flex-row md:justify-between">
            <div>
                <h1 className="text-2xl text-headline-black font-semibold">Alle Menüs</h1>
                <p className="text-lightgrey mr-3 mb-4">{!isLoadingMenus ? menus.length : 0} Gesamt</p>
            </div>
            <div>
                <Button icon={faPlus} to="/menus/add">Menü hinzufügen</Button>
            </div>
        </div>
        <List lines>
            {menus.map((menu) => <ListItem key={menu._id} title={menu.title} icon={faFolder} to={`/menus/edit/${menu._id}`}>
                {menu.isActive && <Tag title="Active" type={TagTypesEnum.green} />}
                <IconButton className="ml-auto mr-4" icon={faTrash} onClick={(event) => handleDelete(event, menu._id)} />
            </ListItem>)}
        </List>

    </div>
}