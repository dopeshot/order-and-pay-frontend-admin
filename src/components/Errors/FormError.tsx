import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ErrorMessage } from "formik"

export type FormErrorProps = {
    field: string
}

export const FormError: React.FunctionComponent<FormErrorProps> = (props) => {

    return (
        <ErrorMessage name={props.field} >
            {errorMessage => <div className="flex items-center text-danger-red mb-5 ">
                <FontAwesomeIcon icon={faExclamationCircle} className="mr-2" />
                <span className="text-sm font-semibold">{errorMessage}</span>
            </div>}
        </ErrorMessage>
    )
}