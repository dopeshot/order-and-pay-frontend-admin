import { faCheck, faCheckDouble, faCog, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FieldArray, Form, Formik } from "formik"
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
import { CategoryDto, Choice, ChoiceType } from "../../overmind/categories/effects"

export const CategoryEditor: React.FunctionComponent = () => {
    const { categoryid, menuid } = useParams<{ categoryid: string, menuid: string }>()

    const [modalOpenChoice, setModalOpenChoice] = useState(true)
    const [modalOpenOption, setModalOpenOption] = useState(false)
    const [editChoiceData, setEditChoiceData] = useState<Choice | null>(null)
    const [isEditOption, setIsEditOption] = useState(false)

    const initialValues: CategoryDto = {
        title: "",
        description: "",
        icon: "",
        image: "",
        choices: [],
        menu: menuid
    }

    const submitForm = (values: CategoryDto) => {
        console.log(values)
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

            <Formik initialValues={initialValues} onSubmit={submitForm}>
                {({ values }) => (
                    <Form>
                        {/* General */}
                        <h2 className="text-xl text-headline-black font-semibold mb-2">Allgemeines</h2>
                        <div className="w-auto mb-10" style={{ maxWidth: "500px" }}>
                            <TextInput name="image" placeholder="Gebe die Url für ein passendes Bild ein..." labelText="Titelbild" />
                            <TextInput name="icon" placeholder="Font Awesome Icon eingeben!" labelText="Icon" />
                            <TextInput name="title" placeholder="Pizza, Beilagen, Getränke,..." labelText="Titel" labelRequired />
                            <Textarea name="description" placeholder="Zu jedem Burger gibt es Pommes dazu,..." labelText="Beschreibung" labelRequired />
                        </div>

                        <FieldArray name="choices">
                            {arrayHelpers => (<>
                                {console.log(values)}
                                {/* Choices and Options */}
                                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                                    <div className="mb-4 mr-0 md:mb-0 md:mr-4 lg:mr-0">
                                        <h2 className="text-xl text-headline-black font-semibold">Auswahlmöglichkeiten</h2>
                                        <p className="text-lightgrey">Auswahlmöglichkeiten für ein Gericht wie die Größe oder Beilagen.</p>
                                    </div>
                                    <div className="w-full md:w-auto">
                                        <Button icon={faPlus} onClick={() => {
                                            setModalOpenChoice(true)
                                            arrayHelpers.push({
                                                id: 0,
                                                title: "",
                                                type: ChoiceType.RADIO,
                                                options: []
                                            })
                                        }}>Neue Auswahlmöglichkeit</Button>
                                    </div>
                                </div>

                                <List>
                                    {values.choices && values.choices.length > 0 ? (
                                        values.choices.map((choice, index) => (
                                            <div key={choice.id}>
                                                {/* Choices Modal */}
                                                <Modal modalHeading={editChoiceData ? "Auswahlmöglichkeiten bearbeiten" : "Neue Auswahlmöglichkeiten"} open={modalOpenChoice} onDissmis={() => {
                                                    setModalOpenChoice(false)
                                                    setEditChoiceData(null)
                                                }}>
                                                    <div>
                                                        <TextInput name={`choices.${index}.title`} labelText="Titel" placeholder="Größe, Beilagen,..." />
                                                        <Dropdown name={`choices.${index}.type`} labelText="Welchen Typ soll die Auswahlmöglichkeit haben?" helperText='Bei der Option "Einzeln" kann man nur ein Element auswählen. Bei "Mehreren" kann man mehrere Elemente auswählen.' placeholder="Wähle eine Option..." options={dropdownOptionsChoice} />
                                                    </div>
                                                </Modal>

                                                <ListItem onClick={() => {
                                                    setEditChoiceData(choice)
                                                    setModalOpenChoice(true)
                                                }} title={choice.title} icon={choice.type === ChoiceType.RADIO ? faCheck : faCheckDouble} background>
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
                                                {values.choices[index].options.map((option) => (
                                                    <div key={option.id} >
                                                        {/* Option Modal */}
                                                        <Modal modalHeading={isEditOption ? "Option bearbeiten" : "Neue Option"} open={modalOpenOption} onDissmis={() => {
                                                            setModalOpenOption(false)
                                                            setIsEditOption(false)
                                                        }}></Modal>

                                                        <ListItem onClick={() => {
                                                            setModalOpenOption(true)
                                                            setIsEditOption(true)
                                                        }} title={option.name} icon={faCog} indent>
                                                            <p className="ml-auto mr-4">{(option.price / 100).toLocaleString(undefined, { minimumFractionDigits: 2 })}€</p>
                                                            <IconButton icon={faTrash} className="mr-7" onClick={(e) => {
                                                                preventDoubleOnClick(e)
                                                                console.log("Delete Option")
                                                            }} />
                                                        </ListItem>
                                                    </div>
                                                ))}
                                            </div>
                                        ))
                                    ) :
                                        // JS:TODO: Add no data component
                                        <p className="text-lightgrey">Du hast noch keine Auswahlmöglichkeiten. Füge neue Auswahlmöglichkeiten hinzu!</p>
                                    }
                                </List>
                            </>
                            )}
                        </FieldArray>

                        <Button type="submit" className="mt-10">Speichern</Button>
                    </Form>
                )}
            </Formik>
        </div >
    )
}