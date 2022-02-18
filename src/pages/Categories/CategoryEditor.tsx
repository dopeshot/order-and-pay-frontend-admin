import { faArrowLeft, faCheck, faTrash } from "@fortawesome/free-solid-svg-icons"
import { Form, Formik } from "formik"
import { useState } from "react"
import { useParams } from "react-router-dom"
import * as Yup from "yup"
import { Button } from "../../components/Buttons/Button"
import { Textarea } from "../../components/Form/Textarea"
import { TextInput } from "../../components/Form/TextInput"
import { ChoiceType } from "../../overmind/categories/effects"

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

export type Choice = {
    id: number
    title: string
    type: ChoiceType
    default?: number // id of option
    options: Option[]
}

export const CategoryEditor: React.FunctionComponent = () => {
    const { categoryId, menuId } = useParams<CategoryParams>()
    const isEditing = Boolean(categoryId)

    // Component States
    const [isLoading, setIsLoading] = useState(isEditing) // Why do we use isEditing here? When we edit we want to load the state from the backend so we set loading state to true till it's fetched.
    const [isLoadingSave, setIsLoadingSave] = useState(false)
    const [modalOpenChoice, setModalOpenChoice] = useState(false)
    const [modalOpenOption, setModalOpenOption] = useState(false)
    const [editChoiceData, setEditChoiceData] = useState<Choice | null>(null)

    // const [editOptionData, setEditOptionData] = useState<Option | null>(null)

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
        console.log("Values from fomrik:", values)
    }

    return (
        <div className="container mt-12">
            <Button kind="tertiary" to="/menus" icon={faArrowLeft} className="mb-3 inline-block text-darkgrey">Zurück</Button>
            <h1 className="text-2xl text-headline-black font-semibold mb-5">{isEditing ? "Kategorie bearbeiten" : "Neue Kategorie"}</h1>

            <Formik initialValues={initialCategoryValues} enableReinitialize validationSchema={validationCategorySchema} onSubmit={submitCategory}>
                <Form>
                    <h2 className="text-xl text-headline-black font-semibold mb-2">Allgemeines</h2>
                    <div className="w-auto mb-10" style={{ maxWidth: "500px" }}>
                        <TextInput name="title" placeholder="Pizza, Beilagen, Getränke,..." labelText="Titel" labelRequired />
                        <TextInput name="image" placeholder="Gebe die Url für ein passendes Bild ein..." labelText="Titelbild" />
                        <TextInput name="icon" placeholder="Font Awesome Icon eingeben!" labelText="Icon" />
                        <Textarea name="description" placeholder="Zu jedem Burger gibt es Pommes dazu,..." labelText="Beschreibung" labelRequired />
                    </div>
                    <div className="flex flex-col md:flex-row justify-between mt-4">
                        {isEditing && <Button kind="tertiary" onClick={() => console.log("delete")} icon={faTrash} className="mb-4 order-last md:order-none">Löschen</Button>}
                        <Button type="submit" kind="primary" loading={isLoadingSave} icon={faCheck} className="ml-auto mb-4">Speichern</Button>
                    </div>
                </Form>
            </Formik>
        </div >
    )
}


// const dropdownOptionsChoice = [
//     {
//         id: ChoiceType.RADIO,
//         label: "Einzeln",
//         icon: faCheck
//     },
//     {
//         id: ChoiceType.CHECKBOX,
//         label: "Mehrere",
//         icon: faCheckDouble
//     }
// ]

            // {/* Choices Modal */}
            // <Formik initialValues={initialValuesChoices} onSubmit={(formikChoicesValues) => submitFormChoices(formikChoicesValues, formikGeneral.setFieldValue, formikGeneral.values)}>
            //     {(formikChoices) => (
            //         <Modal modalHeading={editChoiceData ? "Auswahlmöglichkeiten bearbeiten" : "Neue Auswahlmöglichkeiten"} open={modalOpenChoice} onDissmis={() => {
            //             setModalOpenChoice(false)
            //         }}>
            //             <div>
            //                 <TextInput name="title" labelText="Titel" placeholder="Größe, Beilagen,..." />
            //                 <Dropdown name="type" labelText="Welchen Typ soll die Auswahlmöglichkeit haben?" helperText='Bei der Option "Einzeln" kann man nur ein Element auswählen. Bei "Mehreren" kann man mehrere Elemente auswählen.' placeholder="Wähle eine Option..." options={dropdownOptionsChoice} />
            //             </div>
            //             <Button onClick={formikChoices.handleSubmit} type="submit">Speichern</Button>
            //         </Modal>
            //     )}
            // </Formik>

            // <List>
            //     {formikGeneral.values.choices.map((choice) => (
            //         <>
            //             { /* Choices List */}
            //             <ListItem onClick={() => {
            //                 setEditChoiceData(choice)
            //                 setModalOpenChoice(true)
            //             }} title={choice.title} icon={true ? faCheck : faCheckDouble} background>
            //                 <div className="flex items-center w-full">
            //                     <p className="text-darkgrey ml-8">{choice.type === ChoiceType.RADIO ? "Eine Option" : "Mehrere Optionen"}</p>
            //                     <Button onClick={(e) => {
            //                         setModalOpenOption(true)
            //                     }} kind="tertiary" icon={faPlus} className="text-darkgrey hover:text-headline-black ml-auto mr-4">Neue Option</Button>
            //                     <IconButton icon={faTrash} className="mr-7" onClick={(e) => {
            //                         console.log("Delete Choice")
            //                     }} />
            //                 </div>
            //             </ListItem>
            //             { /* Option List */}
            //             {choice.options.map((option: Option) => (
            //                 <ListItem onClick={() => {
            //                     setModalOpenOption(true)
            //                 }} title={option.name} icon={faCog} indent>
            //                     <p className="ml-auto mr-4">{(1000 / 100).toLocaleString(undefined, { minimumFractionDigits: 2 })}€</p>
            //                     <IconButton icon={faTrash} className="mr-7" onClick={(e) => {
            //                         console.log("Delete Option")
            //                     }} />
            //                 </ListItem>
            //             ))}
            //         </>
            //     ))}
            // </List>

            // {/* Choices and Options */}
            // <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
            //     <div className="mb-4 mr-0 md:mb-0 md:mr-4 lg:mr-0">
            //         <h2 className="text-xl text-headline-black font-semibold">Auswahlmöglichkeiten</h2>
            //         <p className="text-lightgrey">Auswahlmöglichkeiten für ein Gericht wie die Größe oder Beilagen.</p>
            //     </div>
            //     <div className="w-full md:w-auto">
            //         <Button icon={faPlus} onClick={() => {
            //             setModalOpenChoice(true)
            //         }}>Neue Auswahlmöglichkeit</Button>
            //     </div>
            // </div>

            // {/* Option Modal */}
            // <Modal modalHeading={true ? "Option bearbeiten" : "Neue Option"} open={modalOpenOption} onDissmis={() => {
            //     setModalOpenOption(false)
            // }}></Modal>


