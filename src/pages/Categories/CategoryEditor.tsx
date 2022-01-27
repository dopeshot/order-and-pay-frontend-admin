import { faCheck, faCheckDouble, faCog, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons"
import { Formik } from "formik"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { Button } from "../../components/Buttons/Button"
import { IconButton } from "../../components/Buttons/IconButton"
import { Dropdown } from "../../components/Form/Dropdown"
import { Textarea } from "../../components/Form/Textarea"
import { TextInput } from "../../components/Form/TextInput"
import { List } from "../../components/UI/List"
import { ListItem } from "../../components/UI/ListItem"
import { Modal } from "../../components/UI/Modal"
import { CategoryDto, Choice, ChoiceType, Option } from "../../overmind/categories/effects"

export const CategoryEditor: React.FunctionComponent = () => {
    const { categoryid, menuid } = useParams<{ categoryid: string, menuid: string }>()

    const [modalOpenChoice, setModalOpenChoice] = useState(false)
    const [modalOpenOption, setModalOpenOption] = useState(false)
    const [editChoiceData, setEditChoiceData] = useState<Choice | null>(null)
    const [editOptionData, setEditOptionData] = useState<Option | null>(null)

    const initialValuesGeneral: CategoryDto = {
        title: "",
        description: "",
        icon: "",
        image: "",
        choices: [],
        menu: menuid
    }

    const initialValuesChoices: {
        id: number
        title: string
        type: ChoiceType | ""
        options: Option[]
    } = {
        id: editChoiceData?.id ?? 0,
        title: editChoiceData?.title ?? "",
        type: editChoiceData?.type ?? "",
        options: []
    }

    const submitForm = (values: CategoryDto) => {
        console.log("submit", values)
    }

    const submitFormChoices = (formikChoicesValues: typeof initialValuesChoices, formikGeneralSetFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void, formikGeneralValues: CategoryDto) => {
        if (editChoiceData) {
            // let choiceIndex = formikGeneralValues.choices.findIndex((choice) => choice.id == formikChoicesValues.id)
        }

        formikGeneralSetFieldValue('choices', [
            ...formikGeneralValues.choices,
            {
                id: formikGeneralValues.choices.length,
                title: formikChoicesValues.title,
                type: formikChoicesValues.type === "radio" ? ChoiceType.RADIO : ChoiceType.CHECKBOX,
                options: initialValuesChoices.options
            }
        ])

        setEditChoiceData(null)
        setModalOpenChoice(false)
    }

    const preventDoubleOnClick = (event: any) => {
        if (!event)
            event = window.event

        event.cancelBubble = true

        if (event.stopPropagation)
            event!.stopPropagation()
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

    return (
        <div className="container md:max-w-full mt-12">
            <h1 className="text-2xl text-headline-black font-semibold mb-5">{categoryid ? "Kategorie bearbeiten" : "Neue Kategorie"}</h1>

            <Formik initialValues={initialValuesGeneral} onSubmit={submitForm}>
                {(formikGeneral) => (
                    <form onSubmit={formikGeneral.handleSubmit}>
                        {/* General */}
                        <h2 className="text-xl text-headline-black font-semibold mb-2">Allgemeines</h2>
                        <div className="w-auto mb-10" style={{ maxWidth: "500px" }}>
                            <TextInput name="image" placeholder="Gebe die Url für ein passendes Bild ein..." labelText="Titelbild" />
                            <TextInput name="icon" placeholder="Font Awesome Icon eingeben!" labelText="Icon" />
                            <TextInput name="title" placeholder="Pizza, Beilagen, Getränke,..." labelText="Titel" labelRequired />
                            <Textarea name="description" placeholder="Zu jedem Burger gibt es Pommes dazu,..." labelText="Beschreibung" labelRequired />
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

                        {/* Choices Modal */}
                        <Formik initialValues={initialValuesChoices} onSubmit={(formikChoicesValues) => submitFormChoices(formikChoicesValues, formikGeneral.setFieldValue, formikGeneral.values)}>
                            {(formikChoices) => (
                                <Modal modalHeading={editChoiceData ? "Auswahlmöglichkeiten bearbeiten" : "Neue Auswahlmöglichkeiten"} open={modalOpenChoice} onDissmis={() => {
                                    setModalOpenChoice(false)
                                }}>
                                    <div>
                                        <TextInput name="title" labelText="Titel" placeholder="Größe, Beilagen,..." />
                                        <Dropdown name="type" labelText="Welchen Typ soll die Auswahlmöglichkeit haben?" helperText='Bei der Option "Einzeln" kann man nur ein Element auswählen. Bei "Mehreren" kann man mehrere Elemente auswählen.' placeholder="Wähle eine Option..." options={dropdownOptionsChoice} />
                                    </div>
                                    <Button onClick={formikChoices.handleSubmit} type="submit">Speichern</Button>
                                </Modal>
                            )}
                        </Formik>

                        <List>
                            {formikGeneral.values.choices.map((choice) => (
                                <>
                                    { /* Choices List */}
                                    <ListItem onClick={() => {
                                        setEditChoiceData(choice)
                                        setModalOpenChoice(true)
                                    }} title={choice.title} icon={true ? faCheck : faCheckDouble} background>
                                        <div className="flex items-center w-full">
                                            <p className="text-darkgrey ml-8">{choice.type === ChoiceType.RADIO ? "Eine Option" : "Mehrere Optionen"}</p>
                                            <Button onClick={(e) => {
                                                preventDoubleOnClick(e)
                                                setModalOpenOption(true)
                                            }} kind="tertiary" icon={faPlus} className="text-darkgrey hover:text-headline-black ml-auto mr-4">Neue Option</Button>
                                            <IconButton icon={faTrash} className="mr-7" onClick={(e) => {
                                                preventDoubleOnClick(e)
                                                console.log("Delete Choice")
                                            }} />
                                        </div>
                                    </ListItem>
                                    { /* Option List */}
                                    {choice.options.map((option: Option) => (
                                        <ListItem onClick={() => {
                                            setModalOpenOption(true)
                                        }} title={option.name} icon={faCog} indent>
                                            <p className="ml-auto mr-4">{(1000 / 100).toLocaleString(undefined, { minimumFractionDigits: 2 })}€</p>
                                            <IconButton icon={faTrash} className="mr-7" onClick={(e) => {
                                                preventDoubleOnClick(e)
                                                console.log("Delete Option")
                                            }} />
                                        </ListItem>
                                    ))}
                                </>
                            ))}
                        </List>

                        <Button type="submit" className="mt-10">Speichern</Button>
                    </form>
                )}
            </Formik>





            {/* Option Modal */}
            <Modal modalHeading={true ? "Option bearbeiten" : "Neue Option"} open={modalOpenOption} onDissmis={() => {
                setModalOpenOption(false)
            }}></Modal>
        </div >
    )
}