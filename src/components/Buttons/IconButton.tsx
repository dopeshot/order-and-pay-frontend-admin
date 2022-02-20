import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"

type IconButtonProps = {
    /** icon of the icon button */
    icon: IconProp
    /** optional icon color */
    textColor?: string
    /** link to go when you click button */
    to?: string
    /** function that happens when you click button */
    onClick?: (values: any) => void
    /** Optional can add classes to customize margins for example */
    className?: string
    /** for testing */
    dataCy?: string
}

/**
 * Button only with an icon
 */
export const IconButton: React.FunctionComponent<IconButtonProps> = ({ icon, dataCy, to, onClick, className = "", textColor = "text-darkgrey" }) => {
    return to ?
        <Link to={to} data-cy={dataCy} className={`cursor-pointer hover:bg-gray-300 focus:bg-gray-300 rounded-full w-10 h-10 ${className} flex items-center justify-center`}>
            <FontAwesomeIcon icon={icon} className={textColor} />
        </Link>
        :
        <button data-cy={dataCy} type="button" onClick={onClick} className={`cursor-pointer hover:bg-gray-300 focus:bg-gray-300 rounded-full w-10 h-10 ${className}`}>
            <FontAwesomeIcon icon={icon} className={textColor} />
        </button>
}