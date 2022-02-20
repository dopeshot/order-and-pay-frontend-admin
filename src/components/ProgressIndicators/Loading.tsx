import { faCircleNotch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export const Loading: React.FC = () => {

    return <div data-cy="loading-component" className="flex gap-4">
        <FontAwesomeIcon icon={faCircleNotch} className="animate-spin mr-3" />
        <p>Bereitet Burger zu...</p>
    </div>
}