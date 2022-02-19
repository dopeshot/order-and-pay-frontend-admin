import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Field, FieldProps } from "formik"
import { HTMLInputTypeAttribute } from "react"
import { FormError } from "../Errors/FormError"

type TextInputProps = {
    /** Gives the input a unique name */
    name: string
    /** Hints at what goes into a field. */
    placeholder: string
    /** Inform users what the corresponding input fields mean. */
    labelText: string
    /** When set Required * will be seen  */
    labelRequired?: boolean
    /** Provides assistance on how to fill out a field. Helper text is optional. */
    helperText?: string
    /** Icon at the end of the input */
    icon?: IconProp
    /** Input type for example text or email */
    type?: HTMLInputTypeAttribute
    /** Enables autofocus */
    autoFocus?: boolean // MC: This is not tested yet!!!!!
    /** Autocomplete */
    autocomplete?: string
}

/**
 * Text Input, can only be used with Formik
 */
export const TextInput: React.FC<TextInputProps> = ({ name, placeholder, labelText, labelRequired = false, helperText, icon, type = "text", autoFocus = false, autocomplete = "off" }) => {
    return (
        <div className="mb-4">
            <label className="text-darkgrey text-sm font-semibold" htmlFor={name}>{labelText}{labelRequired && <span className="text-primary-blue ml-1">*</span>}</label>
            <Field type={type} name={name}>{(props: FieldProps<any>) => (
                <>
                    <div className="relative flex flex-col justify-center my-1">
                        {icon && <FontAwesomeIcon icon={icon} className={`absolute right-6 ${props.meta.error && props.meta.touched ? "" : "text-darkgrey"}`} />}
                        <input data-cy={`textinput-${name}-input`} autoComplete={autocomplete} type={type} placeholder={placeholder} autoFocus={autoFocus} {...props.field} className={`font-roboto rounded-xl pl-4 py-2 ${icon ? "pr-10" : ""} ${props.meta.error && props.meta.touched ? 'bg-danger-red bg-opacity-10 border-2 border-danger-red focus:outline-none focus:border-danger-red focus:ring-danger-red' : 'border border-border-grey'}`} />
                    </div>
                    {!(props.meta.error && props.meta.touched) && <p className="text-lightgrey text-sm font-semibold">{helperText}</p>}
                </>
            )}</Field>
            <FormError dataCy={`textinput-${name}-form-error`} field={name} />
        </div>
    )
}