import { faArrowLeft, faCheck, faEuroSign, faHamburger, faLeaf, faMagnet, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons"
import axios from "axios"
import { Form, Formik } from "formik"
import { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { Button } from "../../components/Buttons/Button"
import { Checkbox } from "../../components/Form/Checkbox"
import { Dropdown } from "../../components/Form/Dropdown"
import { Textarea } from "../../components/Form/Textarea"
import { TextInput } from "../../components/Form/TextInput"
import { Toggle } from "../../components/Form/Toggle"
import { useActions } from "../../overmind"
import { DishDto } from "../../overmind/dishes/effects"

type Params = {
    menusId: string,
    categoriesId: string,
    dishId: string
}

export const Dishes: React.FC = () => {
    const { dishId } = useParams<Params>()
    const isEditing = Boolean(dishId)
    const history = useHistory()

    const [isLoading, setIsLoading] = useState(false)
    const [isLoadingSave, setIsLoadingSave] = useState(false)
    const [isLoadingDelete, setIsLoadingDelete] = useState(false)
    const [hasDeleteModal, setHasDeleteModal] = useState(false)
    const [dish, setDish] = useState<DishDto>()

    // Global state
    const { createDish, getDishById, updateDish, deleteDish } = useActions().dishes

    // Load dish when id is set in url
    useEffect(() => {
        let isMounted = true;
        async function loadDish() {
            try {
                // Fetch dish and set editing
                const dish = await getDishById(dishId)

                if (!isMounted)
                    return

                setDish(dish)
                setIsLoading(false)
            } catch (error) {
                console.error("Dish not found")
                // MC: Implement error here

                return
            }
        }
        // Check if we are editing an existing menu
        if (isEditing)
            loadDish()

        return () => { isMounted = false }
    }, [getDishById, isEditing, dishId])

    const initialDishValues: DishDto = {
        title: dish?.title ?? "",
        description: dish?.description ?? "",
        image: dish?.image ?? "",
        isActive: dish?.isActive ?? true,
        price: dish?.price ?? 0,
        category: dish?.category ?? "",
        allergens: dish?.allergens ?? [],
        labels: dish?.labels ?? []
    }

    const onDishSubmit = async (values: DishDto) => {
        setIsLoadingSave(true)
        console.log(values, isEditing)

        try {
            // Check if we are editing or creating a new dish
            if (isEditing) {
                await updateDish({
                    dishId,
                    dish: values
                })
            } else {
                await createDish(values)
            }

            history.push("/")
        } catch (error) {
            if (!axios.isAxiosError(error))
                return

            // MC: Put error display here (or we generalize it???)
        } finally {
            setIsLoadingSave(false)
        }
    }

    const categories = [{
        id: "620bd3ca8e70d965e0b460e3",
        label: "Burger",
        icon: faHamburger
    }]

    const labels = [{
        id: 1,
        label: "vegan",
        icon: faLeaf
    }, {
        id: 2,
        label: "vegan",
        icon: faLeaf
    }, {
        id: 3,
        label: "vegan",
        icon: faLeaf
    }]

    const allergies = [{
        id: 1,
        label: "gluten",
        icon: faMagnet
    }, {
        id: 2,
        label: "gluten",
        icon: faMagnet
    }]

    return (
        <div className="container mt-12">
            <Button kind="tertiary" to="/menus" icon={faArrowLeft} className="mb-3 inline-block text-darkgrey">Zurück</Button>
            {isLoading ? <p>Is Loading...</p> : <div style={{ maxWidth: "500px" }}>
                <h1 className="text-2xl text-headline-black font-semibold mb-2">{isEditing ? 'Gericht bearbeiten' : 'Neues Gericht erstellen'}</h1>
                <Formik enableReinitialize initialValues={initialDishValues} onSubmit={onDishSubmit}>
                    <Form>
                        <TextInput name="image" labelText="Titelbild Url" placeholder="https://i.imgur.com/TMhXsH4.jpeg" />
                        <div className="flex justify-between">
                            <span className="w-3/4 mr-2"><TextInput name="title" labelText="Titel" labelRequired placeholder="Hamburger, Cola,..." /></span>
                            <span className="w-1/4"><TextInput type="number" name="price" labelText="Preis" labelRequired placeholder="Hamburger, Gemischter Salat, Cola,..." icon={faEuroSign} /></span>
                        </div>
                        <Textarea name="description" labelText="Beschreibung" placeholder="Zu jedem Burger gibt es Pommes dazu,..." />
                        <Dropdown name="category" placeholder="Wähle eine Kategorie..." labelText="Kategorie" labelRequired options={categories} />
                        <Toggle name="isActive" labelText="Ist das Gericht gerade verfügbar?" labelOff="Nicht verfügbar" labelOn="Verfügbar" />
                        <div className="flex">
                            <div className="mr-2 sm:mr-8 md:mr-32">
                                <Checkbox name="labels" labelText="Labels" options={labels} />
                                <Button kind="tertiary" to="/menus/labels" icon={faPlus} className="text-left">Label hinzufügen</Button>
                            </div>
                            <div>
                                <Checkbox name="allergens" labelText="Allergenen" options={allergies} />
                                <Button kind="tertiary" to="/menus/allergens" icon={faPlus} className="text-left">Allergene hinzufügen</Button>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row justify-between mt-10">
                            {isEditing && <Button kind="tertiary" icon={faTrash} className="mb-4 order-last md:order-none">Löschen</Button>}
                            <Button type="submit" icon={faCheck} loading={isLoadingSave} className="ml-auto mb-4">Speichern</Button>
                        </div>
                    </Form>
                </Formik>
            </div>}
        </div>
    )
}