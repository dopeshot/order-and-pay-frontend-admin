import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { useParams } from "react-router-dom"
import { Button } from "../../components/Buttons/Button"

type SingleMenuParams = {
    menuId: string
}

export const SingleMenu: React.FC = () => {
    const { menuId } = useParams<SingleMenuParams>()

    return (
        <div className="container md:max-w-full mt-12">
            <Button kind="tertiary" to="/menus" icon={faArrowLeft} className="mb-3 inline-block text-darkgrey">Zurück zu allen Menüs</Button>
            <h1 className="text-2xl text-headline-black font-semibold">Menu {menuId}</h1>
        </div>
    )
}