import { faArrowLeft, faCheck, faCheckDouble, faCog, faEuroSign, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons"
import { Form, Formik } from "formik"
import { useState } from "react"
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
import { Modal } from "../../components/UI/Modal"
import { Tag } from "../../components/UI/Tag"
import { useAppState } from "../../overmind"
import { ChoiceType } from "../../overmind/categories/effects"
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
    menu: string
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
    default?: number // id of option
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

    // Component States
    const [isLoading, setIsLoading] = useState(isEditing) // Why do we use isEditing here? When we edit we want to load the state from the backend so we set loading state to true till it's fetched.
    const [isLoadingSave, setIsLoadingSave] = useState(false)

    const [modalOpenChoice, setModalOpenChoice] = useState(false)
    const [editChoiceData, setEditChoiceData] = useState<Choice | null>(null)
    const isEditingChoice = Boolean(editChoiceData)

    const [choices, setChoices] = useState<Choice[]>([{
        id: 0,
        title: "Größe",
        type: ChoiceType.RADIO,
        options: [{
            id: 0,
            name: "Klein",
            price: 200
        }, {
            id: 1,
            name: "Mittel",
            price: 500
        }, {
            id: 3,
            name: "Groß",
            price: 800
        }],
        default: 1
    }, {
        id: 1,
        title: "Extras",
        type: ChoiceType.CHECKBOX,
        options: []
    }])

    const [modalOpenOption, setModalOpenOption] = useState(false)
    const [editOptionData, setEditOptionData] = useState<Option | null>(null)
    const [parentChoiceId, setParentChoiceId] = useState<number | null>(null)
    const isEditingOptions = Boolean(editOptionData)

    const initialCategoryValues: CategoryWithoutChoices = {
        title: "",
        description: "",
        icon: "",
        image: "",
        menu: menuId
    }

    const validationCategorySchema = Yup.object().shape({
        title: Yup.string().min(2, "Der Titel muss aus mindestens 2 Zeichen bestehen.").max(32, "Der Titel darf nicht länger als 32 Zeichen sein.").required("Dies ist ein Pflichtfeld."),
        description: Yup.string().max(240, "Die Beschreibung darf nicht länger als 240 Zeichen sein."),
        icon: Yup.string().max(32, "Das Icon darf nicht länger als 32 Zeichen sein."),
        image: Yup.string().max(240, "Die Bild-URL darf nicht länger als 240 Zeichen sein."),
        menu: Yup.string().max(128, "Ein Fehler ist aufgetreten. Die Menu-ID ist nicht definiert.")
    })


    const submitCategory = (values: CategoryWithoutChoices) => {
        console.log("submitCategory:", values)
        console.log("choices:", choices)
        console.log("finalObject:", {
            ...values,
            choices
        })
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
        isDefault: (parentChoiceId !== null && choices[parentChoiceId].default === editOptionData?.id) ?? false
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
                if (isDefault && choices[parentChoiceId].default !== editOptionData.id)
                    choices[parentChoiceId].default = editOptionData.id

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
                choices[parentChoiceId].default = newOption.id

            setChoices(newChoices)
        }

        // Close modal
        closeOptionModal()
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
            <h1 className="text-2xl text-headline-black font-semibold mb-5">{isEditing ? "Kategorie bearbeiten" : "Neue Kategorie"}</h1>

            <Formik initialValues={initialCategoryValues} enableReinitialize validationSchema={validationCategorySchema} onSubmit={submitCategory}>
                <Form>
                    <h2 className="text-xl text-headline-black font-semibold mb-2">Allgemeines</h2>
                    <div className="w-auto mb-10" style={{ maxWidth: "500px" }}>
                        <TextInput name="title" placeholder="Pizza, Beilagen, Getränke,..." labelText="Titel" labelRequired />
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
                        {choices.map(choice => <>
                            <ListItem key={`c${choice.id}`} onClick={() => {
                                setEditChoiceData(choice)
                                setModalOpenChoice(true)
                            }} title={choice.title} icon={choice.type === ChoiceType.RADIO ? faCheck : faCheckDouble} header={<p className="text-darkgrey">{choice.type === ChoiceType.RADIO ? "Eine Option" : "Mehrere Optionen"}</p>} background>
                                {isMobile ? <IconButton icon={faPlus} /> : <Button kind="tertiary" onClick={() => {
                                    setParentChoiceId(choice.id)
                                    setModalOpenOption(true)
                                }} icon={faPlus} className="text-darkgrey mr-3">Neue Option</Button>}
                                <IconButton icon={faTrash} onClick={() => console.log("remove")} />
                            </ListItem>

                            {choice.options.map(option =>
                                <ListItem key={`o${option.id}`} onClick={() => {
                                    setParentChoiceId(choice.id)
                                    setEditOptionData(option)
                                    setModalOpenOption(true)
                                }} title={option.name} icon={faCog} indent header={option.id === choice.default ? <Tag title="Standard" /> : ''}>
                                    <p className="mr-4">{numberToPrice(option.price)}</p>
                                    <IconButton icon={faTrash} onClick={() => {
                                        console.log("Delete Option")
                                    }} />
                                </ListItem>)
                            }
                        </>
                        )}
                    </List>

                    <div className="flex flex-col md:flex-row justify-between mt-4">
                        {isEditing && <Button kind="tertiary" onClick={() => console.log("delete")} icon={faTrash} className="mb-4 order-last md:order-none">Löschen</Button>}
                        <Button type="submit" kind="primary" loading={isLoadingSave} icon={faCheck} className="ml-auto mb-4">Speichern</Button>
                    </div>
                </Form>
            </Formik>
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