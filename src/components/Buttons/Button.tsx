import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"

export type ButtonProps = {
    /** Which type of button we want, tertiary is a link */
    kind?: "primary" | "secondary" | "tertiary"
    /** Optional icon before the text */
    icon?: IconProp
    /** Optional can add classes to customize margins for example */
    className?: string
    /** Optional disabled state when set to true button is disabled */
    disabled?: boolean
    /** Optional loading state when set to true button is loading */
    loading?: boolean
    /** button type default is "button" */
    type?: "button" | "reset" | "submit"
    /** function that happens when you click button */
    onClick?: (values: any) => void
    /** link to go when you click button */
    to?: string
    /** for testing */
    dataCy?: string
}

/**
 *  Button component, can also be a link when kind tertiary
 */
export const Button: React.FC<ButtonProps> = ({ kind = "primary", icon, disabled, loading, dataCy, className, children, to, onClick, type = "button" }) => {
    disabled = loading ? true : disabled

    return (<>
        {kind === "tertiary" ?
            to ?
                <Link data-cy={dataCy} to={disabled ? "#" : to} className={`text-primary-blue font-semibold ${disabled ? "text-opacity-60 cursor-default" : "hover:text-primary-blue-hover"} ${className}`}>
                    {icon && <FontAwesomeIcon icon={loading ? faSpinner : icon} className={`text-sm mr-3 ${loading ? "animate-spin" : ""}`} />}
                    {children}
                </Link>
                :
                <button data-cy={dataCy} onClick={disabled ? () => "" : onClick} type={type} className={`text-primary-blue font-semibold ${disabled ? "text-opacity-60 cursor-default" : "hover:text-primary-blue-hover"} ${className}`}>
                    {icon && <FontAwesomeIcon icon={loading ? faSpinner : icon} className={`text-sm mr-3 ${loading ? "animate-spin" : ""}`} />}
                    {children}
                </button>
            :
            to ?
                <Link data-cy={dataCy} to={disabled ? "#" : to} className={`block text-center font-semibold border border-transparent rounded-xl py-2 px-8 w-full md:w-auto ${kind === "primary" ? `group bg-primary-blue text-white ${disabled ? "text-opacity-75 opacity-80 cursor-default" : "hover:bg-primary-blue-hover"}` : `bg-secondary-blue text-primary-blue-hover ${disabled ? "text-opacity-75 opacity-80 cursor-default" : "hover:bg-secondary-blue-hover"}`} ${className}`}>
                    {icon && <FontAwesomeIcon icon={loading ? faSpinner : icon} className={`text-sm mr-3 ${disabled ? "" : "group-hover:text-primary-blue-hover-icon"} ${loading ? "animate-spin" : ""}`} />}
                    {children}
                </Link>
                :
                <button data-cy={dataCy} onClick={disabled ? () => "" : onClick} type={type} className={`font-semibold border border-transparent rounded-xl py-2 px-8 w-full md:w-auto ${kind === "primary" ? `group bg-primary-blue text-white ${disabled ? "text-opacity-75 opacity-80 cursor-default" : "hover:bg-primary-blue-hover"}` : `bg-secondary-blue text-primary-blue-hover ${disabled ? "text-opacity-75 opacity-80 cursor-default" : "hover:bg-secondary-blue-hover"}`} ${className}`}>
                    {icon && <FontAwesomeIcon icon={loading ? faSpinner : icon} className={`text-sm mr-3 ${disabled ? "" : "group-hover:text-primary-blue-hover-icon"} ${loading ? "animate-spin" : ""}`} />}
                    {children}
                </button>
        }</>)
}