import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { faArrowLeft, faPlus, faTrash, faUtensils } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Button } from "../../components/Buttons/Button"
import { IconButton } from "../../components/Buttons/IconButton"
import { DeleteModal } from "../../components/UI/DeleteModal"
import { List } from "../../components/UI/List"
import { ListItem } from "../../components/UI/ListItem"
import { Tag, TagTypesEnum } from "../../components/UI/Tag"
import { useActions, useAppState } from "../../overmind"
import { Dish } from "../../overmind/dishes/effects"

type SingleMenuParams = {
    menuId: string
}

export const SingleMenu: React.FC = () => {
    const { menuId } = useParams<SingleMenuParams>()

    // Dish Local State
    const [isDishDeleteModalOpen, setDishDeleteModalOpen] = useState(false)
    const [isLoadingDelete, setIsLoadingDelete] = useState(false)
    const [selectedDish, setSelectedDish] = useState<Dish | null>(null)

    // Global State
    const { isMobile } = useAppState().app
    const { isLoadingMenu, menu } = useAppState().menuoverview
    const { getMenuEditor } = useActions().menuoverview
    const { deleteDish } = useActions().dishes

    useEffect((): void => {
        getMenuEditor(menuId)
    }, [getMenuEditor, menuId])

    const priceFormatter = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' })

    const handleDishDelete = async (event: any) => {
        if (!selectedDish) {
            console.warn("There is no dish selected.")
            return
        }

        setIsLoadingDelete(true)

        // Delete the allergen
        await deleteDish(selectedDish._id)

        closeDishDeleteModal()
        setIsLoadingDelete(false)

        // When allergen is delete update List
        getMenuEditor(menuId)
    }

    const openDishDeleteModal = (dish: Dish) => {
        setSelectedDish(dish)
        setDishDeleteModalOpen(true)
    }

    const closeDishDeleteModal = () => {
        setDishDeleteModalOpen(false)
        setSelectedDish(null)
    }

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
                                {category.dishes.map(dish => (<div key={dish._id}>
                                    <ListItem dataCy={`singlemenu-${category.title}-dish-listitem`} to={`/menus/${menuId}/categories/${category._id}/dish/${dish._id}`} icon={faUtensils} title={dish.title} header={!dish.isAvailable ? <Tag title="not available" type={TagTypesEnum.red} /> : <></>} indent>
                                        <h6 className="text-headline-black text-lg font-semibold mr-3">{priceFormatter.format(dish.price / 100)}</h6>
                                        <IconButton dataCy="dishes-delete-button" icon={faTrash} onClick={() => openDishDeleteModal(dish)} />
                                    </ListItem>
                                </div>))}
                                {/* Dishes end */}
                            </div>))}
                            {/* Category End */}
                        </>
                    </List>
                </div>

                {/* Delete Modal */}
                <DeleteModal
                    title={`${selectedDish?.title}`}
                    description={`Das Löschen kann nicht rückgängig gemacht werden.`}
                    open={isDishDeleteModalOpen}
                    onDissmis={closeDishDeleteModal}
                    handleDelete={handleDishDelete}
                    isLoadingDelete={isLoadingDelete}
                />
                {/* Categories and Dishes end */}
            </>}
        </div>
    )
}