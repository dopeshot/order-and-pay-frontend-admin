import { faChevronLeft } from "@fortawesome/free-solid-svg-icons"
import { Button } from "../../components/Buttons/Button"

export const Home: React.FunctionComponent = () => {
    return (
        <div className="container mt-12">
            <h3 className="text-2xl font-bold">Welcome</h3>
            <Button kind="tertiary" to="/tables" className="text-darkgrey hover:text-darkgrey" icon={faChevronLeft}>Gehe zu Tabellen</Button>
            <Button kind="primary" to="/tables" icon={faChevronLeft}>Gehe zu Tabellen</Button>
            <Button kind="secondary" to="/tables" icon={faChevronLeft}>Gehe zu Tabellen</Button>
        </div>
    )
}