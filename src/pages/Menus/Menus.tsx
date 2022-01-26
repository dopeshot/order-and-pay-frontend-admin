import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { Button } from "../../components/Buttons/Button"

export const Menus: React.FC = () => {


    return <div className="container md:max-w-full mt-12" >
        <div className="flex flex-col md:flex-row md:justify-between">
            <div>
                <h1 className="text-2xl text-headline-black font-semibold">Alle Menüs</h1>
                <p className="text-lightgrey mr-3 mb-4">{!true ? [].length : 0} Gesamt</p>
            </div>
            <div>
                <Button icon={faPlus} to="/menus/add">Menü hinzufügen</Button>
            </div>
        </div>
    </div>
}