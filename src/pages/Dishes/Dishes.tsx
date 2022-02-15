import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { string } from "yup/lib/locale"
import { Button } from "../../components/Buttons/Button"

type Params = {
    menusId: string,
    categoriesId: string,
    dishId: string
}

export const Dishes: React.FC = () => {
    const { dishId, categoriesId } = useParams<Params>()
    const isEditing = Boolean(dishId)

    const [isLoading, setIsLoading] = useState(isEditing)

    const initialDishValues = {
        _id: dishId,
        title: "",
        description: "",
        image: string,
        isAvailable: "",
        price: 0,
        category: categoriesId,
        allergies: [],
        labels: []
    }

    return (
        <div className="container mt-12">
            <Button kind="tertiary" to="/menus" icon={faArrowLeft} className="mb-3 inline-block text-darkgrey">Zurück</Button>
            {isLoading ? <p>Is Loading...</p> : <div style={{ maxWidth: "500px" }}>
                <h1 className="text-2xl text-headline-black font-semibold mb-2">{isEditing ? 'Gericht bearbeiten' : 'Neues Gericht erstellen'}</h1>
            </div>}
        </div>
    )
}