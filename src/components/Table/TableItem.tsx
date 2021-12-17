import { faCheck, faEdit, faEllipsisV, faMale, faSpinner, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { useActions, useAppState } from "../../overmind"
import { TableDocument } from "../../overmind/tables/state"
import { IconButton } from "../Buttons/IconButton"

type TableItemType = {
    index: number
    table: TableDocument
}

export const TableItem: React.FC<TableItemType> = (props) => {
    const {
        index,
        table
    } = props

    const {
        app: {
            isMobile,
            languageLocale
        }
    } = useAppState()

    const { deleteTable, updateTable, toggleChecked } = useActions().tables

    const [isEdit, setIsEdit] = useState(false)
    const [editTableNumber, setEditTableNumber] = useState(table.tableNumber)
    const [editCapacity, setEditCapacity] = useState(table.capacity)
    const [isMoreOptionsOpen, setIsMoreOptionsOpen] = useState(false)
    const [isLoadingButton, setIsLoadingButton] = useState(false)

    return (<tr data-cy={`table-table-row`}>
        {/* Checkbox */}
        <td className="text-center py-4">
            <input data-cy={`table-table-checkbox-${index}`} checked={table.isChecked} onChange={() => toggleChecked(table._id)} type="checkbox" className="bg-checkbox-grey border border-transparent checked:bg-primary-blue checked:border-transparent" />
        </td>

        {/* Tablenumber */}
        <td data-cy={`table-table-tablenumber-${index}`} className="font-roboto font-semibold pr-4">
            {isEdit ?
                <input type="text" data-cy={`table-table-tablenumber-input-${index}`} name="tablenumber" value={editTableNumber ? editTableNumber : ""} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEditTableNumber(event.target.value)} minLength={1} maxLength={8} placeholder="A1" className="font-roboto border border-border-grey rounded-xl w-28 pl-4 py-2" />
                : table.tableNumber}
        </td>

        {/* Table Capacity */}
        <td data-cy={`table-table-capacity-${index}`} className="font-roboto font-semibold pr-4">
            {isEdit ?
                <input type="number" data-cy={`table-table-capacity-input-${index}`} name="tablecapacity" value={editCapacity ? editCapacity : ""} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEditCapacity(parseInt(event.target.value))} min={1} max={100} placeholder="4" className="font-roboto border border-border-grey rounded-xl w-20 pl-4 py-2" />
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
                <button data-cy={`table-table-save-button-${index}`} onClick={() => {
                    setIsLoadingButton(true)
                    updateTable({ id: table._id, tableNumber: editTableNumber, capacity: editCapacity, setIsEdit, setIsLoadingButton })
                }} className="text-primary-blue hover:text-primary-blue-hover focus:text-primary-blue-hover font-semibold mr-5">
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
    </tr>)
}