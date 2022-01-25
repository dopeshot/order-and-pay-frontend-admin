import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

type IconButtonProps = {
    icon: IconProp,
    textColor?: string,
    dataCy?: string,
    onClick: (values: any) => void
    className?: string
}

export const IconButton: React.FunctionComponent<IconButtonProps> = ({ icon, dataCy, onClick, className = "", textColor = "text-darkgrey" }) => {
    return (
        <button data-cy={dataCy} type="button" onClick={onClick} className={`cursor-pointer hover:bg-gray-200 focus:bg-gray-200 rounded-full w-10 h-10 ${className}`}>
            <FontAwesomeIcon icon={icon} className={textColor} />
        </button>
    )
}