import { Field } from "formik"
import { HTMLInputTypeAttribute } from "react"
import { FormError } from "../Errors/FormError"

type TextInputProps = {
    name: string
    placeholder: string
    labelText: string
    labelRequired?: boolean
    helperText?: string
    icon?: string
    type?: HTMLInputTypeAttribute
}

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