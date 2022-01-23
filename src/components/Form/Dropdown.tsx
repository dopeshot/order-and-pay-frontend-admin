import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Field, FieldProps } from "formik";
import { useState } from "react";

type DropdownProps = {
    /** Gives the toggle a unique name */
    name: string
    /** Provide label text */
    labelText: string
    /** Text that informs the user what to expect in the list of dropdown options. */
    placeholder: string
    /** A list of options to choose from. */
    options: {
        id: number
        label: string
        icon: IconProp
    }[]
    /** When set Required * will be seen */
    labelRequired?: boolean
    /** Provide text that is used alongside the control label for additional help. */
    helperText?: string
}

/**
 * Dropdown, can only be used with Formik
 */
export const Dropdown: React.FC<DropdownProps> = ({ name, labelText, helperText, placeholder, options, labelRequired = false }) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <label className="block text-darkgrey text-sm font-semibold mb-1" htmlFor={name}>{labelText}{labelRequired && <span className="text-primary-blue ml-1">*</span>}</label>
            <Field name={name}>{(props: FieldProps<any>) => (
                <div className="relative text-lightgrey">
                    {/* When dropdown open click outside close it */}
                    {isOpen && <div className="fixed cursor-pointer inset-0 h-full w-full z-10" aria-hidden="true" onClick={() => setIsOpen(false)}></div>}

                    <button className="relative flex items-center justify-between border rounded-lg bg-white mr-5 mb-3 z-30 sm:mb-0 py-2 px-5 w-full" type="button" onClick={() => setIsOpen(!isOpen)}>
                        {props.field.value ? options.find(option => option.label === props.field.value)?.label : placeholder}
                        <FontAwesomeIcon className={`ml-6 transform-gpu transition-transform duration-200 ease-linear ${isOpen ? "-rotate-180" : "rotate-0"}`} icon={faChevronDown} />
                    </button>

                    {isOpen && <div className="absolute bg-white rounded-lg shadow z-20 w-full py-2" tabIndex={-1}>
                        {options.map(option => (
                            <button key={option.label} onClick={() => props.form.setFieldValue(props.field.name, option.label)} className={`flex text-darkgrey hover:bg-white-lightgrey focus:hover:text-gray-500 text-sm w-full px-4 py-2`} tabIndex={-1}>
                                {option.label}
                            </button>
                        ))}
                    </div>}
                </div>
            )}</Field>
            <p data-cy={`${name}-helpertext`} className="text-lightgrey">{helperText}</p>
        </>
    )
}