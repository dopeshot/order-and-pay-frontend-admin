import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

type ButtonProps = {
    icon: IconProp
    dataCy?: string
    content?: string
    type: any
    onClick?: (values: any) => void
}

export const PrimaryButton: React.FunctionComponent<ButtonProps> = (props) => {
    return (
        <button data-cy={props.dataCy} type={props.type} onClick={props.onClick} className="group bg-primary-blue hover:bg-primary-blue-hover focus:shadow-focus text-white font-semibold border border-transparent rounded-xl py-2 px-8">
            <FontAwesomeIcon icon={props.icon} className="group-hover:text-primary-blue-hover-icon text-sm mr-3" />
            {props.children}
        </button>
    )
}