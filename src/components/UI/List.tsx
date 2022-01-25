type ListProps = {
    /** If it should have lines between elements set to true */
    lines?: boolean
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