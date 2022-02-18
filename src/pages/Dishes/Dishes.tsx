import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { faArrowLeft, faCheck, faEuroSign, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons"
import axios from "axios"
import { Form, Formik } from "formik"
import { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import * as Yup from "yup"
import { AllergensModal } from "../../components/Allergens/AllergensModal"
import { Button } from "../../components/Buttons/Button"
import { Checkbox } from "../../components/Form/Checkbox"
import { Dropdown } from "../../components/Form/Dropdown"
import { Textarea } from "../../components/Form/Textarea"
import { TextInput } from "../../components/Form/TextInput"
import { Toggle } from "../../components/Form/Toggle"
import { LabelModal } from "../../components/Labels/LabelModal"
import { DeleteModal } from "../../components/UI/DeleteModal"
import { useActions, useAppState } from "../../overmind"
import { Dish, DishDto } from "../../overmind/dishes/effects"
import { ComponentOptions } from "../../shared/types/ComponentOptions"

type Params = {
    menuId: string,
    categoryId: string,
    dishId?: string
}

export const Dishes: React.FC = () => {
    const { dishId, menuId, categoryId } = useParams<Params>()
    const isEditing = Boolean(dishId)
    const history = useHistory()

    // Local State
    const [isLoading, setIsLoading] = useState(false)
    const [isLoadingSave, setIsLoadingSave] = useState(false)
    const [isLoadingDelete, setIsLoadingDelete] = useState(false)
    const [hasDeleteModal, setHasDeleteModal] = useState(false)
    const [isLabelModalOpen, setLabelModalOpen] = useState(false)
    const [isAllergensModalOpen, setAllergensModalOpen] = useState(false)
    const [dish, setDish] = useState<Dish>()
    const [categoriesOptions, setCategoriesOptions] = useState<ComponentOptions[]>([])
    const [labelsOptions, setLabelsOptions] = useState<ComponentOptions[]>([])
    const [allergensOptions, setAllergensOptions] = useState<ComponentOptions[]>([])

    // Global State
    const { createDish, getDishById, getAllCategories, updateDish, deleteDish } = useActions().dishes
    const { getAllLabels } = useActions().labels
    const { getAllAllergens } = useActions().allergens
    const { labels } = useAppState().labels
    const { allergens } = useAppState().allergens

    useEffect(() => {
        let isMounted = true;

        // Load dish when id is set in url
        async function loadDish() {
            try {
                // Fetch dish and set editing
                const dish = await getDishById(dishId!) // ! because we only call when isEditing

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

        // Prepare Categories, Labels and Allergens for Dropdown and Checkbox
        async function prepDataOptions() {
            const categories = await getAllCategories()

            if (!isMounted)
                return

            const categoriesResult = categories.map(categorie => ({
                id: categorie._id,
                label: categorie.title
            }))
            setCategoriesOptions(categoriesResult)

            await getAllLabels()
            await getAllAllergens()
        }
        prepDataOptions()

        // Check if we are editing an existing menu
        if (isEditing)
            loadDish()

        return () => { isMounted = false }
    }, [getDishById, isEditing, getAllAllergens, getAllCategories, getAllLabels, dishId])

    // Format Data from labels and allergens
    useEffect(() => {
        const allergensResult = allergens.map(allergens => ({
            id: allergens._id,
            label: allergens.title,
            icon: allergens.icon as IconProp
        }))
        setAllergensOptions(allergensResult)

        const labelsResult = labels.map(label => ({
            id: label._id,
            label: label.title,
            icon: label.icon as IconProp
        }))
        setLabelsOptions(labelsResult)
    }, [labels, allergens])

    // Formik
    const initialDishValues: DishDto = {
        title: dish?.title ?? "",
        description: dish?.description ?? "",
        image: dish?.image ?? "",
        isAvailable: dish?.isAvailable ?? true,
        price: dish?.price ?? 0,
        category: dish?.category ?? categoryId ?? "",
        allergens: dish?.allergens ?? [],
        labels: dish?.labels ?? []
    }

    // Formik Validation
    const dishValidationSchema = Yup.object().shape({
        title: Yup.string().min(2, "Der Titel muss aus mindestens 2 Zeichen bestehen.").max(30, "Der Titel darf nicht länger als 30 Zeichen sein.").required("Dies ist ein Pflichtfeld."),
        description: Yup.string().min(2, "Die Beschreibung muss aus mindestens 2 Zeichen bestehen.").max(200, "Die Beschreibung darf nicht länger als 200 Zeichen sein.").required("Dies ist ein Pflichtfeld."),
        image: Yup.string().min(2, "Die Titelbild-URL muss aus mindestens 2 Zeichen bestehen.").max(100, "Die Titelbild-URL darf nicht länger als 100 Zeichen sein."),
        isActive: Yup.boolean(),
        price: Yup.number().min(0, "Der Preis muss 0 oder größer sein").required("Dies ist ein Pflichtfeld."),
        category: Yup.string().required("Dies ist ein Pflichtfeld.")
    })

    // Formik Submit Form
    const onDishSubmit = async (dish: DishDto) => {
        setIsLoadingSave(true)

        try {
            // Check if we are editing or creating a new dish
            if (isEditing && dishId)
                await updateDish({
                    dishId,
                    dish
                })
            else
                await createDish(dish)

            history.push(`/menus/${menuId}/editor`)
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
        if (!isEditing || !dishId)
            return

        setIsLoadingDelete(true)

        await deleteDish(dishId)

        setIsLoadingDelete(false)
        history.push(`/menus/${menuId}/editor`)
    }

    return (
        <div className="container mt-12">
            <Button dataCy="dishes-back-button" kind="tertiary" to={`/menus/${menuId}/editor`} icon={faArrowLeft} className="mb-3 inline-block text-darkgrey">Zurück</Button>
            {isLoading ? <p>Is Loading...</p> : <div style={{ maxWidth: "500px" }}>
                <h1 className="text-2xl text-headline-black font-semibold mb-2">{isEditing ? 'Gericht bearbeiten' : 'Neues Gericht erstellen'}</h1>
                <Formik enableReinitialize initialValues={initialDishValues} validationSchema={dishValidationSchema} onSubmit={onDishSubmit}>
                    {({ dirty, isValid }) => (
                        <Form>
                            <TextInput name="image" labelText="Titelbild-URL" placeholder="URL eingeben" />
                            <div className="flex justify-between">
                                <span className="w-3/4 mr-2"><TextInput name="title" labelText="Titel" labelRequired placeholder="Hamburger, Cola,..." /></span>
                                <span className="w-1/4"><TextInput type="number" name="price" labelText="Preis" labelRequired placeholder="2,00" icon={faEuroSign} /></span>
                            </div>
                            <Textarea name="description" labelText="Beschreibung" maxLength={200} labelRequired placeholder="Mit Salat, Tomaten und sauren Gurken" />
                            <Dropdown name="category" placeholder="Wähle eine Kategorie..." labelText="Kategorie" labelRequired options={categoriesOptions} />
                            <Toggle name="isAvailable" labelText="Ist das Gericht gerade verfügbar?" labelRequired labelOff="Nicht verfügbar" labelOn="Verfügbar" />
                            <div className="flex">
                                <div className="mr-2 sm:mr-8 md:mr-32">
                                    <Checkbox name="labels" labelText="Labels" options={labelsOptions} />
                                    <Button kind="tertiary" onClick={() => setLabelModalOpen(true)} icon={faPlus} className="text-left">Label hinzufügen</Button>
                                </div>
                                <div>
                                    <Checkbox name="allergens" labelText="Allergenen" options={allergensOptions} />
                                    <Button kind="tertiary" onClick={() => setAllergensModalOpen(true)} icon={faPlus} className="text-left">Allergene hinzufügen</Button>
                                </div>
                            </div>
                            <div className="flex flex-col md:flex-row justify-between mt-10">
                                {isEditing && <Button dataCy="dishes-delete-button" kind="tertiary" icon={faTrash} className="mb-4 order-last md:order-none" onClick={() => setHasDeleteModal(true)}>Löschen</Button>}
                                <Button dataCy="dishes-save-button" type="submit" icon={faCheck} loading={isLoadingSave} disabled={!(dirty && isValid)} className="ml-auto mb-4">Speichern</Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
            }
            {/* Label Modal */}
            <LabelModal modalOpen={isLabelModalOpen} setModalOpen={setLabelModalOpen} />

            {/* Allergens Modal */}
            <AllergensModal modalOpen={isAllergensModalOpen} setModalOpen={setAllergensModalOpen} />

            {/* Delete Modal */}
            <DeleteModal
                title={`${dish?.title}`}
                description={`Das Löschen kann nicht rückgängig gemacht werden. ${dish?.title} wird auch aus allen Kategorien entfernt.`}
                open={hasDeleteModal}
                onDissmis={() => setHasDeleteModal(false)}
                handleDelete={() => handleDishDelete()}
                isLoadingDelete={isLoadingDelete}
            />
        </div>
    )
}