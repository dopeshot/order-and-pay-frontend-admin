import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

type ButtonProps = {
    icon: IconProp
    dataCy?: string
    type: any
    onClick?: (values: any) => void
    disabled?: boolean
}

export const DisabledButton: React.FunctionComponent<ButtonProps> = (props) => {
    return (
        <button data-cy={props.dataCy} type={props.type} onClick={props.onClick} className="group bg-primary-blue text-white text-opacity-75 opacity-80 font-semibold border border-transparent rounded-xl py-2 px-8">
            <FontAwesomeIcon icon={props.icon} className="text-sm mr-3" />
            {props.children}
        </button>
    )
}