import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { faCheck, faEuroSign, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons"
import { Form, Formik } from "formik"
import { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import * as Yup from "yup"
import { BackButton } from "../../components/Buttons/BackButton"
import { Button } from "../../components/Buttons/Button"
import { Checkbox } from "../../components/Forms/Checkbox"
import { Dropdown } from "../../components/Forms/Dropdown"
import { Textarea } from "../../components/Forms/Textarea"
import { TextInput } from "../../components/Forms/TextInput"
import { Toggle } from "../../components/Forms/Toggle"
import { AllergensModal } from "../../components/Modals/AllergensModal"
import { DeleteModal } from "../../components/Modals/DeleteModal"
import { LabelModal } from "../../components/Modals/LabelModal"
import { Loading } from "../../components/ProgressIndicators/Loading"
import { useActions, useAppState } from "../../overmind"
import { Dish, DishDto } from "../../overmind/dishes/effects"
import { ComponentOptions } from "../../types/ComponentOptions"

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
    const [isLoading, setIsLoading] = useState(isEditing)
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
    const { createDish, getDishById, updateDish, deleteDish } = useActions().dishes
    const { getAllCategories } = useActions().categories
    const { getAllLabels } = useActions().labels
    const { getAllAllergens } = useActions().allergens
    const { labels } = useAppState().labels
    const { allergens } = useAppState().allergens

    useEffect(() => {
        let isMounted = true;

        // Load dish when id is set in url
        async function loadDish() {
            if (!isEditing)
                return

            try {
                // Fetch dish and set editing
                const dish = await getDishById(dishId!) // ! because we only call when isEditing

                // istanbul ignore next // is just for handling async correct
                if (!isMounted)
                    return

                setDish(dish)
            } catch (error) {
                console.error("Dish not found")
                // MC: Implement error here

                return
            }
        }

        // Prepare Categories, Labels and Allergens for Dropdown and Checkbox
        async function prepDataOptions() {
            const responses = await Promise.all([getAllCategories(), getAllLabels(), getAllAllergens()])

            // istanbul ignore next // is just for handling async correct
            if (!isMounted)
                return

            const categoriesResult = responses[0].map(category => ({
                id: category._id,
                label: category.title
            }))
            setCategoriesOptions(categoriesResult)
        }

        async function main() {
            await Promise.all([prepDataOptions(), loadDish()])

            // istanbul ignore next // is just for handling async correct
            if (!isMounted)
                return

            setIsLoading(false)
        }
        main()
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
        categoryId: dish?.categoryId ?? categoryId ?? "",
        allergenIds: dish?.allergenIds ?? [],
        labelIds: dish?.labelIds ?? []
    }

    // Formik Validation
    const dishValidationSchema = Yup.object().shape({
        title: Yup.string().min(2, "Der Titel muss aus mindestens 2 Zeichen bestehen.").max(30, "Der Titel darf nicht länger als 30 Zeichen sein.").required("Dies ist ein Pflichtfeld."),
        description: Yup.string().min(2, "Die Beschreibung muss aus mindestens 2 Zeichen bestehen.").max(200, "Die Beschreibung darf nicht länger als 200 Zeichen sein.").required("Dies ist ein Pflichtfeld."),
        image: Yup.string().min(2, "Die Titelbild-URL muss aus mindestens 2 Zeichen bestehen.").max(100, "Die Titelbild-URL darf nicht länger als 100 Zeichen sein."),
        isActive: Yup.boolean(),
        price: Yup.number().min(0, "Der Preis muss 0 oder größer sein").required("Dies ist ein Pflichtfeld."),
        categoryId: Yup.string().required("Dies ist ein Pflichtfeld.")
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

            history.push(`/admin/menus/${menuId}/editor`)
        } catch (error) {
            // Create or update failed
        } finally {
            setIsLoadingSave(false)
        }
    }

    // Dish delete 
    const handleDishDelete = async () => {
        // istanbul ignore next // Should not happen
        if (!isEditing || !dishId)
            return

        setIsLoadingDelete(true)

        try {
            await deleteDish(dishId)
            history.push(`/admin/menus/${menuId}/editor`)
        } catch (error) {
            // Delete failed
        } finally {
            setIsLoadingDelete(false)
        }
    }

    return (
        <div className="container mt-12">
            <BackButton dataCy="dishes-back-button" to={`/admin/menus/${menuId}/editor`} />
            {isLoading ? <Loading /> : <div style={{ maxWidth: "500px" }}>
                <h1 className="text-2xl text-headline-black font-semibold mb-2">{isEditing ? 'Gericht bearbeiten' : 'Neues Gericht erstellen'}</h1>
                <Formik enableReinitialize initialValues={initialDishValues} validationSchema={dishValidationSchema} onSubmit={onDishSubmit}>
                    {({ dirty, isValid }) => (
                        <Form>
                            <div className="flex justify-between">
                                <span className="w-3/4 mr-2"><TextInput name="title" labelText="Titel" labelRequired placeholder="Hamburger, Cola,..." /></span>
                                <span className="w-1/4"><TextInput type="number" name="price" labelText="Preis" labelRequired placeholder="2,00" icon={faEuroSign} /></span>
                            </div>
                            <Textarea name="description" labelText="Beschreibung" maxLength={200} labelRequired placeholder="Mit Salat, Tomaten und sauren Gurken" />
                            <Dropdown name="categoryId" placeholder="Wähle eine Kategorie..." labelText="Kategorie" labelRequired options={categoriesOptions} />
                            <TextInput name="image" labelText="Titelbild-URL" placeholder="URL eingeben" />
                            <Toggle name="isAvailable" labelText="Ist das Gericht gerade verfügbar?" labelRequired labelOff="Nicht verfügbar" labelOn="Verfügbar" />
                            <div className="flex">
                                <div className="mr-2 sm:mr-8 md:mr-32">
                                    <Checkbox name="labelIds" labelText="Labels" options={labelsOptions} />
                                    <Button kind="tertiary" onClick={() => setLabelModalOpen(true)} icon={faPlus} className="text-left">Label hinzufügen</Button>
                                </div>
                                <div>
                                    <Checkbox name="allergenIds" labelText="Allergenen" options={allergensOptions} />
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