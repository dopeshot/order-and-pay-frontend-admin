import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

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
    return (<>
        {
            to ?
                <button data-cy={dataCy} className={`${kind === "primary" ? "group bg-primary-blue hover:bg-primary-blue-hover focus:shadow-focus text-white font-semibold border border-transparent rounded-xl py-2 px-8" : ""} ${kind === "secondary" ? "text-primary-blue hover:text-primary-blue-hover focus:text-primary-blue-hover font-semibold mt-2 py-2 sm:mt-0 sm:py-0" : ""} ${disabled && kind === "primary" ? "text-opacity-75 opacity-80" : ""} ${className}`}>
                    {icon && <FontAwesomeIcon icon={loading ? faSpinner : icon} className={`group-hover:text-primary-blue-hover-icon text-sm mr-3 ${loading ? "animate-spin" : ""}`} />}
                    {children}
                </button>
                :
                <button data-cy={dataCy} type={type} onClick={onClick} className={`${kind === "primary" ? "group bg-primary-blue hover:bg-primary-blue-hover focus:shadow-focus text-white font-semibold border border-transparent rounded-xl py-2 px-8" : ""} ${kind === "secondary" ? "text-primary-blue hover:text-primary-blue-hover focus:text-primary-blue-hover font-semibold mt-2 py-2 sm:mt-0 sm:py-0" : ""} ${disabled && kind === "primary" ? "text-opacity-75 opacity-80" : ""} ${className}`}>
                    {icon && <FontAwesomeIcon icon={loading ? faSpinner : icon} className={`group-hover:text-primary-blue-hover-icon text-sm mr-3 ${loading ? "animate-spin" : ""}`} />}
                    {children}
                </button>
        }</>)
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