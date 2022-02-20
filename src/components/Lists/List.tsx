import { ListItem } from './ListItem'

type ListProps = {
    /** If it should have lines between elements set to true */
    lines?: boolean
    children: React.ReactElement<typeof ListItem>[] | React.ReactElement<typeof ListItem> // This is not forcing it https://stackoverflow.com/questions/44475309/how-do-i-restrict-the-type-of-react-children-in-typescript-using-the-newly-adde
}

/**
 * List, should have Listitems as childs
 */
export const List: React.FC<ListProps> = ({ lines, children }) => {
    return (
        <div className={`${lines ? "lines-list" : ""} mb-4`}>
            {children}
        </div>
    )
}