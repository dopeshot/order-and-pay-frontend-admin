import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ErrorMessage } from "formik"

export type FormErrorProps = {
    field: string
}

export const FormError: React.FunctionComponent<FormErrorProps> = (props) => {
    return (
        <div className="flex items-center text-danger-red mb-5">
            <FontAwesomeIcon icon={faExclamationCircle} className="mr-2" />
            <ErrorMessage name={props.field} component="span" className="text-sm font-semibold" />
        </div>
    )
}