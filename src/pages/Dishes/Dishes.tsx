import { faArrowLeft, faCheck, faEuroSign, faHamburger, faLeaf, faMagnet, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons"
import { Form, Formik } from "formik"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { Button } from "../../components/Buttons/Button"
import { Checkbox } from "../../components/Form/Checkbox"
import { Dropdown } from "../../components/Form/Dropdown"
import { Textarea } from "../../components/Form/Textarea"
import { TextInput } from "../../components/Form/TextInput"
import { Toggle } from "../../components/Form/Toggle"
import { useActions } from "../../overmind"
import { DishDto } from "../../overmind/dishes/effects"

type Params = {
    menusId: string,
    categoriesId: string,
    dishId: string
}

export const Dishes: React.FC = () => {
    const { dishId } = useParams<Params>()
    const isEditing = Boolean(dishId)

    const [isLoading, setIsLoading] = useState(false)

    // Get hooks to manipulate global state
    const { createDish, getDishById, updateDish, deleteDish } = useActions().dishes

    const initialDishValues: DishDto = {
        _id: dishId,
        title: "",
        description: "",
        image: "",
        isAvailable: true,
        price: 0,
        category: "",
        allergens: [],
        labels: []
    }

    const onDishSubmit = (values: DishDto) => {

    }

    const categories = [{
        id: 1,
        label: "Burger",
        icon: faHamburger
    }]

    const labels = [{
        id: 1,
        label: "vegan",
        icon: faLeaf
    }, {
        id: 2,
        label: "vegan",
        icon: faLeaf
    }, {
        id: 3,
        label: "vegan",
        icon: faLeaf
    }]

    const allergies = [{
        id: 1,
        label: "gluten",
        icon: faMagnet
    }, {
        id: 2,
        label: "gluten",
        icon: faMagnet
    }]

    return (
        <div className="container mt-12">
            <Button kind="tertiary" to="/menus" icon={faArrowLeft} className="mb-3 inline-block text-darkgrey">Zurück</Button>
            {isLoading ? <p>Is Loading...</p> : <div style={{ maxWidth: "500px" }}>
                <h1 className="text-2xl text-headline-black font-semibold mb-2">{isEditing ? 'Gericht bearbeiten' : 'Neues Gericht erstellen'}</h1>
                <Formik enableReinitialize initialValues={initialDishValues} onSubmit={onDishSubmit}>
                    <Form>
                        <TextInput name="titleimage" labelText="Titelbild Url" placeholder="https://i.imgur.com/TMhXsH4.jpeg" />
                        <div className="flex justify-between">
                            <span className="w-3/4 mr-2"><TextInput name="title" labelText="Titel" labelRequired placeholder="Hamburger, Cola,..." /></span>
                            <span className="w-1/4"><TextInput name="price" labelText="Preis" labelRequired placeholder="Hamburger, Gemischter Salat, Cola,..." icon={faEuroSign} /></span>
                        </div>
                        <Textarea name="description" labelText="Beschreibung" placeholder="Zu jedem Burger gibt es Pommes dazu,..." />
                        <Dropdown name="category" placeholder="Wähle eine Kategorie..." labelText="Kategorie" labelRequired options={categories} />
                        <Toggle name="isAvailable" labelText="Ist das Gericht gerade verfügbar?" labelOff="Nicht verfügbar" labelOn="Verfügbar" />
                        <div className="flex">
                            <div className="mr-2 sm:mr-8 md:mr-32">
                                <Checkbox name="labels" labelText="Labels" options={labels} />
                                <Button kind="tertiary" to="/menus/labels" icon={faPlus} className="text-left">Label hinzufügen</Button>
                            </div>
                            <div>
                                <Checkbox name="allergens" labelText="Allergenen" options={allergies} />
                                <Button kind="tertiary" to="/menus/allergens" icon={faPlus} className="text-left">Allergene hinzufügen</Button>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row justify-between mt-10">
                            {isEditing && <Button kind="tertiary" icon={faTrash} className="mb-4 order-last md:order-none">Löschen</Button>}
                            <Button type="submit" icon={faCheck} className="ml-auto mb-4">Speichern</Button>
                        </div>
                    </Form>
                </Formik>
            </div>}
        </div>
    )
}