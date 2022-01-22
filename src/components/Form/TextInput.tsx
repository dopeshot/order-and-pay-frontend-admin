import { Field } from "formik"
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
    icon?: string
    /** Input type for example text or email */
    type?: HTMLInputTypeAttribute
}

/**
 * Text Input, can only be used with Formik
 */
export const TextInput: React.FC<TextInputProps> = ({ name, placeholder, labelText, labelRequired = false, helperText, icon, type = "text" }) => {
    return (
        <>
            <label className="block text-darkgrey text-sm font-semibold pb-2" htmlFor="tablenumber">{labelText}</label>
            <Field type={type} name={name}>{(props: any) => (
                <>
                    <input type="text" placeholder={placeholder} {...props.field} className={`font-roboto rounded-xl w-full pl-4 py-2 sm:w-1/2 ${props.meta.error && props.meta.touched ? 'bg-danger-red bg-opacity-10 border-2 border-danger-red mb-2 focus:outline-none focus:border-danger-red focus:ring-danger-red' : 'border border-border-grey mb-2'}`} />
                    {!(props.meta.error && props.meta.touched) && <p className="text-lightgrey">{helperText}</p>}
                </>
            )}</Field>
            <FormError dataCy="table-modal-tablenumber-input-error" field={name} />
        </>
    )
}