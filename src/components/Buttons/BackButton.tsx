import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { Button } from "./Button"

type BackButtonProps = {
    to: string
    dataCy?: string
}

export const BackButton: React.FC<BackButtonProps> = ({ to, dataCy }) => {
    return (
        <Button dataCy={dataCy} kind="tertiary" to={to} icon={faArrowLeft} className="mb-3 inline-block text-darkgrey">Zurück</Button>
    )
}