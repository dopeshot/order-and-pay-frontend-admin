import { faCheck } from "@fortawesome/free-solid-svg-icons"
import { Form, Formik } from "formik"
import React, { useState } from "react"
import * as yup from 'yup'
import { useActions, useAppState } from "../../overmind"
import { Button } from "../Buttons/Button"
import { ErrorBanner } from "../Errors/ErrorBanner"
import { TextInput } from "../Form/TextInput"
import { Modal } from "../UI/Modal"

type TableModalProps = {
    /** Modal State */
    modalOpen: boolean,
    /** Modal State Setter */
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

/**
 * Modal for adding new Tables, with Table Add Logic
 */
export const AddTableModal: React.FunctionComponent<TableModalProps> = (props) => {
    // Local Variables
    const capacityTemplates = [2, 4, 6]

    // Local State
    const [isLoadingButton, setIsLoadingButton] = useState(false)

    // Global State
    const { modalErrors, hasModalError } = useAppState().tables
    const { createTable } = useActions().tables

    // Formik
    const initialValues = {
        tableNumber: "",
        capacity: ""
    }

    // Formik validation
    const addTableSchema = yup.object().shape({
        tableNumber: yup.string().required("Table number must be defined").min(1, "Table number must be at least 1 letter long").max(8, "Table number cannot be greater than 8 letters"),
        capacity: yup.number().required("Capacity must be defined").min(1, "Capacity must be greater than 1").max(100, "Capacity cannot be greater than 100")
    })

    // Formik Submit
    const submitForm = (values: any) => {
        setIsLoadingButton(true)
        createTable({
            ...values,
            setDisplayModal: props.setModalOpen,
            setIsLoadingButton
        })
    }

    return (
        <Modal dataCy="table-modal" modalHeading="Neuer Tisch" open={props.modalOpen} onDissmis={() => props.setModalOpen(false)}>
            <Formik initialValues={initialValues} validationSchema={addTableSchema} onSubmit={submitForm}>
                {({ setFieldValue, values, dirty, isValid }) => (
                    <Form>
                        {/* Error Banner */}
                        {hasModalError && <ErrorBanner headlineContent={`There ${modalErrors.length > 1 ? "were" : "is"} ${modalErrors.length} ${modalErrors.length > 1 ? "Errors" : "Error"}`} listContent={modalErrors} />}

                        {/* Tablenumber Input */}
                        <TextInput name="tableNumber" labelText="Tischnummer" placeholder="A1" />

                        {/* Capacity Input */}
                        <TextInput type="number" name="capacity" labelText="Personenanzahl" placeholder="2" />

                        {/* Capacity Quick */}
                        <div className="flex mb-4 sm:inline-flex sm:justify-between">
                            {capacityTemplates.map((capacityTemplate, index) => (
                                <button type="button" data-cy={`capacity-quick-${capacityTemplate}`} key={`ppl_${index}${capacityTemplate}`} onClick={() => setFieldValue('capacity', capacityTemplate)} className={`flex justify-center items-center hover:bg-primary-blue-hover focus:bg-primary-blue-hover focus:shadow-focus hover:text-white focus:text-white border border-primary-blue ${values.capacity as unknown as number === capacityTemplate ? `bg-primary-blue text-white` : `text-primary-blue`} rounded-full mr-2`} style={{ minWidth: "50px", minHeight: "50px" }}>
                                    <p className="font-semibold font-roboto">{capacityTemplate}</p>
                                </button>
                            ))}
                        </div>
                        <div className="flex flex-col sm:flex sm:flex-row-reverse sm:justify-between">
                            {/* Save and Cancel Buttons */}
                            <div>
                                <Button dataCy="table-save" type="submit" icon={faCheck} loading={isLoadingButton} disabled={!(dirty && isValid)}>Speichern</Button>
                            </div>
                            <Button dataCy="table-cancel" kind="tertiary" className="mt-2 sm:mt-0" onClick={() => props.setModalOpen(false)}>Abbrechen</Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </Modal>
    )
}