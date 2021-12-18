import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

type ButtonProps = {
    icon?: IconProp
    dataCy?: string
    type: "button" | "submit" | "reset" | undefined
    buttonType: "primary" | "secondary"
    onClick?: (values: any) => void
    disabled?: boolean
    loading?: boolean
}

export const Button: React.FunctionComponent<ButtonProps> = (props) => {
    return (
        <button data-cy={props.dataCy} type={props.type} onClick={props.onClick} className={`${props.buttonType === "primary" ? "group bg-primary-blue hover:bg-primary-blue-hover focus:shadow-focus text-white font-semibold border border-transparent rounded-xl py-2 px-8" : ""} ${props.buttonType === "secondary" ? "text-primary-blue hover:text-primary-blue-hover focus:text-primary-blue-hover font-semibold mt-2 py-2 sm:mt-0 sm:py-0" : ""} ${props.disabled && props.buttonType === "primary" ? "text-opacity-75 opacity-80" : ""}`}>
            {props.icon && <FontAwesomeIcon icon={props.loading ? faSpinner : props.icon} className={`group-hover:text-primary-blue-hover-icon text-sm mr-3 ${props.loading ? "animate-spin" : ""}`} />}
            {props.children}
        </button>
    )
}