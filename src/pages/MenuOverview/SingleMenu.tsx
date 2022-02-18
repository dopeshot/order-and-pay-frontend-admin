import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { faArrowLeft, faPlus, faTrash, faUtensils } from "@fortawesome/free-solid-svg-icons"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { Button } from "../../components/Buttons/Button"
import { IconButton } from "../../components/Buttons/IconButton"
import { List } from "../../components/UI/List"
import { ListItem } from "../../components/UI/ListItem"
import { Tag, TagTypesEnum } from "../../components/UI/Tag"
import { useActions, useAppState } from "../../overmind"

type SingleMenuParams = {
    menuId: string
}

export const SingleMenu: React.FC = () => {
    const { menuId } = useParams<SingleMenuParams>()

    const { isMobile } = useAppState().app

    const { isLoadingMenu, menu } = useAppState().menuoverview
    const { getMenuEditor } = useActions().menuoverview

    useEffect((): void => {
        getMenuEditor(menuId)
    }, [getMenuEditor, menuId])

    const priceFormatter = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' })

    return (
        <div className="container md:max-w-full mt-12">
            {/* Back Button */}
            <Button dataCy="singlemenu-back-button" kind="tertiary" to="/menus" icon={faArrowLeft} className="mb-3 inline-block text-darkgrey">Zurück zu allen Menüs</Button>

            {isLoadingMenu ? <p>Loading...</p> : <>
                {/* Header */}
                <div className="flex items-baseline">
                    <h1 className="text-2xl text-headline-black font-semibold mr-3 mb-1">{menu?.title}</h1>
                    {menu?.isActive && <Tag title="aktiv" type={TagTypesEnum.green} />}
                </div>
                <div className="flex flex-col md:flex-row md:justify-between mb-8">
                    <div className="w-full mb-4 md:w-96 md:mb-0">
                        <p className="text-darkgrey">{menu?.description}</p>
                    </div>
                    <div>
                        <Button icon={faPlus} onClick={() => ""}>Kategorie hinzufügen</Button>
                    </div>
                </div>
                {/* Header end */}

                {/* Categories and Dishes */}
                <div>
                    <List>
                        <>
                            {/* Category */}
                            {menu?.categories.map(category => (<div key={category._id}>
                                <ListItem dataCy="singlemenu-category-listitem" title={category.title} icon={category.icon as IconProp} background header={<p className="text-darkgrey">{category.dishes.length === 1 ? `1 Gericht` : `${category.dishes.length} Gerichte`}</p>}>
                                    {isMobile ? <IconButton icon={faPlus} /> : <Button kind="tertiary" dataCy={`singlemenu-${category.title}-dish-add`} to={`/menus/${menuId}/categories/${category._id}/dish`} icon={faPlus} className="text-darkgrey mr-3">Gericht hinzufügen</Button>}
                                    <IconButton icon={faTrash} onClick={() => console.log("remove")} />
                                </ListItem>
                                {/* Dishes */}
                                {category.dishes.map(dish => (
                                    <ListItem dataCy={`singlemenu-${category.title}-dish-listitem`} to={`/menus/${menuId}/categories/${category._id}/dish/${dish._id}`} key={dish._id} icon={faUtensils} title={dish.title} header={!dish.isAvailable ? <Tag title="not available" type={TagTypesEnum.red} /> : <></>} indent>
                                        <h6 className="text-headline-black text-lg font-semibold mr-3">{priceFormatter.format(dish.price / 100)}</h6>
                                        <IconButton icon={faTrash} onClick={() => console.log("remove")} />
                                    </ListItem>
                                ))}
                                {/* Dishes end */}
                            </div>))}
                            {/* Category End */}
                        </>
                    </List>
                </div>
                {/* Categories and Dishes end */}
            </>}
        </div>
    )
}