import { faCheck, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Field, FieldProps } from "formik";
import { useState } from "react";
import { ComponentOptions } from "../../shared/types/ComponentOptions";
import { FormError } from "../Errors/FormError";

type DropdownProps = {
    /** Gives the dropdown a unique name */
    name: string
    /** Provide label text */
    labelText: string
    /** Text that informs the user what to expect in the list of dropdown options. */
    placeholder: string
    /** A list of options to choose from. */
    options: ComponentOptions[]
    /** When set Required * will be seen */
    labelRequired?: boolean
    /** Provide text that is used for additional help. */
    helperText?: string
}

/**
 * Dropdown, can only be used with Formik
 */
export const Dropdown: React.FC<DropdownProps> = ({ name, labelText, helperText, placeholder, options, labelRequired = false }) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="mb-4">
            <label className="block text-darkgrey text-sm font-semibold mb-1" htmlFor={name}>{labelText}{labelRequired && <span className="text-primary-blue ml-1">*</span>}</label>
            <Field name={name}>{(props: FieldProps<any>) => (
                <div className="relative mb-1">
                    {/* When dropdown open click outside close it */}
                    {isOpen && <div className="fixed cursor-pointer inset-0 h-full w-full z-10" aria-hidden="true" onClick={() => setIsOpen(false)}></div>}

                    <button data-cy={`${name}-dropdown-button`} className={`relative flex items-center justify-between rounded-lg mr-5 sm:mb-0 py-2 px-5 w-full ${props.meta.error && props.meta.touched ? "text-danger-red bg-danger-red bg-opacity-10 border-2 border-danger-red focus:outline-none focus:border-danger-red focus:ring-danger-red" : "border border-border-grey bg-white"} ${!props.field.value ? "text-lightgrey" : "text-darkgrey"}`} type="button" onClick={() => setIsOpen(!isOpen)}>
                        {props.field.value !== "" ? <span className="text-darkgrey truncate">{options.find(option => option.id === props.field.value)?.label}</span> : <span className={`${props.meta.error && props.meta.touched ? "text-lightgrey" : ""}`}>{placeholder}</span>}
                        <FontAwesomeIcon className={`ml-6 transform-gpu transition-transform duration-200 ease-linear ${isOpen ? "-rotate-180" : "rotate-0"}`} icon={faChevronDown} />
                    </button>

                    {isOpen && <div data-cy={`${name}-dropdown-menu`} className="absolute bg-white rounded-lg shadow-dropdown z-10 w-full py-2" tabIndex={-1}>
                        {options.map(option => (
                            <button key={option.id} data-cy={`${name}-dropdown-option-${option.id}`} type="button" onClick={() => {
                                props.form.setFieldValue(props.field.name, option.id)
                                setIsOpen(false)
                            }} className={`flex items-center w-full px-5 py-2 ${props.field.value === option.id ? `bg-primary-blue text-white ${option.icon ? "" : "justify-between"}` : "text-darkgrey hover:bg-white-lightgrey"}`} tabIndex={-1}>
                                {option.icon && <FontAwesomeIcon className="mr-1" icon={option.icon} style={{ minWidth: "20px" }} />}
                                <span className="truncate pr-1">{option.label}</span>
                                {props.field.value === option.id ? <FontAwesomeIcon className="ml-auto" icon={faCheck} /> : <></>}
                            </button>
                        ))}
                    </div>}
                    {!(props.meta.error && props.meta.touched) && <p data-cy={`${name}-helpertext`} className="text-lightgrey text-sm font-semibold mt-1">{helperText}</p>}
                </div>
            )}</Field>
            <FormError field={name} />
        </div>
    )
}