import { Form, Formik } from "formik"
import { useParams } from "react-router-dom"
import { Button } from "../../components/Buttons/Button"
import { Textarea } from "../../components/Form/Textarea"
import { TextInput } from "../../components/Form/TextInput"

export const CategoryEditor: React.FunctionComponent = () => {
    const { categoryid, menuid } = useParams<{ categoryid: string, menuid: string }>()

    const initialValues = {
        title: "",
        description: "",
        icon: "",
        image: "",
        //choices: [],
        menu: menuid
    }

    const submitForm = (values: typeof initialValues) => {
        console.log(values)
    }

    return (
        <div className="container md:max-w-full mt-12">
            <h1 className="text-2xl text-headline-black font-semibold mb-5">{categoryid ? "Kategorie bearbeiten" : "Neue Kategorie"}</h1>
            <h2 className="text-xl text-headline-black font-semibold mb-2">Allgemeines</h2>
            <div className="w-auto" style={{ maxWidth: "500px" }}>
                <Formik initialValues={initialValues} onSubmit={submitForm}>
                    <Form>
                        <TextInput name="image" placeholder="Gebe die Url für ein passendes Bild ein..." labelText="Titelbild" />
                        <TextInput name="icon" placeholder="Font Awesome Icon eingeben!" labelText="Icon" />
                        <TextInput name="title" placeholder="Pizza, Beilagen, Getränke,..." labelText="Titel" labelRequired />
                        <Textarea name="description" placeholder="Zu jedem Burger gibt es Pommes dazu,..." labelText="Beschreibung" labelRequired />
                        <Button type="submit">Speichern</Button>
                    </Form>
                </Formik>
            </div>
        </div>
    )
}