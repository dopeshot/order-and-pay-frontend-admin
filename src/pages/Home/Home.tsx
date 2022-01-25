import { faTimes } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"
import { Button } from "../../components/Buttons/Button"

export const Home: React.FunctionComponent = () => {
    return (
        <div className="container mt-12">
            <h3 className="text-2xl font-bold">Welcome</h3>
            <Link className="block" to="/tables">Gehe zu Tabellen</Link>
            <div className="w-64">
                <Button kind="tertiary" icon={faTimes}>Hello</Button>
            </div>
        </div>
    )
}