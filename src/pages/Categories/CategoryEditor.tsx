import { faArrowLeft, faCheck, faCheckDouble, faCog, faEuroSign, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons"
import { Form, Formik } from "formik"
import { Fragment, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import * as Yup from "yup"
import { Button } from "../../components/Buttons/Button"
import { IconButton } from "../../components/Buttons/IconButton"
import { Dropdown } from "../../components/Form/Dropdown"
import { Textarea } from "../../components/Form/Textarea"
import { TextInput } from "../../components/Form/TextInput"
import { Toggle } from "../../components/Form/Toggle"
import { List } from "../../components/UI/List"
import { ListItem } from "../../components/UI/ListItem"
import { Loading } from "../../components/UI/Loading"
import { Modal } from "../../components/UI/Modal"
import { Tag } from "../../components/UI/Tag"
import { useActions, useAppState } from "../../overmind"
import { ChoiceType } from "../../overmind/categories/effects"
import { Category } from "../../overmind/dishes/effects"
import { numberToPrice } from "../../services/numberToPrice"

type CategoryParams = {
    categoryId: string,
    menuId: string
}

type CategoryWithoutChoices = {
    title: string
    description: string
    icon: string
    image: string
    menuId: string
}

export type Option = {
    id: number
    name: string
    price: number
}

export type OptionDto = {
    name: string
    price: number
    isDefault: boolean
}

export type Choice = {
    id: number
    title: string
    type: ChoiceType
    isDefault?: number // id of option
    options: Option[]
}

export type ChoiceDto = {
    title: string,
    type: ChoiceType
}

export const CategoryEditor: React.FunctionComponent = () => {
    const { categoryId, menuId } = useParams<CategoryParams>()
    const isEditing = Boolean(categoryId)

    // Global States
    const { isMobile } = useAppState().app

    // Global actions
    const { createCategory, getCategoryById } = useActions().categories

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

    useEffect(() => {
        let isMounted = true
        async function loadCategory() {
            // Fetch category and set editing
            const category = await getCategoryById(categoryId)

            if (!isMounted)
                return

            setCategory(category)
            setChoices(category.choices)
            setIsLoading(false)
        }

        // Check if we are editing an existing menu
        if (isEditing)
            loadCategory()

        return () => { isMounted = false }
    }, [])

    const initialCategoryValues: CategoryWithoutChoices = {
        title: category?.title ?? "",
        description: category?.description ?? "",
        icon: category?.icon ?? "",
        image: category?.image ?? "",
        menuId: category?.menuId ?? menuId
    }

    const validationCategorySchema = Yup.object().shape({
        title: Yup.string().min(2, "Der Titel muss aus mindestens 2 Zeichen bestehen.").max(32, "Der Titel darf nicht länger als 32 Zeichen sein.").required("Dies ist ein Pflichtfeld."),
        description: Yup.string().max(240, "Die Beschreibung darf nicht länger als 240 Zeichen sein."),
        icon: Yup.string().max(32, "Das Icon darf nicht länger als 32 Zeichen sein."),
        image: Yup.string().max(240, "Die Bild-URL darf nicht länger als 240 Zeichen sein."),
        menu: Yup.string().max(128, "Ein Fehler ist aufgetreten. Die Menu-ID ist nicht definiert.")
    })


    const submitCategory = async (values: CategoryWithoutChoices) => {
        console.log("submitCategory:", values)
        console.log("choices:", choices)
        const newCategory = {
            ...values,
            choices
        }
        console.log("finalObject:", newCategory)
        await createCategory(newCategory)
    }


    // choices

    const initialChoiceValues: ChoiceDto = {
        title: editChoiceData?.title ?? "",
        type: editChoiceData?.type ?? ChoiceType.RADIO
    }

    const validationChoiceSchema = Yup.object().shape({
        title: Yup.string().min(2, "Der Titel muss aus mindestens 2 Zeichen bestehen.").max(32, "Der Titel darf nicht länger als 32 Zeichen sein.").required("Dies ist ein Pflichtfeld."),
        type: Yup.string().oneOf(Object.values(ChoiceType)).required()
    })

    const submitChoice = (values: ChoiceDto) => {
        console.log("submitChoice:", values)

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
        name: editOptionData?.name ?? "",
        price: editOptionData?.price ?? 100,
        isDefault: (parentChoiceId !== null && choices[parentChoiceId].isDefault === editOptionData?.id) ?? false
    }

    const validationOptionSchema = Yup.object().shape({
        name: Yup.string().min(2, "Der Titel muss aus mindestens 2 Zeichen bestehen.").max(32, "Der Titel darf nicht länger als 32 Zeichen sein.").required("Dies ist ein Pflichtfeld."),
        price: Yup.number().min(0, "Der Preis darf nicht kleiner als 0 sein.").max(10000000, "Der Preis darf nicht größer als 10000000 sein.").required("Dies ist ein Pflichtfeld."),
        isDefault: Yup.boolean().required()
    })

    const submitOption = (values: OptionDto) => {
        console.log("submitOption:", values)

        if (parentChoiceId === null) {
            console.error("parentChoiceId is not defined.")
            return
        }

        // Remove isDefault from values
        const { isDefault, ...optionData } = values

        if (isEditingOptions && editOptionData) {
            setChoices(choices => {
                // Update default
                if (isDefault && choices[parentChoiceId].isDefault !== editOptionData.id)
                    choices[parentChoiceId].isDefault = editOptionData.id

                const option = choices[parentChoiceId].options.find(option => option.id === editOptionData.id)
                Object.assign(option, optionData)
                return choices
            })
        } else {
            // Create new option from OptionDto. + next id
            const newOption: Option = {
                ...optionData,
                id: Math.max(...choices[parentChoiceId].options.map(option => option.id), 0) + 1
            }

            // Copy choices
            const newChoices = [...choices]

            // Push new option into options array of currently editing choice
            newChoices[parentChoiceId].options = [...newChoices[parentChoiceId].options, newOption]

            // Set to default
            if (isDefault)
                choices[parentChoiceId].isDefault = newOption.id

            setChoices(newChoices)
        }

        // Close modal
        closeOptionModal()
    }

    const deleteOption = (choiceId: number, optionId: number) => {
        setChoices(choices => {
            const newChoices = [...choices]
            let choice = newChoices.find(choice => choice.id === choiceId)!

            choice.options = choice.options.filter(option => option.id !== optionId)

            if (choice.isDefault === optionId)
                delete choice.isDefault

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
            <Button kind="tertiary" to="/menus" icon={faArrowLeft} className="mb-3 inline-block text-darkgrey">Zurück</Button>
            {isLoading ? <Loading /> : <>
                <h1 className="text-2xl text-headline-black font-semibold mb-5">{isEditing ? "Kategorie bearbeiten" : "Neue Kategorie"}</h1>

                <Formik initialValues={initialCategoryValues} enableReinitialize validationSchema={validationCategorySchema} onSubmit={submitCategory}>
                    <Form>
                        <h2 className="text-xl text-headline-black font-semibold mb-2">Allgemeines</h2>
                        <div className="w-auto mb-10" style={{ maxWidth: "500px" }}>
                            <TextInput name="title" placeholder="Pizza, Beilagen, Getränke,..." labelText="Titel" labelRequired autoFocus />
                            <Textarea name="description" placeholder="Zu jedem Burger gibt es Pommes dazu,..." labelText="Beschreibung" />
                            <TextInput name="image" placeholder="Gebe die Url für ein passendes Bild ein..." labelText="Titelbild" />
                            <TextInput name="icon" placeholder="Font Awesome Icon eingeben!" labelText="Icon" />
                        </div>

                        {/* Choices and Options */}
                        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                            <div className="mb-4 mr-0 md:mb-0 md:mr-4 lg:mr-0">
                                <h2 className="text-xl text-headline-black font-semibold">Auswahlmöglichkeiten</h2>
                                <p className="text-lightgrey">Auswahlmöglichkeiten für ein Gericht wie die Größe oder Beilagen.</p>
                            </div>
                            <div className="w-full md:w-auto">
                                <Button icon={faPlus} onClick={() => {
                                    setModalOpenChoice(true)
                                }}>Neue Auswahlmöglichkeit</Button>
                            </div>
                        </div>

                        <List>
                            {choices.map(choice => <Fragment key={`c${choice.id}`}>
                                <ListItem onClick={() => {
                                    setEditChoiceData(choice)
                                    setModalOpenChoice(true)
                                }} title={choice.title} icon={choice.type === ChoiceType.RADIO ? faCheck : faCheckDouble} header={<p className="text-darkgrey">{choice.type === ChoiceType.RADIO ? "Eine Option" : "Mehrere Optionen"}</p>} background>
                                    {isMobile ? <IconButton icon={faPlus} onClick={() => {
                                        setParentChoiceId(choice.id)
                                        setModalOpenOption(true)
                                    }} /> : <Button kind="tertiary" onClick={() => {
                                        setParentChoiceId(choice.id)
                                        setModalOpenOption(true)
                                    }} icon={faPlus} className="text-darkgrey mr-3">Neue Option</Button>}
                                    <IconButton icon={faTrash} onClick={() => deleteChoice(choice.id)} />
                                </ListItem>

                                {choice.options.map(option =>
                                    <ListItem key={`c${choice.id}_o${option.id}`} onClick={() => {
                                        setParentChoiceId(choice.id)
                                        setEditOptionData(option)
                                        setModalOpenOption(true)
                                    }} title={option.name} icon={faCog} indent header={option.id === choice.isDefault ? <Tag title="Standard" /> : ''}>
                                        <p className="mr-4">{numberToPrice(option.price)}</p>
                                        <IconButton icon={faTrash} onClick={() => deleteOption(choice.id, option.id)} />
                                    </ListItem>)
                                }
                            </Fragment>
                            )}
                        </List>

                        <div className="flex flex-col md:flex-row justify-between mt-4">
                            {isEditing && <Button kind="tertiary" onClick={() => console.log("delete")} icon={faTrash} className="mb-4 order-last md:order-none">Löschen</Button>}
                            <Button type="submit" kind="primary" loading={isLoadingSave} icon={faCheck} className="ml-auto mb-4">Speichern</Button>
                        </div>
                    </Form>
                </Formik>
            </>}
        </div>


        {/* Choices Modal */}
        <Modal modalHeading={isEditingChoice ? "Auswahlmöglichkeiten bearbeiten" : "Neue Auswahlmöglichkeiten"} open={modalOpenChoice} onDissmis={closeChoiceModal}>
            <Formik initialValues={initialChoiceValues} onSubmit={submitChoice} validationSchema={validationChoiceSchema}>
                <Form>
                    <TextInput name="title" labelText="Titel" placeholder="Größe, Beilagen,..." labelRequired autoFocus />
                    <Dropdown name="type" labelText="Welchen Typ soll die Auswahlmöglichkeit haben?" helperText='Bei der Option "Einzeln" kann man nur ein Element auswählen. Bei "Mehreren" kann man mehrere Elemente auswählen.' placeholder="Wähle eine Option..." options={dropdownOptionsChoice} labelRequired />
                    <Button type="submit" icon={faCheck}>{isEditingChoice ? `Speichern` : `Hinzufügen`}</Button>
                </Form>
            </Formik>
        </Modal>

        {/* Options Modal */}
        <Modal modalHeading={isEditingOptions ? "Option bearbeiten" : "Neue Option"} open={modalOpenOption} onDissmis={closeOptionModal}>
            <Formik initialValues={initialOptionValues} onSubmit={submitOption} validationSchema={validationOptionSchema}>
                <Form>
                    <TextInput name="name" labelText="Titel" placeholder="Klein, Mittel, Groß..." labelRequired autoFocus />
                    <TextInput type="number" name="price" labelText="Preis" labelRequired placeholder="200" icon={faEuroSign} />
                    <Toggle name="isDefault" labelText="Vorausgewählte Option?" labelRequired labelOff="Nicht ausgewählt" labelOn="Ausgewählt" />
                    <Button type="submit" icon={faCheck}>{isEditingOptions ? `Speichern` : `Hinzufügen`}</Button>
                </Form>
            </Formik>
        </Modal>
    </>
}

// MC TODO: Move save button to right in modals!