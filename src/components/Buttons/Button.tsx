import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"

export type ButtonProps = {
    kind?: "primary" | "secondary" | "tertiary"
    icon?: IconProp
    className?: string
    disabled?: boolean
    dataCy?: string
    loading?: boolean
    type?: "button" | "reset" | "submit"
    onClick?: (values: any) => void
    to?: string
}

export const Button: React.FC<ButtonProps> = ({ kind = "primary", icon, disabled, loading, dataCy, className, children, to, onClick, type = "button" }) => {
    return (<div className="mb-4">
        {kind === "tertiary" ?
            to ?
                <Link to={disabled ? "#" : to} className={`text-primary-blue font-semibold ${disabled ? "text-opacity-60 cursor-default" : "hover:text-primary-blue-hover"} ${className}`}>
                    {icon && <FontAwesomeIcon icon={loading ? faSpinner : icon} className={`text-sm mr-3 ${loading ? "animate-spin" : ""}`} />}
                    {children}
                </Link>
                :
                <button data-cy={dataCy} onClick={disabled ? () => "" : onClick} type={type ?? "button"} className={`text-primary-blue font-semibold ${disabled ? "text-opacity-60 cursor-default" : "hover:text-primary-blue-hover"} ${className}`}>
                    {icon && <FontAwesomeIcon icon={loading ? faSpinner : icon} className={`group-hover:text-primary-blue-hover-icon text-sm mr-3 ${loading ? "animate-spin" : ""}`} />}
                    {children}
                </button>
            :
            to ?
                <Link to={disabled ? "#" : to} className={`block text-center font-semibold border border-transparent rounded-xl py-2 px-8 w-full ${kind === "primary" ? `group bg-primary-blue text-white ${disabled ? "text-opacity-75 opacity-80 cursor-default" : "hover:bg-primary-blue-hover focus:shadow-focus"}` : `bg-secondary-blue text-primary-blue-hover ${disabled ? "text-opacity-75 opacity-80 cursor-default" : "hover:bg-secondary-blue-hover"}`} ${className}`}>
                    {icon && <FontAwesomeIcon icon={loading ? faSpinner : icon} className={`group-hover:text-primary-blue-hover-icon text-sm mr-3 ${loading ? "animate-spin" : ""}`} />}
                    {children}
                </Link>
                :
                <button data-cy={dataCy} onClick={disabled ? () => "" : onClick} type={type ?? "button"} className={`font-semibold border border-transparent rounded-xl py-2 px-8 w-full ${kind === "primary" ? `group bg-primary-blue text-white ${disabled ? "text-opacity-75 opacity-80 cursor-default" : "hover:bg-primary-blue-hover focus:shadow-focus"}` : `bg-secondary-blue text-primary-blue-hover ${disabled ? "text-opacity-75 opacity-80 cursor-default" : "hover:bg-secondary-blue-hover"}`} ${className}`}>
                    {icon && <FontAwesomeIcon icon={loading ? faSpinner : icon} className={`group-hover:text-primary-blue-hover-icon text-sm mr-3 ${loading ? "animate-spin" : ""}`} />}
                    {children}
                </button>
        }</div>)
}