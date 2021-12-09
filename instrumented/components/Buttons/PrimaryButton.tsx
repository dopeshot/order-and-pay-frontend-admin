import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

type ButtonProps = {
    id?: string,
    icon: IconProp,
    content: string,
    type: any,
    onClick: (values: any) => void
}

export const PrimaryButton: React.FunctionComponent<ButtonProps> = (props) => {
    return (
        <button id={props.id} type={props.type} onClick={props.onClick} className="group bg-primary-blue hover:bg-primary-blue-hover focus:shadow-focus text-white font-semibold border border-transparent rounded-xl py-2 px-8">
            <FontAwesomeIcon icon={props.icon} className="group-hover:text-primary-blue-hover-icon text-sm mr-3" />
            {props.content}
        </button>
    )
}