import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { Field, FieldProps } from "formik"
import { FormError } from "../Errors/FormError"

type CheckboxProps = {
    /** Gives the input a unique name */
    name: string
    /** Inform users what the corresponding input fields mean. */
    labelText: string
    /** Provides assistance on how to fill out a field. Helper text is optional. */
    helperText?: string
    /** A list of options to choose from. */
    options: {
        id: number
        label: string
        icon?: IconProp
    }[]
}

/**
 * Checkbox, can only be used with Formik
 */
export const Checkbox: React.FC<CheckboxProps> = ({ name, labelText, helperText }) => {
    return (
        <>
            <label className="text-darkgrey text-sm font-semibold" htmlFor={name}>{labelText}</label>
            <Field name={name}>{(props: FieldProps<any>) => (
                <>
                    {!(props.meta.error && props.meta.touched) && <p className="text-lightgrey">{helperText}</p>}
                </>
            )}</Field>
            <FormError field={name} />
        </>
    )
}