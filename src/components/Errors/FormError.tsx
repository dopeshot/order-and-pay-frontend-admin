import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ErrorMessage } from "formik"

export type FormErrorProps = {
    /** unique name of formik field */
    field: string
    /** for testing */
    dataCy?: string
}

/**
 * Errormessage for inputs, can only be used with formik
 */
export const FormError: React.FunctionComponent<FormErrorProps> = (props) => {
    return (
        <ErrorMessage name={props.field} >
            {errorMessage => <div data-cy={props.dataCy} className="flex items-center text-danger-red">
                <FontAwesomeIcon icon={faExclamationCircle} className="mr-2" />
                <span className="text-sm font-semibold">{errorMessage}</span>
            </div>}
        </ErrorMessage>
    )
}