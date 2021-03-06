import { faCheck, faCheckDouble, faCog, faEuroSign, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons"
import { Form, Formik } from "formik"
import { Fragment, useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import * as Yup from "yup"
import { BackButton } from "../../components/Buttons/BackButton"
import { Button } from "../../components/Buttons/Button"
import { IconButton } from "../../components/Buttons/IconButton"
import { Chip } from "../../components/Chips/Chip"
import { Dropdown } from "../../components/Forms/Dropdown"
import { Textarea } from "../../components/Forms/Textarea"
import { TextInput } from "../../components/Forms/TextInput"
import { Toggle } from "../../components/Forms/Toggle"
import { List } from "../../components/Lists/List"
import { ListItem } from "../../components/Lists/ListItem"
import { DeleteModal } from "../../components/Modals/DeleteModal"
import { Modal } from "../../components/Modals/Modal"
import { Loading } from "../../components/ProgressIndicators/Loading"
import { useActions, useAppState } from "../../overmind"
import { Category, CategoryDtoWithoutChoices, Choice, ChoiceDto, ChoiceType, Option, OptionDto } from "../../overmind/categories/type"
import { numberToPrice } from "../../services/numberToPrice"
import { setDocumentTitle } from "../../services/setDocumentTitle"

type CategoryParams = {
    categoryId: string,
    menuId: string
}

export type DeleteData = {
    title: string
    description?: string
} & (OptionDeleteData | ChoiceDeleteData | CategoryDeleteData)

type OptionDeleteData = {
    type: "option"
    choiceId: number
    optionId: number
}

type ChoiceDeleteData = {
    type: "choice"
    choiceId: number
}

type CategoryDeleteData = {
    type: "category"
    categoryId: string
}

export const CategoriesEditor: React.FunctionComponent = () => {
    const { categoryId, menuId } = useParams<CategoryParams>()
    const history = useHistory()
    const isEditing = Boolean(categoryId)

    // Global States
    const { isMobile } = useAppState().app

    // Global actions
    const { createCategory, getCategoryById, updateCategoryById, deleteCategoryById } = useActions().categories

    // Component States
    const [isLoading, setIsLoading] = useState(isEditing) // Why do we use isEditing here? When we edit we want to load the state from the backend so we set loading state to true till it's fetched.
    const [isLoadingSave, setIsLoadingSave] = useState(false)
    const [category, setCategory] = useState<Category>()
    const [modalOpenChoice, setModalOpenChoice] = useState(false)
    const [editChoiceData, setEditChoiceData] = useState<Choice | null>(null)
    const isEditingChoice = Boolean(editChoiceData)
    const [choices, setChoices] = useState<Choice[]>([])
    const [modalOpenOption, setModalOpenOption] = useState(false)
    const [editOptionData, setEditOptionData] = useState<Option | null>(null)
    const [parentChoiceId, setParentChoiceId] = useState<number | null>(null)
    const isEditingOptions = Boolean(editOptionData)

    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false)
    const [isLoadingDelete, setIsLoadingDelete] = useState(false)
    const [deleteData, setDeleteData] = useState<DeleteData | null>(null)

    const openDeleteModal = (optionDeleteData: DeleteData) => {
        setDeleteData(optionDeleteData)
        setDeleteModalOpen(true)
    }

    const closeDeleteModal = () => {
        setDeleteModalOpen(false)
        setDeleteData(null)
    }

    const handleDelete = async () => {
        /* istanbul ignore next // should not happen just fallback */
        if (!deleteData)
            return

        switch (deleteData.type) {
            case 'category':
                deleteCategory()
                // Do not close delete modal since we go back if we delete complete category
                return
            case 'choice':
                deleteChoice(deleteData.choiceId)
                break;
            case 'option':
                deleteOption(deleteData)
                break;
        }

        closeDeleteModal()
    }

    useEffect(() => {
        let isMounted = true
        async function loadCategory() {
            // Fetch category and set editing
            const category = await getCategoryById(categoryId)

            // istanbul ignore next // is just for handling async correct
            if (!isMounted)
                return

            setCategory(category)
            setChoices(category.choices)
            setIsLoading(false)
        }

        // Check if we are editing an existing menu
        if (isEditing)
            loadCategory()

        setDocumentTitle(isEditing ? "Kategorie bearbeiten" : "Neue Kategorie erstellen")

        return () => { isMounted = false }
    }, [categoryId, getCategoryById, isEditing])

    const initialCategoryValues: CategoryDtoWithoutChoices = {
        title: category?.title ?? "",
        description: category?.description ?? "",
        icon: category?.icon ?? "",
        image: category?.image ?? "",
        menuId: category?.menuId ?? menuId
    }

    const validationCategorySchema: Yup.SchemaOf<CategoryDtoWithoutChoices> = Yup.object().shape({
        title: Yup.string().min(2, "Der Titel muss aus mindestens 2 Zeichen bestehen.").max(32, "Der Titel darf nicht l??nger als 32 Zeichen sein.").required("Dies ist ein Pflichtfeld."),
        description: Yup.string().max(240, "Die Beschreibung darf nicht l??nger als 240 Zeichen sein."),
        icon: Yup.string().max(32, "Das Icon darf nicht l??nger als 32 Zeichen sein."),
        image: Yup.string().max(240, "Die Bild-URL darf nicht l??nger als 240 Zeichen sein."),
        menuId: Yup.string().max(128, "Ein Fehler ist aufgetreten. Die Menu-ID ist nicht definiert.").required()
    })

    const submitCategory = async (values: CategoryDtoWithoutChoices) => {
        // Merge formik and choices state
        const newCategory = {
            ...values,
            choices
        }
        setIsLoadingSave(true)

        try {
            // Check if we are editing or creating a new menu
            if (isEditing) {
                await updateCategoryById({
                    id: categoryId,
                    category: newCategory
                })
            } else {
                await createCategory(newCategory)
            }

            history.push(`/admin/menus/${newCategory.menuId}/editor`)
        } catch (error) {
            // Create or update failed
        } finally {
            setIsLoadingSave(false)
        }
    }

    const deleteCategory = async () => {
        /* istanbul ignore next // should not happen just fallback */
        if (!isEditing)
            return

        setIsLoadingDelete(true)

        try {
            // Delete category
            await deleteCategoryById(categoryId)
            history.push(`/admin/menus/${menuId}/editor`)
        } catch (error) {
            // Delete failed
        } finally {
            setIsLoadingDelete(false)
        }
    }

    // choices
    const initialChoiceValues: ChoiceDto = {
        title: editChoiceData?.title ?? "",
        type: editChoiceData?.type ?? ChoiceType.RADIO
    }

    const validationChoiceSchema: Yup.SchemaOf<ChoiceDto> = Yup.object().shape({
        title: Yup.string().min(2, "Der Titel muss aus mindestens 2 Zeichen bestehen.").max(32, "Der Titel darf nicht l??nger als 32 Zeichen sein.").required("Dies ist ein Pflichtfeld."),
        type: Yup.mixed<ChoiceType>().oneOf(Object.values(ChoiceType)).required()
    })

    const submitChoice = (values: ChoiceDto) => {
        if (isEditingChoice && editChoiceData) {
            // Find object and merge new values
            setChoices(choices => {
                const choice = choices.find(choice => choice.id === editChoiceData.id)
                Object.assign(choice, values)
                return choices
            })

        } else {
            // Create Choice from ChoiceDto. Add empty options + next id
            const newChoice: Choice = {
                ...values,
                options: [],
                id: Math.max(...choices.map(choice => choice.id), 0) + 1
            }
            setChoices([...choices, newChoice])

        }

        // Close modal
        closeChoiceModal()
    }

    const deleteChoice = (choiceId: number) => {
        setChoices(choices.filter(choice => choice.id !== choiceId))
    }

    const closeChoiceModal = () => {
        if (isEditingChoice && editChoiceData)
            setEditChoiceData(null)

        setModalOpenChoice(false)
    }

    const dropdownOptionsChoice = [
        {
            id: ChoiceType.RADIO,
            label: "Einzeln",
            icon: faCheck
        },
        {
            id: ChoiceType.CHECKBOX,
            label: "Mehrere",
            icon: faCheckDouble
        }
    ]

    // options 
    const initialOptionValues: OptionDto = {
        title: editOptionData?.title ?? "",
        price: editOptionData?.price ?? 100,
        isDefault: (parentChoiceId !== null && choices[choices.findIndex(choice => choice.id === parentChoiceId)]?.isDefault === editOptionData?.id) ?? false
    }

    const validationOptionSchema: Yup.SchemaOf<OptionDto> = Yup.object().shape({
        title: Yup.string().min(2, "Der Titel muss aus mindestens 2 Zeichen bestehen.").max(32, "Der Titel darf nicht l??nger als 32 Zeichen sein.").required("Dies ist ein Pflichtfeld."),
        price: Yup.number().min(-10000000, "Der Preis darf nicht kleiner als - 10 000 000 sein.").max(10000000, "Der Preis darf nicht gr????er als 10 000 000 sein.").required("Dies ist ein Pflichtfeld."),
        isDefault: Yup.boolean().required()
    })

    const submitOption = (values: OptionDto) => {
        /* istanbul ignore next // should not happen just fallback */
        if (parentChoiceId === null) {
            console.error("parentChoiceId is not defined.")
            return
        }

        const parentChoiceIndex = choices.findIndex(choice => choice.id === parentChoiceId)

        // Remove isDefault from values
        const { isDefault, ...optionData } = values

        if (isEditingOptions && editOptionData) {
            setChoices(choices => {
                // Update default
                if (isDefault && choices[parentChoiceIndex].isDefault !== editOptionData.id)
                    choices[parentChoiceIndex].isDefault = editOptionData.id
                else if (!isDefault && choices[parentChoiceIndex].isDefault === editOptionData.id)
                    choices[parentChoiceIndex].isDefault = null

                const option = choices[parentChoiceIndex].options.find(option => option.id === editOptionData.id)
                Object.assign(option, optionData)
                return choices
            })
        } else {
            // Create new option from OptionDto. + next id
            const newOption: Option = {
                ...optionData,
                id: Math.max(...choices[parentChoiceIndex].options.map(option => option.id), 0) + 1
            }

            // Copy choices
            const newChoices = [...choices]

            // Push new option into options array of currently editing choice
            newChoices[parentChoiceIndex].options = [...newChoices[parentChoiceIndex].options, newOption]

            // Set to default
            if (isDefault)
                choices[parentChoiceIndex].isDefault = newOption.id

            setChoices(newChoices)
        }

        // Close modal
        closeOptionModal()
    }

    const deleteOption = ({ choiceId, optionId }: OptionDeleteData) => {
        setChoices(choices => {
            const newChoices = [...choices]
            let choice = newChoices.find(choice => choice.id === choiceId)!

            choice.options = choice.options.filter(option => option.id !== optionId)

            if (choice.isDefault === optionId)
                choice.isDefault = null

            return newChoices
        })
    }

    const closeOptionModal = () => {
        if (isEditingOptions && editOptionData)
            setEditOptionData(null)

        setParentChoiceId(null)
        setModalOpenOption(false)
    }

    return <>
        <div className="container mt-12">
            <BackButton dataCy="category-back-button" to={`/admin/menus/${menuId}/editor`} />
            {isLoading ? <Loading /> : <>
                <h1 className="text-2xl text-headline-black font-semibold mb-5">{isEditing ? "Kategorie bearbeiten" : "Neue Kategorie erstellen"}</h1>

                <Formik initialValues={initialCategoryValues} enableReinitialize validationSchema={validationCategorySchema} onSubmit={submitCategory}>
                    {({ dirty, isValid }) => (
                        <Form>
                            <h2 className="text-xl text-headline-black font-semibold mb-2">Allgemeines</h2>
                            <div className="w-auto mb-10" style={{ maxWidth: "500px" }}>
                                <TextInput name="title" placeholder="Pizza, Beilagen, Getr??nke,..." labelText="Titel" labelRequired autoFocus />
                                <Textarea name="description" placeholder="Zu jedem Burger gibt es Pommes dazu,..." labelText="Beschreibung" />
                                <TextInput name="image" placeholder="Geben Sie eine URL ein..." labelText="Titelbild-URL" />
                                <TextInput name="icon" placeholder="Font Awesome Icon eingeben!" labelText="Icon" />
                            </div>

                            {/* Choices and Options */}
                            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                                <div className="mb-4 mr-0 md:mb-0 md:mr-4 lg:mr-0">
                                    <h2 className="text-xl text-headline-black font-semibold">Auswahlm??glichkeiten</h2>
                                    <p className="text-lightgrey">Auswahlm??glichkeiten f??r ein Gericht wie die Gr????e oder Beilagen.</p>
                                </div>
                                <div className="w-full md:w-auto">
                                    <Button icon={faPlus} onClick={() => {
                                        setModalOpenChoice(true)
                                    }}>Neue Auswahlm??glichkeit</Button>
                                </div>
                            </div>

                            <List>
                                {choices.map(choice => <Fragment key={`c${choice.id}`}>
                                    <ListItem dataCy="choices-list-item" onClick={() => {
                                        setEditChoiceData(choice)
                                        setModalOpenChoice(true)
                                    }} title={choice.title} icon={choice.type === ChoiceType.RADIO ? faCheck : faCheckDouble} header={<p className="text-darkgrey">{choice.type === ChoiceType.RADIO ? "Eine Option" : "Mehrere Optionen"}</p>} background>
                                        {isMobile ? <IconButton dataCy="category-mobile-add-choice" icon={faPlus} onClick={() => {
                                            setParentChoiceId(choice.id)
                                            setModalOpenOption(true)
                                        }} /> : <Button kind="tertiary" onClick={() => {
                                            setParentChoiceId(choice.id)
                                            setModalOpenOption(true)
                                        }} icon={faPlus} className="text-darkgrey mr-3">Neue Option</Button>}
                                        <IconButton dataCy="choices-delete-button" icon={faTrash} onClick={() => openDeleteModal({ type: 'choice', choiceId: choice.id, title: `Auswahl-"${choice.title}"`, description: `${choice.options.length} Optionen werden mit gel??scht.` })} />
                                    </ListItem>

                                    {choice.options.map(option =>
                                        <ListItem dataCy="options-list-item" key={`c${choice.id}_o${option.id}`} onClick={() => {
                                            setParentChoiceId(choice.id)
                                            setEditOptionData(option)
                                            setModalOpenOption(true)
                                        }} title={option.title} icon={faCog} indent header={option.id === choice.isDefault ? <Chip title="Standard" /> : ''}>
                                            <p className="mr-4">{numberToPrice(option.price)}</p>
                                            <IconButton dataCy="options-delete-button" icon={faTrash} onClick={() => openDeleteModal({ type: 'option', choiceId: choice.id, optionId: option.id, title: `Option-"${option.title}"` })} />
                                        </ListItem>)
                                    }
                                </Fragment>
                                )}
                            </List>

                            <div className="flex flex-col md:flex-row justify-between mt-4">
                                {isEditing && category && <Button dataCy="category-delete-button" kind="tertiary" onClick={() => openDeleteModal({ type: 'category', categoryId: category._id, title: `Kategorie-"${category?.title}"`, description: `Das L??schen kann nicht r??ckg??ngig gemacht werden.` })} icon={faTrash} className="mb-4 order-last md:order-none">L??schen</Button>}
                                <Button type="submit" kind="primary" dataCy="category-save-button" loading={isLoadingSave} icon={faCheck} className="ml-auto mb-4">Speichern</Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </>}
        </div>


        {/* Choices Modal */}
        <Modal dataCy="choices-modal" modalHeading={isEditingChoice ? "Auswahlm??glichkeiten bearbeiten" : "Neue Auswahlm??glichkeiten"} open={modalOpenChoice} onDissmis={closeChoiceModal}>
            <Formik initialValues={initialChoiceValues} onSubmit={submitChoice} validationSchema={validationChoiceSchema}>
                <Form>
                    <TextInput name="title" labelText="Titel" placeholder="Gr????e, Beilagen,..." labelRequired autoFocus />
                    <Dropdown name="type" labelText="Welchen Typ soll die Auswahlm??glichkeit haben?" helperText='Bei der Option "Einzeln" kann man nur ein Element ausw??hlen. Bei "Mehreren" kann man mehrere Elemente ausw??hlen.' placeholder="W??hle eine Option..." options={dropdownOptionsChoice} labelRequired />
                    <div className="flex justify-end">
                        <Button dataCy="category-choices-save-button" type="submit" icon={faCheck}>{isEditingChoice ? `Speichern` : `Hinzuf??gen`}</Button>
                    </div>
                </Form>
            </Formik>
        </Modal>

        {/* Options Modal */}
        <Modal dataCy="options-modal" modalHeading={isEditingOptions ? "Option bearbeiten" : "Neue Option"} open={modalOpenOption} onDissmis={closeOptionModal}>
            <Formik initialValues={initialOptionValues} onSubmit={submitOption} validationSchema={validationOptionSchema}>
                <Form>
                    <TextInput name="title" labelText="Titel" placeholder="Klein, Mittel, Gro??..." labelRequired autoFocus />
                    <TextInput type="number" name="price" labelText="Preis" labelRequired placeholder="200" icon={faEuroSign} />
                    <Toggle name="isDefault" labelText="Vorausgew??hlte Option?" labelRequired labelOff="Nicht ausgew??hlt" labelOn="Ausgew??hlt" />
                    <div className="flex justify-end">
                        <Button dataCy="category-options-save-button" type="submit" icon={faCheck}>{isEditingOptions ? `Speichern` : `Hinzuf??gen`}</Button>
                    </div>
                </Form>
            </Formik>
        </Modal>

        {/* Delete modal for options */}
        <DeleteModal
            title={deleteData?.title ?? ""}
            description={deleteData?.description ?? ""}
            open={isDeleteModalOpen}
            onDissmis={closeDeleteModal}
            handleDelete={handleDelete}
            isLoadingDelete={isLoadingDelete}
        />
    </>
}