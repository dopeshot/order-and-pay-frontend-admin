import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

type IconButtonProps = {
    icon: IconProp,
    textColor?: string,
    dataCy?: string,
    onClick: (values: any) => void
    className?: string
}

export const IconButton: React.FunctionComponent<IconButtonProps> = (props) => {
    return (
        <button data-cy={props.dataCy} type="button" onClick={props.onClick} className={`cursor-pointer hover:bg-gray-200 focus:bg-gray-200 rounded-full w-10 h-10 ${props.className ? props.className : ""}`}>
            <FontAwesomeIcon icon={props.icon} className={props.textColor ?? `text-darkgrey`} />
        </button>
    )
}