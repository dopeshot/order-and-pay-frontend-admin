import { faArrowUp, faCheck, faChevronDown, faCircleNotch, faEdit, faEllipsisV, faMale, faPlus, faSyncAlt, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import { IconButton } from "../../components/Buttons/IconButton"
import { PrimaryButton } from "../../components/Buttons/PrimaryButton"
import { ErrorBanner } from "../../components/Errors/ErrorBanner"
import { AddTableModal } from "../../components/Table/AddTableModal"
import { useActions, useAppState } from "../../overmind"
import { TableDocument } from "../../overmind/tables/state"

export const Tables: React.FunctionComponent = () => {
    const {
        tables: {
            tables, isLoadingTables, tableErrors, hasTableError, isCheckedAll, checkedCount, sort
        },
        app: {
            isMobile,
            languageLocale
        }
    } = useAppState()

    const { loadTables, deleteTable, toggleMoreOptions, updateTable, setIsEdit, toggleChecked, bulkTableSelection, sortTable, bulkDelete } = useActions().tables

    const [displayModal, setDisplayModal] = useState(false)
    const [tableNumber, setTableNumber] = useState("")
    const [tableCapacity, setTableCapacity] = useState(0)
    const [bulkDropdown, setBulkDropdown] = useState(false)

    useEffect(() => {
        loadTables()
    }, [loadTables])

    return (
        <div className="text-darkgrey">
            {/* Add Table Modal */}
            {displayModal && <AddTableModal setDisplayModal={setDisplayModal} />}

            {/* Headline */}
            <h1 className="text-2xl text-headline-black font-semibold">Tische</h1>
            <p className="text-lightgrey mr-3 mb-4">{!isLoadingTables ? tables.length : 0} Gesamt</p>

            {/* Error Banner */}
            {hasTableError && <ErrorBanner headlineContent={`There ${tableErrors.length > 1 ? "were" : "is"} ${tableErrors.length} ${tableErrors.length > 1 ? "Errors" : "Error"}`} listContent={tableErrors} />}

            {/* Add Table and Filters */}
            <div className="sm:flex lg:justify-between mt-5 mb-5 lg:mt-0">
                <div className="relative inline-block text-lightgrey">
                    {/* When dropdown open click outside close it */}
                    {bulkDropdown && <div data-cy="table-bulk-dropdown-background" className="fixed inset-0 h-full w-full z-10" aria-hidden="true" onClick={() => setBulkDropdown(!bulkDropdown)}></div>}

                    <button data-cy="table-bulk-dropdown-button" className="border rounded-lg mr-5 mb-3 sm:mb-0 py-2 px-5" type="button" onClick={() => setBulkDropdown(!bulkDropdown)}>
                        <span className="text-darkgrey font-semibold pr-2">{checkedCount === (!isLoadingTables && tables.length) ? "Alle" : checkedCount}</span>
                        Markiert
                        <FontAwesomeIcon className="ml-6" icon={faChevronDown} />
                    </button>

                    {bulkDropdown && <div data-cy="table-bulk-dropdown" className="absolute origin-top-right z-20 bg-white rounded-lg shadow mt-0 sm:mt-2 w-36" tabIndex={-1}>
                        <div className="py-1">
                            <button data-cy="table-bulk-dropdown-delete-button" type="button" onClick={() => bulkDelete()} className="block text-darkgrey hover:text-gray-500 focus:hover:text-gray-500 text-sm px-4 py-2" tabIndex={-1}>
                                <FontAwesomeIcon icon={faTrash} className="text-danger-red mr-3" />
                                Alle Löschen
                            </button>
                        </div>
                    </div>}
                </div>
                <PrimaryButton dataCy="table-add" type="button" icon={faPlus} content="Tisch hinzufügen" onClick={() => setDisplayModal(true)}></PrimaryButton>
            </div>

            {/* Table */}
            <table className="table-auto text-left whitespace-nowrap min-w-full">
                {/* Table Header */}
                <thead className="bg-white-lightgrey">
                    <tr className="text-darkgrey text-xs tracking-widest uppercase">
                        <th className="text-center py-5 px-5">
                            <input data-cy={`table-table-checkbox-allcheck`} type="checkbox" checked={isCheckedAll} onChange={() => bulkTableSelection()} className="bg-checkbox-grey border border-transparent checked:bg-primary-blue checked:border-transparent" />
                        </th>
                        <th className="pr-10">
                            <button id="button-table" type="button" className="text-darkgrey text-xs font-semibold tracking-widest uppercase group" onClick={() => sortTable('tableNumber')}>
                                Tischnummer
                                <FontAwesomeIcon icon={faArrowUp} className={`ml-2 ${sort.currentField !== "tableNumber" ? `opacity-0 group-hover:opacity-50` : ``} transform-gpu transition-transform duration-200	ease-linear ${sort.sortDirection.tableNumber === 'ASC' ? 'rotate-0' : `rotate-180`}`} />
                            </button>
                        </th>
                        <th className="pr-10 lg:pr-0">
                            <button type="button" className="text-darkgrey text-xs font-semibold tracking-widest uppercase group" onClick={() => sortTable('capacity')}>
                                Personenanzahl
                                <FontAwesomeIcon icon={faArrowUp} className={`ml-2 ${sort.currentField !== "capacity" ? `opacity-0 group-hover:opacity-50` : ``} transform-gpu transition-transform duration-200	ease-linear ${sort.sortDirection.capacity === 'ASC' ? 'rotate-0' : `rotate-180`}`} />
                            </button>
                        </th>
                        <th className="pr-20 lg:pr-0">
                            Erstellt von
                        </th>
                        <th className="pr-10 lg:pr-0">
                            Aktionen
                        </th>
                        <th className="text-center">
                            <IconButton dataCy="table-table-load-iconbutton" icon={faSyncAlt} textColor="text-darkgrey" onClick={() => loadTables()} />
                        </th>
                    </tr>
                </thead>
                {/* Table Header End */}
                <tbody className="divide-y divide-border-grey">
                    {!isLoadingTables &&
                        tables.map((table: TableDocument, index: number) => (<tr data-cy={`table-table-row`} key={index}>
                            {/* Checkbox */}
                            <td className="text-center py-4">
                                <input data-cy={`table-table-checkbox-${index}`} checked={table.isChecked} onChange={() => toggleChecked(table._id)} type="checkbox" className="bg-checkbox-grey border border-transparent checked:bg-primary-blue checked:border-transparent" />
                            </td>

                            {/* Tablenumber */}
                            <td data-cy={`table-table-tablenumber-${index}`} className="font-roboto font-semibold pr-4">
                                {table.isEdit ?
                                    <input type="text" data-cy={`table-table-tablenumber-input-${index}`} name="tablenumber" value={tableNumber ? tableNumber : ""} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setTableNumber(event.target.value)} minLength={1} maxLength={8} placeholder="A1" className="font-roboto border border-border-grey rounded-xl w-28 pl-4 py-2" />
                                    : table.tableNumber}
                            </td>

                            {/* Table Capacity */}
                            <td data-cy={`table-table-capacity-${index}`} className="font-roboto font-semibold pr-4">
                                {table.isEdit ?
                                    <input type="number" data-cy={`table-table-capacity-input-${index}`} name="tablecapacity" value={tableCapacity ? tableCapacity : ""} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setTableCapacity(parseInt(event.target.value))} min={1} max={100} placeholder="4" className="font-roboto border border-border-grey rounded-xl w-20 pl-4 py-2" />
                                    :
                                    isMobile ? table.capacity : <div className="flex items-center">
                                        <p className="mr-5" style={{ minWidth: "30px" }}>{table.capacity}</p>
                                        {[...Array(table.capacity <= 20 ? table.capacity : 20)].map((e, i) => <span data-cy={`table-table-capacityicon-${index}`}><FontAwesomeIcon key={i} icon={faMale} className="text-lightgrey mr-2" /></span>)}
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
                                {table.isEdit ?
                                    <button data-cy={`table-table-save-button-${index}`} onClick={() => { updateTable({ id: table._id, tableNumber: tableNumber, capacity: tableCapacity }) }} className="text-primary-blue hover:text-primary-blue-hover focus:text-primary-blue-hover font-semibold mr-5">
                                        <FontAwesomeIcon icon={faCheck} className="mr-2" />
                                        Speichern
                                    </button>
                                    :
                                    <button data-cy={`table-table-edit-button-${index}`} onClick={() => { setIsEdit(table._id); setTableNumber(table.tableNumber); setTableCapacity(table.capacity) }} className="hover:text-gray-500 focus:hover:text-gray-500 mr-5">
                                        <FontAwesomeIcon icon={faEdit} className="mr-2" />
                                        Bearbeiten
                                    </button>}

                                {/* Delete */}
                                <div className="relative inline-block">
                                    {/* When dropdown open click outside close it */}
                                    {table.isMoreOptionsOpen && <div data-cy={`table-table-delete-background-${index}`} className="fixed inset-0 h-full w-full z-10" aria-hidden="true" onClick={() => toggleMoreOptions(table._id)}></div>}

                                    {/* Icon */}
                                    <IconButton dataCy={`table-table-delete-iconbutton-${index}`} icon={faEllipsisV} textColor="text-lightgrey" onClick={() => { toggleMoreOptions(table._id) }} />

                                    {/* Dropdown */}
                                    {table.isMoreOptionsOpen && <div data-cy={`table-table-delete-dropdown-${index}`} className="absolute origin-top-right right-5 z-20 bg-white rounded-lg shadow mt-2 w-30" tabIndex={-1}>
                                        <div className="py-1">
                                            <button data-cy={`table-table-delete-button-${index}`} onClick={() => deleteTable(table._id)} className="block text-darkgrey hover:text-gray-500 focus:hover:text-gray-500 text-sm px-4 py-2" tabIndex={-1}>
                                                <FontAwesomeIcon icon={faTrash} className="text-danger-red mr-3" />
                                                Löschen
                                            </button>
                                        </div>
                                    </div>}
                                </div>
                            </td>
                        </tr>))}
                </tbody>
            </table>
            {isLoadingTables &&
                <div data-cy="table-spinner">
                    <FontAwesomeIcon icon={faCircleNotch} className="animate-spin mr-3" />
                    <p className="text-semibold">Loading Tables</p>
                </div>}
        </div>
    )
}