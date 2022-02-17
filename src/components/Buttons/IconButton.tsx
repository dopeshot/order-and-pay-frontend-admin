import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"

type IconButtonProps = {
    icon: IconProp,
    textColor?: string,
    dataCy?: string,
    to?: string
    onClick?: (values: any) => void
    className?: string
}

export const IconButton: React.FunctionComponent<IconButtonProps> = ({ icon, dataCy, to, onClick, className = "", textColor = "text-darkgrey" }) => {
    return to ?
        <Link to={to} data-cy={dataCy} className={`cursor-pointer hover:bg-gray-300 focus:bg-gray-200 rounded-full w-10 h-10 ${className} flex items-center justify-center`}>
            <FontAwesomeIcon icon={icon} className={textColor} />
        </Link>
        :
        <button data-cy={dataCy} type="button" onClick={onClick} className={`cursor-pointer hover:bg-gray-300 focus:bg-gray-200 rounded-full w-10 h-10 ${className}`}>
            <FontAwesomeIcon icon={icon} className={textColor} />
        </button>
}