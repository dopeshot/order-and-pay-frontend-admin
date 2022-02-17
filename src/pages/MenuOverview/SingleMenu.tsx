import { faArrowLeft, faPizzaSlice, faPlus, faTrash, faUtensils } from "@fortawesome/free-solid-svg-icons"
import { useParams } from "react-router-dom"
import { Button } from "../../components/Buttons/Button"
import { IconButton } from "../../components/Buttons/IconButton"
import { List } from "../../components/UI/List"
import { ListItem } from "../../components/UI/ListItem"
import { Tag, TagTypesEnum } from "../../components/UI/Tag"
import { useAppState } from "../../overmind"

type SingleMenuParams = {
    menuId: string
}

export const SingleMenu: React.FC = () => {
    const { menuId } = useParams<SingleMenuParams>()

    const { isMobile } = useAppState().app

    return (
        <div className="container md:max-w-full mt-12">
            {/* Back Button */}
            <Button kind="tertiary" to="/menus" icon={faArrowLeft} className="mb-3 inline-block text-darkgrey">Zurück zu allen Menüs</Button>

            {/* Header */}
            <div className="flex items-baseline">
                <h1 className="text-2xl text-headline-black font-semibold mr-3 mb-1">Menu {menuId}</h1>
                <Tag title="aktiv" type={TagTypesEnum.green} />
            </div>
            <div className="flex flex-col md:flex-row md:justify-between mb-8">
                <div className="w-full mb-4 md:w-96 md:mb-0">
                    <p className="text-darkgrey">Dies ist eine Beschreibung vom Standard Menü. Sie steht hier einfach drunter</p>
                </div>
                <div>
                    <Button icon={faPlus} onClick={() => ""}>Kategorie hinzufügen</Button>
                </div>
            </div>
            {/* Header end */}

            {/* Categories and Dishes */}
            <div>
                <List>
                    {/* Category */}
                    <ListItem title="Pizzen" icon={faPizzaSlice} background header={<p className="text-darkgrey">3 Gerichte</p>}>
                        {isMobile ? <IconButton icon={faPlus} /> : <Button kind="tertiary" icon={faPlus} className="text-darkgrey mr-3">Gericht hinzufügen</Button>}
                        <IconButton icon={faTrash} onClick={() => console.log("remove")} />
                    </ListItem>
                    {/* Category End */}
                    {/* Dish Element */}
                    <ListItem icon={faUtensils} title="Napoli" indent>
                        <h6 className="text-headline-black text-lg font-semibold mr-3">6,50€</h6>
                        <IconButton icon={faTrash} onClick={() => console.log("remove")} />
                    </ListItem>
                    {/* Dish Element end */}
                    <ListItem icon={faUtensils} title="Napoli" indent>
                        <h6 className="text-headline-black text-lg font-semibold mr-3">6,50€</h6>
                        <IconButton icon={faTrash} onClick={() => console.log("remove")} />
                    </ListItem>
                </List>
            </div>
            {/* Categories and Dishes end */}
        </div>
    )
}