import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { Button } from "./Button"

type BackButtonProps = {
    /** Link to go when click back button */
    to: string
    /** For Testing */
    dataCy?: string
}

/**
 * Back Button, can only be used as a link to go back
 */
export const BackButton: React.FC<BackButtonProps> = ({ to, dataCy }) => {
    return (
        <Button dataCy={dataCy} kind="tertiary" to={to} icon={faArrowLeft} className="mb-3 inline-block text-darkgrey">Zurück</Button>
    )
}