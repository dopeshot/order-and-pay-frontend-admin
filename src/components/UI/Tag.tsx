
export enum TagTypesEnum {
    red = 'red-600',
    purple = "indigo-500",
    pink = "pink-500",
    lightblue = "primary-blue-hover-icon",
    blue = "primary-blue",
    green = "emerald-500",
    yellow = "amber-500",
    lightgrey = "lightgrey",
    darkgrey = "darkgrey",
    dark = "gray-900",
}

type TagProps = {
    /** Is in the header of the modal, the title */
    title: string
    /** Is in the header of the modal, the subtitle. This is optional */
    type?: TagTypesEnum
}

/**
 * Tag
 */
export const Tag: React.FC<TagProps> = ({ title, type = TagTypesEnum.blue }) => {
    return (
        <div className={`inline-block bg-${type} bg-opacity-20 rounded-full px-3 mr-2`} data-cy="tag-box">
            <p className={`text-${type} text-sm font-semibold`} data-cy="tag-title">{title}</p>
        </div>
    )
}