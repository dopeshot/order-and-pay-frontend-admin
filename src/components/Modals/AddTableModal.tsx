import { faCheck } from "@fortawesome/free-solid-svg-icons"
import { Form, Formik } from "formik"
import React, { useState } from "react"
import * as yup from 'yup'
import { useActions } from "../../overmind"
import { Button } from "../Buttons/Button"
import { TextInput } from "../Forms/TextInput"
import { Modal } from "./Modal"

type TableModalProps = {
    /** Modal State */
    modalOpen: boolean,
    /** Modal State Setter */
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

/**
 * Modal for adding new Tables, with Table Add Logic
 */
export const AddTableModal: React.FunctionComponent<TableModalProps> = ({ modalOpen, setModalOpen }) => {
    // Local Variables
    const capacityTemplates = [2, 4, 6]

    // Local State
    const [isLoadingButton, setIsLoadingButton] = useState(false)

    // Global State
    const { createTable } = useActions().tables

    // Formik
    const initialFormikValues = {
        tableNumber: "",
        capacity: ""
    }

    // Formik Validation
    const addTableSchema = yup.object().shape({
        tableNumber: yup.string().required("Dies ist ein Pflichtfeld.").min(1, "Die Tischnummer muss aus mindestens 1 Zeichen bestehen.").max(8, "Die Tischnummer darf nicht länger als 8 Zeichen sein."),
        capacity: yup.number().required("Dies ist ein Pflichtfeld.").min(1, "Die Personenanzahl muss mindestens 1 sein.").max(100, "Die Personenanzahl darf nicht größer als 100 sein.")
    })

    // Formik Submit Form
    const submitForm = async (values: any) => {
        setIsLoadingButton(true)

        // If createTable table returns true => table created successful
        if (await createTable(values))
            setModalOpen(false)

        setIsLoadingButton(false)
    }

    return (
        <Modal dataCy="table-modal" modalHeading="Neuer Tisch" open={modalOpen} onDissmis={() => setModalOpen(false)}>
            <Formik initialValues={initialFormikValues} validationSchema={addTableSchema} onSubmit={submitForm}>
                {({ setFieldValue, values, dirty, isValid }) => (
                    <Form>
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
                            <Button dataCy="table-save" type="submit" icon={faCheck} loading={isLoadingButton} disabled={!(dirty && isValid)}>Speichern</Button>
                            <Button dataCy="table-cancel" kind="tertiary" className="mt-2 sm:mt-0" onClick={() => setModalOpen(false)}>Abbrechen</Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </Modal>
    )
}