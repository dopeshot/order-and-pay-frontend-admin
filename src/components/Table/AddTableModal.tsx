import { faCheck } from "@fortawesome/free-solid-svg-icons"
import { Field, Form, Formik } from "formik"
import React, { useState } from "react"
import * as yup from 'yup'
import { useActions, useAppState } from "../../overmind"
import { Button } from "../Buttons/Button"
import { ErrorBanner } from "../Errors/ErrorBanner"
import { FormError } from "../Errors/FormError"
import { Modal } from "../UI/Modal"

type TableModalProps = {
    modalOpen: boolean,
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const AddTableModal: React.FunctionComponent<TableModalProps> = (props) => {
    const capacityTemplates = [2, 4, 6]

    const { modalErrors, hasModalError } = useAppState().tables
    const { createTable } = useActions().tables

    const [isLoadingButton, setIsLoadingButton] = useState(false)

    const initialValues = {
        tableNumber: "",
        capacity: ""
    }

    const addTableSchema = yup.object().shape({
        tableNumber: yup.string().required("Table number must be defined").min(1, "Table number must be at least 1 letter long").max(8, "Table number cannot be greater than 8 letters"),
        capacity: yup.number().required("Capacity must be defined").min(1, "Capacity must be greater than 1").max(100, "Capacity cannot be greater than 100")
    })

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
                {({ errors, setFieldValue, values, touched, dirty, isValid }) => (
                    <Form>
                        <div className="bg-white mb-5">
                            {/* Error Banner */}
                            {hasModalError && <ErrorBanner headlineContent={`There ${modalErrors.length > 1 ? "were" : "is"} ${modalErrors.length} ${modalErrors.length > 1 ? "Errors" : "Error"}`} listContent={modalErrors} />}

                            {/* Tablenumber Input with Label */}
                            <label className="block text-darkgrey text-sm font-semibold pb-2" htmlFor="tablenumber">Tischnummer</label>
                            <Field type="text" data-cy="table-modal-tablenumber-input" name="tableNumber" id="tableNumber" placeholder="A1" className={`font-roboto rounded-xl w-full pl-4 py-2 sm:w-1/2 ${errors.tableNumber && touched.tableNumber ? 'bg-danger-red bg-opacity-10 border-2 border-danger-red mb-2 focus:outline-none focus:border-danger-red focus:ring-danger-red' : 'border border-border-grey mb-2'}`} />
                            <div className="mb-5">
                                <FormError dataCy="table-modal-tablenumber-input-error" field="tableNumber" />
                            </div>

                            {/* Capacity Input with Label */}
                            <label className="block text-darkgrey text-sm font-semibold pb-2" htmlFor="tablenumber">Personenanzahl</label>
                            <Field type="number" data-cy="table-modal-capacity-input" name="capacity" id="capacity" placeholder="2" className={`font-roboto rounded-xl w-full pl-4 py-2 sm:w-1/2 sm:mb-0 ${errors.capacity && touched.capacity ? 'bg-danger-red bg-opacity-10 border-2 border-danger-red focus:border-danger-red focus:ring-danger-red' : 'border border-border-grey mb-3'}`} />

                            {/* Capacity Quick */}
                            <div className="flex mb-2 sm:inline-flex sm:justify-between sm:w-1/2 sm:pl-3">
                                {capacityTemplates.map((capacityTemplate, index) => (
                                    <button type="button" data-cy={`capacity-quick-${capacityTemplate}`} key={`ppl_${index}${capacityTemplate}`} onClick={() => setFieldValue('capacity', capacityTemplate)} className={`flex justify-center items-center hover:bg-primary-blue-hover focus:bg-primary-blue-hover focus:shadow-focus hover:text-white focus:text-white border border-primary-blue ${values.capacity as unknown as number === capacityTemplate ? `bg-primary-blue text-white` : `text-primary-blue`} rounded-full mr-4 sm:mr-0`} style={{ minWidth: "50px", minHeight: "50px" }}>
                                        <p className="font-semibold font-roboto">{capacityTemplate}</p>
                                    </button>
                                ))}
                            </div>

                            <div className="mb-5">
                                <FormError dataCy="table-modal-capacity-input-error" field="capacity" />
                            </div>
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