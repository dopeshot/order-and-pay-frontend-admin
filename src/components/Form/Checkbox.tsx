import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Field } from "formik"

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
export const Checkbox: React.FC<CheckboxProps> = ({ name, labelText, helperText, options }) => {
    return (
        <>
            <h5 className="block text-darkgrey text-sm font-semibold">{labelText}</h5>
            {options.map((option) => (
                <label data-cy={`${name}-option-${option.id}`} key={option.id} className="block  my-1">
                    <Field type="checkbox" className="mr-1" name={name} value={`${option.id}`} />
                    {option.icon && <FontAwesomeIcon className="text-lightgrey mr-1" icon={option.icon} style={{ minWidth: "20px" }} />}
                    <span className="text-darkgrey text-sm font-semibold">{option.label}</span>
                </label>
            ))}
            <p data-cy={`${name}-helpertext`} className="text-lightgrey font-semibold text-sm mb-4">{helperText}</p>
        </>
    )
}