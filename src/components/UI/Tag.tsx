
export const enum TagTypesEnum {
    red = 'red-500',
    purple = "indigo-500",
    pink = "pink-500",
    lightblue = "primary-blue-hover-icon",
    blue = "primary-blue",
    green = "green-500",
    yellow = "yellow-500",
    lightgrey = "lightgrey",
    darkgrey = "darkgrey",
    dark = "gray-900",
}

type TextareaProps = {
    /** Is in the header of the modal, the title */
    title: string
    /** Is in the header of the modal, the subtitle. This is optional */
    type?: TagTypesEnum
}

/**
 * Tag
 */
export const Tag: React.FC<TextareaProps> = ({ title, type = TagTypesEnum.blue }) => {
    return (
        <div className={`inline-block bg-${type} bg-opacity-20 rounded-full px-3 ml-2`}>
            <p className={`text-${type} text-sm font-semibold`}>{title}</p>
        </div>
    )
}