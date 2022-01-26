import { faCheck, faCheckDouble, faCog, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FieldArray, Form, Formik } from "formik"
import { useParams } from "react-router-dom"
import { Button } from "../../components/Buttons/Button"
import { IconButton } from "../../components/Buttons/IconButton"
import { Textarea } from "../../components/Form/Textarea"
import { TextInput } from "../../components/Form/TextInput"
import { List } from "../../components/UI/List"
import { ListItem } from "../../components/UI/ListItem"
import { CategoryDto, ChoiceType } from "../../overmind/categories/effects"

export const CategoryEditor: React.FunctionComponent = () => {
    const { categoryid, menuid } = useParams<{ categoryid: string, menuid: string }>()

    const initialValues: CategoryDto = {
        title: "",
        description: "",
        icon: "",
        image: "",
        choices: [{
            "id": 0,
            "title": "size",
            "default": 1,
            "type": ChoiceType.RADIO,
            "options": [{
                "id": 0,
                "name": "small",
                "price": -200
            }]
        }],
        menu: menuid
    }

    const submitForm = (values: typeof initialValues) => {
        console.log(values)
    }

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
                        {/* Choices and Options */}
                        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                            <div className="mb-4 mr-0 md:mb-0 md:mr-4 lg:mr-0">
                                <h2 className="text-xl text-headline-black font-semibold">Auswahlmöglichkeiten</h2>
                                <p className="text-lightgrey">Auswahlmöglichkeiten für ein Gericht wie die Größe oder Beilagen.</p>
                            </div>
                            <div className="w-full md:w-auto">
                                <Button icon={faPlus} onClick={() => ""}>Neue Auswahlmöglichkeit</Button>
                            </div>
                        </div>
                        <FieldArray name="choices">
                            {arrayHelpers => (
                                <List>
                                    {values.choices && values.choices.length > 0 ? (
                                        values.choices.map((value, index) => (
                                            <>
                                                <ListItem title={value.title} icon={value.type === ChoiceType.RADIO ? faCheck : faCheckDouble} background>
                                                    <p className="text-darkgrey ml-8">{value.type === ChoiceType.RADIO ? "Eine Option" : "Mehrere Optionen"}</p>
                                                    <IconButton icon={faTrash} className="mr-7" onClick={() => ""} />
                                                </ListItem>
                                                {values.choices[index].options.map((option) => (
                                                    <ListItem title={option.name} icon={faCog} indent>
                                                        <p className="ml-auto mr-4">{(option.price / 100).toLocaleString(undefined, { minimumFractionDigits: 2 })}€</p>
                                                        <IconButton icon={faTrash} className="mr-7" onClick={() => ""} />
                                                    </ListItem>
                                                ))}
                                            </>
                                        ))
                                    ) :
                                        // JS:TODO: Add no data component
                                        <p className="text-lightgrey">Du hast noch keine Auswahlmöglichkeiten. Füge neue Auswahlmöglichkeiten hinzu!</p>
                                    }
                                </List>
                            )}
                        </FieldArray>

                        <Button type="submit" className="mt-10">Speichern</Button>
                    </Form>
                )}
            </Formik>
        </div >
    )
}