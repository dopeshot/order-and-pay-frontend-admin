import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Field, FieldProps } from "formik";
import { useState } from "react";
import { FormError } from "../Errors/FormError";

export const PasswordInput: React.FC = () => {

    const [showPassword, setShowPassword] = useState(false)

    return (
        <div className="mb-4">
            <label className="text-darkgrey text-sm font-semibold" htmlFor="password">Password</label>
            <Field type="password" name="password">{(props: FieldProps<any>) => (
                <>
                    <div className="relative flex flex-col justify-center my-1">
                        <button data-cy="password-eye-button" type="button" onMouseDown={event => event.preventDefault()} onClick={() => setShowPassword(!showPassword)} className="absolute right-4">
                            {showPassword ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />}
                        </button>
                        <input data-cy={`password-input`} type={showPassword ? "text" : "password"} placeholder="Password" autoComplete="password" {...props.field} className={`font-roboto rounded-xl pl-4 pr-10 py-2 ${props.meta.error && props.meta.touched ? 'bg-danger-red bg-opacity-10 border-2 border-danger-red focus:outline-none focus:border-danger-red focus:ring-danger-red' : 'border border-border-grey'}`} />
                    </div>
                </>
            )}</Field>
            <FormError dataCy={`password-input-form-error`} field="password" />
        </div>
    )
}