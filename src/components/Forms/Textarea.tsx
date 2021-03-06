import { Field, FieldProps } from "formik"
import { FormError } from "../Errors/FormError"

type TextareaProps = {
    /** Gives the input a unique name */
    name: string
    /** Specify the placeholder attribute for the <textarea> */
    placeholder: string
    /** Inform users what the corresponding input fields mean. */
    labelText: string
    /** When set Required * will be seen  */
    labelRequired?: boolean
    /** Provide text that is used alongside the control label for additional help. */
    helperText?: string
    /** Specify the maximum length of the string in <textarea> */
    maxLength?: number
    /** Specify the rows attribute for the <textarea> */
    rows?: number
    /** Enables autofocus */
    autoFocus?: boolean // MC: This is not tested yet!!!!!
}

/**
 * Textarea, can only be used with Formik
 */
export const Textarea: React.FC<TextareaProps> = ({ name, placeholder, labelText, labelRequired = false, helperText, maxLength, rows = 2, autoFocus = false }) => {
    return (
        <div className="mb-4">
            <Field name={name}>{(props: FieldProps<any>) => (
                <>
                    <div className="flex justify-between mb-1">
                        <label className="text-darkgrey text-sm font-semibold" htmlFor={name}>{labelText}{labelRequired && <span className="text-primary-blue ml-1">*</span>}</label>
                        {maxLength && (props.field.value !== null || props.field.value !== undefined) && <span className="text-lightgrey" data-cy={`${name}-character-count`}>{props.field.value.length}/{maxLength}</span>}
                    </div>
                    <div>
                        <textarea data-cy={`textarea-${name}-input`} placeholder={placeholder} autoFocus={autoFocus} {...props.field} rows={rows} className={`font-roboto rounded-lg py-3 px-4 w-full placeholder-placeholder-grey ${props.meta.error && props.meta.touched ? 'bg-danger-red bg-opacity-10 border-2 border-danger-red focus:outline-none focus:border-danger-red focus:ring-danger-red' : 'border border-border-grey'}`}>
                        </textarea>
                    </div>
                    {!(props.meta.error && props.meta.touched) && <p className="text-lightgrey text-sm">{helperText}</p>}
                </>
            )}</Field>
            <FormError dataCy={`textarea-${name}-form-error`} field={name} />
        </div>
    )
}