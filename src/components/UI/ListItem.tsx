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
    /** Content on the left side next to title */
    header?: React.ReactChild
    /** Link to when click element */
    to?: string
    /** Function what happens when you click element */
    onClick?: (values: any) => void
}

/**
 * List, should have List as parent
 */
export const ListItem: React.FC<ListItemProps> = ({ title, icon = faFolder, indent, background, header, children, to, onClick }) => {

    // Elements on the left side of the item
    const headerContent = <>
        <FontAwesomeIcon icon={icon} className="text-lightgrey mr-4" />
        <h4 className="text-lg text-headline-black font-semibold mr-4">{title}</h4>
        {header}
    </>

    const headerClasses = `flex items-baseline py-4 pl-7 ${indent ? "pl-16" : ""} flex-grow`

    return <div className={`flex rounded-lg w-full cursor-pointer ${background ? "bg-white-lightgrey hover:bg-gray-200" : "hover:bg-white-lightgrey"}`}>
        {to ?
            <Link to={to} className={headerClasses}>
                {headerContent}
            </Link>
            :
            <button type="button" onClick={onClick} className={headerClasses}>
                {headerContent}
            </button>
        }
        {children && <div className="flex items-center mx-4">
            {children}
        </div>}
    </div>
}