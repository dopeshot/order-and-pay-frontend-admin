import { faCheck, faEdit, faEllipsisV, faMale, faSpinner, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Field, Formik } from "formik"
import React from "react"
import { useState } from "react"
import * as yup from 'yup'
import { useActions, useAppState } from "../../overmind"
import { TableDocument } from "../../overmind/tables/state"
import { IconButton } from "../Buttons/IconButton"
import { FormError } from "../Errors/FormError"

type TableItemType = {
    index: number
    id: string
}

export const TableItem: React.FC<TableItemType> = React.memo(({ index, id }) => {
    const {
        app: {
            isMobile,
            languageLocale
        }
    } = useAppState()

    const { deleteTable, updateTable, toggleChecked } = useActions().tables

    const table = useAppState<TableDocument>(state => state.tables.tables.find(table => table._id === id)!)

    const initialValues = {
        _id: table._id,
        tableNumber: table.tableNumber,
        capacity: table.capacity
    }

    const submitChanges = ({ _id, tableNumber, capacity }: typeof initialValues) => {
        if (isLoadingButton)
            return

        setIsLoadingButton(true)
        updateTable({ id: _id, tableNumber, capacity, setIsEdit, setIsLoadingButton })
    }

    const editTableSchema = yup.object().shape({
        tableNumber: yup.string().required("Table number must be defined").min(1, "Table number must be at least 1 letter long").max(8, "Table number cannot be greater than 8 letters"),
        capacity: yup.number().required("Capacity must be defined").min(1, "Capacity must be greater than 1").max(100, "Capacity cannot be greater than 100"),
        _id: yup.string()
    })

    const [isEdit, setIsEdit] = useState(false)
    const [isMoreOptionsOpen, setIsMoreOptionsOpen] = useState(false)
    const [isLoadingButton, setIsLoadingButton] = useState(false)

    return (<tr data-cy={`table-table-row`}>
        {/* Checkbox */}
        <td className="text-center py-4">
            <input data-cy={`table-table-checkbox-${index}`} checked={table.isChecked} onChange={() => toggleChecked(table._id)} type="checkbox" className="bg-checkbox-grey border border-transparent checked:bg-primary-blue checked:border-transparent" />
        </td>

        <Formik initialValues={initialValues} onSubmit={submitChanges} validationSchema={editTableSchema} >
            {({ errors, touched, dirty, isValid, submitForm }) => (<>{/* MC: Do NOT put a form tag around!!! This is not working in tables! https://stackoverflow.com/questions/45815205/input-cannot-appear-as-a-child-of-tr*/}
                {/* Tablenumber */}
                <td data-cy={`table-table-tablenumber-${index}`} className="font-roboto font-semibold pr-4">
                    {isEdit ?
                        <div className="flex items-center">
                            <Field type="text" data-cy={`table-table-tablenumber-input-${index}`} name="tableNumber" placeholder="A1" className={`font-roboto border rounded-xl w-28 mr-3 pl-4 py-2 ${errors.tableNumber && touched.tableNumber ? 'bg-danger-red bg-opacity-10 border-2 border-danger-red focus:outline-none focus:border-danger-red focus:ring-danger-red' : 'border-border-grey'}`} />
                            <FormError field="tableNumber" dataCy="table-table-tablenumber-error" />
                        </div>
                        : table.tableNumber}
                </td>

                {/* Table Capacity */}
                <td data-cy={`table-table-capacity-${index}`} className="font-roboto font-semibold pr-4">
                    {isEdit ?
                        <div className="flex items-center">
                            <Field type="number" data-cy={`table-table-capacity-input-${index}`} name="capacity" placeholder="4" className={`font-roboto border rounded-xl w-20 mr-3 pl-4 py-2 ${errors.capacity && touched.capacity ? 'bg-danger-red bg-opacity-10 border-2 border-danger-red focus:outline-none focus:border-danger-red focus:ring-danger-red' : 'border-border-grey'}`} />
                            <FormError field="capacity" dataCy="table-table-capacity-error" />
                        </div>
                        :
                        isMobile ? table.capacity : <div className="flex items-center">
                            <p className="mr-5" style={{ minWidth: "30px" }}>{table.capacity}</p>
                            {[...Array(table.capacity <= 20 ? table.capacity : 20)].map((e, i) => <span key={i} data-cy={`table-table-capacityicon-${index}`}><FontAwesomeIcon icon={faMale} className="text-lightgrey mr-2" /></span>)}
                            {table.capacity > 20 ? <span data-cy={`table-table-capacityicon-${index}-last`}><FontAwesomeIcon icon={faMale} className="gradient-icon text-lightgrey mr-2" /></span> : ""}
                        </div>}
                </td>

                {/* Created by */}
                <td className="pr-4">
                    <h5 className="font-semibold text-sm h-3">{table.createdBy}</h5>
                    <small className="text-lightgrey">erstellt am {table.updatedAt.toLocaleDateString(languageLocale)}</small>
                </td>

                {/* Actions */}
                <td className="text-lightgrey">
                    {/* Edit */}
                    {isEdit ?
                        <button data-cy={`table-table-save-button-${index}`} onClick={() => submitForm()} className={`text-primary-blue hover:text-primary-blue-hover focus:text-primary-blue-hover font-semibold mr-5 ${!(dirty && isValid) ? "opacity-70" : "opacity-100"}`}>
                            <FontAwesomeIcon icon={isLoadingButton ? faSpinner : faCheck} className={`${isLoadingButton ? "animate-spin" : ""} mr-2`} />
                            Speichern
                        </button>
                        :
                        <button data-cy={`table-table-edit-button-${index}`} onClick={() => { setIsEdit(true) }} className="hover:text-gray-500 focus:hover:text-gray-500 mr-5">
                            <FontAwesomeIcon icon={faEdit} className="mr-2" />
                            Bearbeiten
                        </button>}

                    {/* Delete */}
                    <div className="relative inline-block">
                        {/* When dropdown open click outside close it */}
                        {isMoreOptionsOpen && <div data-cy={`table-table-delete-background-${index}`} className="fixed inset-0 h-full w-full z-10" aria-hidden="true" onClick={() => setIsMoreOptionsOpen(false)}></div>}

                        {/* Icon */}
                        <IconButton dataCy={`table-table-delete-iconbutton-${index}`} icon={faEllipsisV} textColor="text-lightgrey" onClick={() => { setIsMoreOptionsOpen(true) }} />

                        {/* Dropdown */}
                        {isMoreOptionsOpen && <div data-cy={`table-table-delete-dropdown-${index}`} className="absolute origin-top-right right-5 z-20 bg-white rounded-lg shadow mt-2 w-30" tabIndex={-1}>
                            <div className="py-1">
                                <button data-cy={`table-table-delete-button-${index}`} onClick={() => { deleteTable(table._id) }} className="block text-darkgrey hover:text-gray-500 focus:hover:text-gray-500 text-sm px-4 py-2" tabIndex={-1}>
                                    <FontAwesomeIcon icon={faTrash} className="text-danger-red mr-3" />
                                    Löschen
                                </button>
                            </div>
                        </div>}
                    </div>
                </td>
            </>)
            }
        </Formik>
    </tr >)
})