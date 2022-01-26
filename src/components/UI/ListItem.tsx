import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { faFolder } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"

type ListItemProps = {
    /** Set to true if element should have background */
    background?: boolean
    /** Set to true if element should be indented */
    indent?: boolean
    /** Title of an List Element is at the left side */
    title: string
    /** Icon at the beginning of the Element */
    icon?: IconProp
    /** Link to when click element */
    to?: string
    /** Function what happens when you click element */
    onClick?: (values: any) => void
}

/**
 * List, should have List as parent
 */
export const ListItem: React.FC<ListItemProps> = ({ title, icon = faFolder, indent, background, children, to, onClick }) => {
    return (
        <>
            {to ?
                <Link to={to} className={`flex items-center py-4 pl-7 rounded-lg ${background ? "bg-white-lightgrey hover:bg-gray-200" : "hover:bg-white-lightgrey "} ${indent ? "pl-16" : ""}`}>
                    <FontAwesomeIcon icon={icon} className="text-lightgrey mr-4" />
                    <h4 className="text-lg text-headline-black font-semibold">{title}</h4>
                    {children}
                </Link>
                :
                <div onClick={onClick} className={`flex items-center py-4 pl-7 rounded-lg w-full cursor-pointer ${background ? "bg-white-lightgrey hover:bg-gray-200" : "hover:bg-white-lightgrey"} ${indent ? "pl-16" : ""}`}>
                    <FontAwesomeIcon icon={icon} className="text-lightgrey mr-4" />
                    <h4 className="text-lg text-headline-black font-semibold">{title}</h4>
                    {children}
                </div>
            }
        </>
    )
}