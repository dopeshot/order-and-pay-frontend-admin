import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { faPlus, faTrash, faUtensils } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { BackButton } from "../../components/Buttons/BackButton"
import { Button } from "../../components/Buttons/Button"
import { IconButton } from "../../components/Buttons/IconButton"
import { DeleteModal } from "../../components/UI/DeleteModal"
import { List } from "../../components/UI/List"
import { ListItem } from "../../components/UI/ListItem"
import { Loading } from "../../components/UI/Loading"
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
    const [isLoading, setLoading] = useState(true)

    // Global State
    const { isMobile } = useAppState().app
    const { menu } = useAppState().menuoverview
    const { getMenuEditor } = useActions().menuoverview
    const { deleteDish } = useActions().dishes

    useEffect((): void => {
        async function loadMenu() {
            if (await getMenuEditor(menuId))
                setLoading(false)
        }
        loadMenu()
    }, [getMenuEditor, menuId])

    const priceFormatter = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }) //MC TODO: Use from shared

    const handleDishDelete = async (event: any) => {
        /* istanbul ignore next // should not happen just fallback */
        if (!selectedDish) {
            console.warn("There is no dish selected.")
            return
        }

        setIsLoadingDelete(true)

        // Delete the dish
        await deleteDish(selectedDish._id)

        closeDishDeleteModal()
        setIsLoadingDelete(false)

        // When dish is delete update List
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
            <BackButton dataCy="singlemenu-back-button" to="/admin/menus" />

            {isLoading ? <Loading /> : <>
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
                        <Button icon={faPlus} to={`/admin/menus/${menuId}/categories`}>Kategorie hinzufügen</Button>
                    </div>
                </div>
                {/* Header end */}

                {/* Categories and Dishes */}
                <div>
                    <List>
                        <>
                            {/* Category */}
                            {menu?.categories.map(category => (<div key={category._id}>
                                <ListItem to={`/admin/menus/${menuId}/categories/${category._id}`} dataCy="singlemenu-category-listitem" title={category.title} icon={category.icon !== '' ? category.icon as IconProp : 'folder'} background header={<p className="text-darkgrey">{category.dishes.length === 1 ? `1 Gericht` : `${category.dishes.length} Gerichte`}</p>}>
                                    {isMobile ? <IconButton icon={faPlus} to={`/admin/menus/${menuId}/categories/${category._id}/dish`} /> : <Button kind="tertiary" dataCy={`singlemenu-${category.title}-dish-add`} to={`/admin/menus/${menuId}/categories/${category._id}/dish`} icon={faPlus} className="text-darkgrey mr-3">Gericht hinzufügen</Button>}
                                    <IconButton icon={faTrash} onClick={() => console.log("remove")} />
                                </ListItem>
                                {/* Dishes */}
                                {category.dishes.map(dish => (<div key={dish._id}>
                                    <ListItem dataCy={`singlemenu-${category.title}-dish-listitem`} to={`/admin/menus/${menuId}/categories/${category._id}/dish/${dish._id}`} icon={faUtensils} title={dish.title} header={!dish.isAvailable ? <Tag title="not available" type={TagTypesEnum.red} /> : <></>} indent>
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