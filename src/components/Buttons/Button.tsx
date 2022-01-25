import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"

export type ButtonProps = {
    kind?: "primary" | "secondary"
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
        {
            to ?
                <Link to={to} className={`block text-center font-semibold border border-transparent rounded-xl py-2 px-8 w-full ${kind === "primary" ? `group bg-primary-blue text-white ${disabled ? "text-opacity-75 opacity-80 cursor-default" : "hover:bg-primary-blue-hover focus:shadow-focus"}` : `bg-secondary-blue text-primary-blue-hover ${disabled ? "text-opacity-75 opacity-80 cursor-default" : "hover:bg-secondary-blue-hover"}`} ${className}`}>
                    {icon && <FontAwesomeIcon icon={loading ? faSpinner : icon} className={`group-hover:text-primary-blue-hover-icon text-sm mr-3 ${loading ? "animate-spin" : ""}`} />}
                    {children}
                </Link>
                :
                <button data-cy={dataCy} onClick={onClick} type={type ?? "button"} className={`font-semibold border border-transparent rounded-xl py-2 px-8 w-full ${kind === "primary" ? `group bg-primary-blue text-white ${disabled ? "text-opacity-75 opacity-80 cursor-default" : "hover:bg-primary-blue-hover focus:shadow-focus"}` : `bg-secondary-blue text-primary-blue-hover ${disabled ? "text-opacity-75 opacity-80 cursor-default" : "hover:bg-secondary-blue-hover"}`} ${className}`}>
                    {icon && <FontAwesomeIcon icon={loading ? faSpinner : icon} className={`group-hover:text-primary-blue-hover-icon text-sm mr-3 ${loading ? "animate-spin" : ""}`} />}
                    {children}
                </button>
        }</div>)
}

// {'to' in props ?
// <Link data-cy={props.dataCy} aria-disabled={props.disabled} to={props.disabled || props.loading ? "#" : props.to} className={`flex justify-center items-center text-dark-800 ${props.disabled || props.loading ? "cursor-default bg-light-700" : "bg-light-500 transition hover:-translate-y-1 cursor-pointer focus:shadow-focus"} rounded-lg py-3 ${props.className ? props.className : ""}`}>
//     {props.Icon && (props.loading ? <RefreshIcon className="animate-spin w-5 h-5 mr-3" /> : <props.Icon className="w-5 h-5 mr-3" />)}
//     <span className="font-bold">{props.children}</span>
// </Link> :
// <button data-cy={props.dataCy} type={props.type} disabled={props.disabled || props.loading ? true : false} onClick={props.onClick} onMouseDown={(event: React.MouseEvent) => handleMouseDown(event)} className={`flex justify-center items-center text-dark-800 ${props.disabled || props.loading ? "cursor-default bg-light-700" : "bg-light-500 transition hover:-translate-y-1 cursor-pointer focus:shadow-focus"} rounded-lg py-3 ${props.className ? props.className : ""}`}>
//     {props.Icon && (props.loading ? <RefreshIcon className="animate-spin w-5 h-5 mr-3" /> : <props.Icon className="w-5 h-5 mr-3" />)}
//     <span className="text-dark-800 font-bold">{props.children}</span>
// </button>}
//     )