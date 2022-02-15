import { faArrowLeft, faCheck, faEuroSign, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons"
import axios from "axios"
import { Form, Formik } from "formik"
import { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import * as Yup from "yup"
import { Button } from "../../components/Buttons/Button"
import { Checkbox } from "../../components/Form/Checkbox"
import { ComponentOptions, Dropdown } from "../../components/Form/Dropdown"
import { Textarea } from "../../components/Form/Textarea"
import { TextInput } from "../../components/Form/TextInput"
import { Toggle } from "../../components/Form/Toggle"
import { Modal } from "../../components/UI/Modal"
import { useActions, useAppState } from "../../overmind"
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

    // Local State
    const [isLoading, setIsLoading] = useState(false)
    const [isLoadingSave, setIsLoadingSave] = useState(false)
    const [isLoadingDelete, setIsLoadingDelete] = useState(false)
    const [hasDeleteModal, setHasDeleteModal] = useState(false)
    const [dish, setDish] = useState<DishDto>()
    const [categoriesOptions, setCategoriesOptions] = useState<ComponentOptions[]>([])
    const [labelsOptions, setLabelsOptions] = useState<ComponentOptions[]>([])
    const [allergensOptions, setAllergensOptions] = useState<ComponentOptions[]>([])

    // Global State
    const { createDish, getDishById, getAllCategories, updateDish, deleteDish } = useActions().dishes
    const { getAllLabels } = useActions().labels
    const { getAllAllergens } = useActions().allergens
    const { labels } = useAppState().labels
    const { allergens } = useAppState().allergens

    // Prepare Categories, Labels and Allergens for Dropdown and Checkbox
    async function prepDataOptions() {
        const categories = await getAllCategories()
        // TODO: add Icon idk how to do this because the types are not correct
        const categoriesResult = categories.map(categorie => ({
            id: categorie._id,
            label: categorie.title
        }))
        setCategoriesOptions(categoriesResult)

        // TODO: add Icon idk how to do this because the types are not correct
        const labelsResult = labels.map(label => ({
            id: label._id,
            label: label.title
        }))
        setLabelsOptions(labelsResult)

        // TODO: add Icon idk how to do this because the types are not correct
        const allergensResult = allergens.map(allergens => ({
            id: allergens._id,
            label: allergens.title
        }))
        setAllergensOptions(allergensResult)
    }

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

        async function prepLabelsAndAllergies() {
            await getAllLabels()
            await getAllAllergens()
        }
        prepLabelsAndAllergies()
        prepDataOptions()

        // Check if we are editing an existing menu
        if (isEditing)
            loadDish()

        return () => { isMounted = false }
    }, [getDishById, isEditing, getAllCategories, getAllLabels, getAllAllergens, dishId])

    // Formik
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

    // Formik Validation
    const dishValidationSchema = Yup.object().shape({
        title: Yup.string().min(2, "Der Titel muss aus mindestens 2 Zeichen bestehen.").max(30, "Der Titel darf nicht länger als 30 Zeichen sein.").required("Dies ist ein Pflichtfeld."),
        description: Yup.string().min(2, "Die Beschreibung muss aus mindestens 2 Zeichen bestehen.").max(200, "Die Beschreibung darf nicht länger als 30 Zeichen sein.").required("Dies ist ein Pflichtfeld."),
        image: Yup.string().min(2, "Die Bild Url muss aus mindestens 2 Zeichen bestehen.").max(100, "Die Bild Url darf nicht länger als 100 Zeichen sein."),
        isActive: Yup.boolean(),
        price: Yup.number().min(0, "Der Preis muss 0 oder größer sein").required("Dies ist ein Pflichtfeld."),
        category: Yup.string().required("Dies ist ein Pflichtfeld.")
    })

    // Formik Submit Form
    const onDishSubmit = async (values: DishDto) => {
        setIsLoadingSave(true)
        let dish;
        let image;

        if (values.image === "")
            ({ image, ...dish } = values)
        else
            dish = values

        try {
            // Check if we are editing or creating a new dish
            if (isEditing)
                await updateDish({
                    dishId,
                    dish
                })
            else
                await createDish(dish)

            history.push("/")
        } catch (error) {
            if (!axios.isAxiosError(error))
                return

            // MC: Put error display here (or we generalize it???)
        } finally {
            setIsLoadingSave(false)
        }
    }

    // Dish delete 
    const handleDishDelete = async () => {
        // Check if we are editing a dish
        if (!isEditing)
            return

        setIsLoadingDelete(true)

        await deleteDish(dishId)

        setIsLoadingDelete(false)
        history.push("/menus")
    }

    return (
        <div className="container mt-12">
            <Button kind="tertiary" to="/menus" icon={faArrowLeft} className="mb-3 inline-block text-darkgrey">Zurück</Button>
            {isLoading ? <p>Is Loading...</p> : <div style={{ maxWidth: "500px" }}>
                <h1 className="text-2xl text-headline-black font-semibold mb-2">{isEditing ? 'Gericht bearbeiten' : 'Neues Gericht erstellen'}</h1>
                <Formik enableReinitialize initialValues={initialDishValues} validationSchema={dishValidationSchema} onSubmit={onDishSubmit}>
                    <Form>
                        <TextInput name="image" labelText="Titelbild Url" placeholder="https://i.imgur.com/TMhXsH4.jpeg" />
                        <div className="flex justify-between">
                            <span className="w-3/4 mr-2"><TextInput name="title" labelText="Titel" labelRequired placeholder="Hamburger, Cola,..." /></span>
                            <span className="w-1/4"><TextInput type="number" name="price" labelText="Preis" labelRequired placeholder="Hamburger, Gemischter Salat, Cola,..." icon={faEuroSign} /></span>
                        </div>
                        <Textarea name="description" labelText="Beschreibung" maxLength={200} placeholder="Zu jedem Burger gibt es Pommes dazu,..." />
                        <Dropdown name="category" placeholder="Wähle eine Kategorie..." labelText="Kategorie" labelRequired options={categoriesOptions} />
                        <Toggle name="isActive" labelText="Ist das Gericht gerade verfügbar?" labelOff="Nicht verfügbar" labelOn="Verfügbar" />
                        <div className="flex">
                            {console.log(labelsOptions)}
                            {labelsOptions.length > 0 && <div className="mr-2 sm:mr-8 md:mr-32">
                                <Checkbox name="labels" labelText="Labels" options={labelsOptions} />
                                <Button kind="tertiary" to="/menus/labels" icon={faPlus} className="text-left">Label hinzufügen</Button>
                            </div>}
                            {labelsOptions.length > 0 && <div>
                                <Checkbox name="allergens" labelText="Allergenen" options={allergensOptions} />
                                <Button kind="tertiary" to="/menus/allergens" icon={faPlus} className="text-left">Allergene hinzufügen</Button>
                            </div>}
                        </div>
                        <div className="flex flex-col md:flex-row justify-between mt-10">
                            {isEditing && <Button kind="tertiary" icon={faTrash} className="mb-4 order-last md:order-none" onClick={() => setHasDeleteModal(true)}>Löschen</Button>}
                            <Button type="submit" icon={faCheck} loading={isLoadingSave} className="ml-auto mb-4">Speichern</Button>
                        </div>
                    </Form>
                </Formik>
                {/* Delete Modal */}
                <Modal modalHeading="Dish für immer löschen?" open={hasDeleteModal} onDissmis={() => setHasDeleteModal(false)}>
                    <p>Das Löschen kann nicht rückgängig gemacht werden.</p>
                    <div className="flex md:justify-between flex-col md:flex-row">
                        <Button kind="tertiary" onClick={() => setHasDeleteModal(false)} className="my-4 md:my-0">Abbrechen</Button>
                        <Button kind="primary" onClick={() => handleDishDelete()} loading={isLoadingDelete} icon={faTrash} >Löschen</Button>
                    </div>
                </Modal>
            </div>}
        </div>
    )
}