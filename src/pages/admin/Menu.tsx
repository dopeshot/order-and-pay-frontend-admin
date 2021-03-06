import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { faPizzaSlice, faPlus, faTrash, faUtensils } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { BackButton } from "../../components/Buttons/BackButton"
import { Button } from "../../components/Buttons/Button"
import { IconButton } from "../../components/Buttons/IconButton"
import { Chip, ChipTypesEnum } from "../../components/Chips/Chip"
import { EmptyState } from "../../components/Errors/EmptyState"
import { List } from "../../components/Lists/List"
import { ListItem } from "../../components/Lists/ListItem"
import { DeleteModal } from "../../components/Modals/DeleteModal"
import { Loading } from "../../components/ProgressIndicators/Loading"
import { useActions, useAppState } from "../../overmind"
import { CategoryPopulated } from "../../overmind/categories/type"
import { Dish } from "../../overmind/dishes/type"
import { numberToPrice } from "../../services/numberToPrice"
import { setDocumentTitle } from "../../services/setDocumentTitle"

type MenuParams = {
    menuId: string
}

export const Menu: React.FC = () => {
    const { menuId } = useParams<MenuParams>()

    // Local State 
    const [isLoading, setLoading] = useState(true)
    const [isLoadingDelete, setIsLoadingDelete] = useState(false)

    // Dish Local State
    const [isDishDeleteModalOpen, setDishDeleteModalOpen] = useState(false)
    const [selectedDish, setSelectedDish] = useState<Dish | null>(null)

    // Categories Local State
    const [isCategoryDeleteModalOpen, setCategoryDeleteModalOpen] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState<CategoryPopulated | null>(null)

    // Global State
    const { isMobile } = useAppState().app
    const { menu } = useAppState().menu
    const { getMenuEditor } = useActions().menu
    const { deleteDish } = useActions().dishes
    const { deleteCategoryById } = useActions().categories

    useEffect((): void => {
        async function loadMenu() {
            if (await getMenuEditor(menuId))
                setLoading(false)
        }
        loadMenu()
        setDocumentTitle("Menu Editor")
    }, [getMenuEditor, menuId])

    const handleDelete = async (selectedElement: Dish | CategoryPopulated | null, type: "dish" | "category") => {
        /* istanbul ignore next // should not happen just fallback */
        if (!selectedElement) {
            console.warn("There is no element selected.")
            return
        }

        setIsLoadingDelete(true)

        try {
            if (type === "dish") {
                await deleteDish(selectedElement._id)
                closeDishDeleteModal()
            } else if (type === "category") {
                await deleteCategoryById(selectedElement._id)
                closeCategoryDeleteModal()
            }

            // When item is deleted update List
            getMenuEditor(menuId)
        } catch (error) {
            // Delete failed
        } finally {
            setIsLoadingDelete(false)
        }
    }

    const openDishDeleteModal = (dish: Dish) => {
        setSelectedDish(dish)
        setDishDeleteModalOpen(true)
    }

    const closeDishDeleteModal = () => {
        setDishDeleteModalOpen(false)
        setSelectedDish(null)
    }

    const openCategoryDeleteModal = (category: CategoryPopulated) => {
        setSelectedCategory(category)
        setCategoryDeleteModalOpen(true)
    }

    const closeCategoryDeleteModal = () => {
        setCategoryDeleteModalOpen(false)
        setSelectedCategory(null)
    }

    if (!isLoading && menu?.categories.length === 0)
        return <EmptyState icon={faPizzaSlice} to={`/admin/menus/${menuId}/categories`} title="Erstelle Kategorie" description="Es wurden noch keine Kategorie erstellt. Erstelle neue um Gerichten hinzuf??gen zu k??nnen." buttonText="Kategorie hinzuf??gen" />

    return (
        <div className="container md:max-w-full mt-12">
            {/* Back Button */}
            <BackButton dataCy="singlemenu-back-button" to="/admin/menus" />

            {isLoading ? <Loading /> : <>
                {/* Header */}
                <div className="flex items-baseline">
                    <h1 className="text-2xl text-headline-black font-semibold mr-3 mb-1">{menu?.title}</h1>
                    {menu?.isActive && <Chip title="aktiv" type={ChipTypesEnum.green} />}
                </div>
                <div className="flex flex-col md:flex-row md:justify-between mb-8">
                    <div className="w-full mb-4 md:w-96 md:mb-0">
                        <p className="text-darkgrey">{menu?.description}</p>
                    </div>
                    <div>
                        <Button icon={faPlus} to={`/admin/menus/${menuId}/categories`}>Kategorie hinzuf??gen</Button>
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
                                    {isMobile ? <IconButton icon={faPlus} to={`/admin/menus/${menuId}/categories/${category._id}/dish`} /> : <Button kind="tertiary" dataCy={`singlemenu-${category.title}-dish-add`} to={`/admin/menus/${menuId}/categories/${category._id}/dish`} icon={faPlus} className="text-darkgrey mr-3">Gericht hinzuf??gen</Button>}
                                    <IconButton dataCy="category-delete-button" icon={faTrash} onClick={() => openCategoryDeleteModal(category)} />
                                </ListItem>
                                {/* Dishes */}
                                {category.dishes.map(dish => (<div key={dish._id}>
                                    <ListItem dataCy={`singlemenu-${category.title}-dish-listitem`} to={`/admin/menus/${menuId}/categories/${category._id}/dish/${dish._id}`} icon={faUtensils} title={dish.title} header={!dish.isAvailable ? <Chip title="not available" type={ChipTypesEnum.red} /> : <></>} indent>
                                        <h6 className="text-headline-black text-lg font-semibold mr-3">{numberToPrice(dish.price)}</h6>
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
                    description={`Das L??schen kann nicht r??ckg??ngig gemacht werden.`}
                    open={isDishDeleteModalOpen}
                    onDissmis={closeDishDeleteModal}
                    handleDelete={() => handleDelete(selectedDish, "dish")}
                    isLoadingDelete={isLoadingDelete}
                />

                {/* Delete Modal */}
                <DeleteModal
                    title={`${selectedCategory?.title}`}
                    description={`Das L??schen kann nicht r??ckg??ngig gemacht werden.`}
                    open={isCategoryDeleteModalOpen}
                    onDissmis={closeCategoryDeleteModal}
                    handleDelete={() => handleDelete(selectedCategory, "category")}
                    isLoadingDelete={isLoadingDelete}
                />
                {/* Categories and Dishes end */}
            </>}
        </div>
    )
}