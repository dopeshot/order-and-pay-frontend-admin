
export enum ChipTypesEnum {
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

type ChipProps = {
    /** the tag of the chip */
    title: string
    /** makes the color and background color of the chip */
    type?: ChipTypesEnum
}

/**
 * Chip
 */
export const Chip: React.FC<ChipProps> = ({ title, type = ChipTypesEnum.blue }) => {
    return (
        <div className={`inline-block bg-${type} bg-opacity-20 rounded-full px-3 mr-2`} data-cy="tag-box">
            <p className={`text-${type} text-sm font-semibold`} data-cy="tag-title">{title}</p>
        </div>
    )
}