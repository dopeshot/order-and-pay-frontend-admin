import { Field, FieldProps, useFormikContext } from "formik";

type ToggleProps = {
    /** Gives the toggle a unique name */
    name: string
    /** Provide label text */
    labelText: string
    /** Specify the label for the "on" position. */
    labelOn: string
    /** Specify the label for the "off" position. */
    labelOff: string
    /** When set Required * will be seen */
    labelRequired?: boolean
    /** Provide text that is used alongside the control label for additional help. */
    helperText?: string
}

/**
 * Toggle, can only be used with Formik
 */
export const Toggle: React.FC<ToggleProps> = ({ name, labelText, labelOn, labelOff, helperText, labelRequired = false }) => {
    const { setFieldValue } = useFormikContext()

    return (
        <>
            <label className="text-darkgrey text-sm font-semibold" htmlFor={name}>{labelText}{labelRequired && <span className="text-primary-blue ml-1">*</span>}</label>
            <Field name={name}>{(props: FieldProps<any>) => (
                <div className="flex items-center">
                    <div data-cy={`${name}-clickdiv`} onClick={() => setFieldValue(name, !props.field.value)} className={`w-14 h-7 flex items-center bg-gray-300 rounded-full p-1 duration-300 ease-in-out my-1 ${props.field.value ? "bg-primary-blue" : ""}`}>
                        <div data-cy={`${name}-ball`} className={`bg-white w-5 h-5 rounded-full shadow-md transform duration-300 ease-in-out ${props.field.value ? "translate-x-7" : ""}`}></div>
                    </div>
                    <p data-cy={`${name}-labeltext`} className="text-darkgrey text-sm font-semibold pl-2">{props.field.value ? labelOn : labelOff}</p>
                </div>
            )}</Field>
            <p data-cy={`${name}-helpertext`} className="text-lightgrey">{helperText}</p>
        </>
    )
}