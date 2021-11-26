import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

type IconButtonProps = {
    icon: IconProp,
    textColor: string
    onClick: (values: any) => void
}

export const IconButton: React.FunctionComponent<IconButtonProps> = (props) => {
    return (
        <button type="button" onClick={props.onClick} className="cursor-pointer hover:bg-gray-200 focus:bg-gray-200 rounded-full w-10 h-10 mr-2 md:mr-4">
            <FontAwesomeIcon icon={props.icon} className={props.textColor} />
        </button>
    )
}