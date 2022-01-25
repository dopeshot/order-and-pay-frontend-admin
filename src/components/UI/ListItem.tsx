import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { faFolder } from "@fortawesome/free-solid-svg-icons"

type ListItemProps = {
    /** Set to true if element should have background */
    background?: boolean
    /** Set to true if element should be indented */
    indent?: boolean
    /** Title of an List Element is at the left side */
    title: string
    /** Icon at the beginning of the Element */
    icon?: IconProp
}

/**
 * List, should have List as parent
 */
export const ListItem: React.FC<ListItemProps> = ({ title, icon = faFolder, indent, background, children }) => {
    return (
        <div>
            {children}
        </div>
    )
}