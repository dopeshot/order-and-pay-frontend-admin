import { faArrowDown, faArrowUp, faCheck, faCircleNotch, faEdit, faEllipsisV, faMale, faPlus, faSyncAlt, faTrash } from "@fortawesome/free-solid-svg-icons"
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
            tables, isLoadingTables, tableErrors, hasTableError, isCheckedAll, sort
        },
        app: {
            isMobile,
            languageLocale
        }
    } = useAppState()

    const { loadTables, deleteTable, toggleMoreOptions, updateTable, setIsEdit, toggleChecked, bulkTableSelection, sortTable } = useActions().tables

    const [displayModal, setDisplayModal] = useState(false)
    const [tableNumber, setTableNumber] = useState("")
    const [tableCapacity, setTableCapacity] = useState(0)

    useEffect(() => {
        loadTables()
    }, [loadTables])

    return (
        <div className="text-darkgrey">
            {/* Add Table Modal */}
            {displayModal && <AddTableModal setDisplayModal={setDisplayModal} />}

            {/* Headline */}
            <h1 className="text-2xl text-headline-black font-semibold">Tische</h1>
            <p className="text-lightgrey mr-3 mb-4 sm:mb-0">{!isLoadingTables ? tables.length : 0} Gesamt</p>

            {/* Error Banner */}
            {hasTableError && <ErrorBanner headlineContent={`There ${tableErrors.length > 1 ? "were" : "is"} ${tableErrors.length} ${tableErrors.length > 1 ? "Errors" : "Error"}`} listContent={tableErrors} />}

            {/* Add Table */}
            <div className="flex lg:justify-end mt-5 mb-5 lg:mt-0">
                <PrimaryButton type="button" icon={faPlus} content="Tisch hinzufügen" onClick={() => setDisplayModal(true)}></PrimaryButton>
            </div>

            {/* Table */}
            <table className="table-auto text-left whitespace-nowrap min-w-full">
                {/* Table Header */}
                <thead className="bg-white-lightgrey">
                    <tr className="text-darkgrey text-xs tracking-widest uppercase">
                        <th className="text-center py-5 px-5">
                            <input type="checkbox" checked={isCheckedAll} onChange={() => bulkTableSelection()} className="bg-checkbox-grey border border-transparent checked:bg-primary-blue checked:border-transparent" />
                        </th>
                        <th className="pr-10">
                             <button type="button" className="text-darkgrey text-xs font-semibold tracking-widest uppercase" onClick={() => sortTable('tableNumber')}>
                                Tischnummer
                                {sort.currentField === 'tableNumber' && <FontAwesomeIcon icon={sort.sortDirection.tableNumber === 'ASC' ? faArrowUp : faArrowDown} className="ml-2" />}
                            </button> 
                        </th>
                        <th className="pr-10 lg:pr-0">
                             <button type="button" className="text-darkgrey text-xs font-semibold tracking-widest uppercase" onClick={() => sortTable('capacity')}>
                                Personenanzahl
                                {sort.currentField === 'capacity' && <FontAwesomeIcon icon={sort.sortDirection.capacity === 'ASC' ? faArrowUp : faArrowDown} className="ml-2" />}
                            </button>
                        </th>
                        <th className="pr-20 lg:pr-0">
                            Erstellt von
                        </th>
                        <th className="pr-10 lg:pr-0">
                            Aktionen
                        </th>
                        <th className="text-center">
                            <IconButton icon={faSyncAlt} textColor="text-darkgrey" onClick={() => loadTables()} />
                        </th>
                    </tr>
                </thead>
                {/* Table Header End */}
                <tbody className="divide-y divide-border-grey">
                    {!isLoadingTables &&
                        tables.map((table: TableDocument, index: number) => (<tr key={index}>
                            {/* Checkbox */}
                            <td className="text-center py-4">
                                <input checked={table.isChecked} onChange={() => toggleChecked(table._id)} type="checkbox" className="bg-checkbox-grey border border-transparent checked:bg-primary-blue checked:border-transparent" />
                            </td>

                            {/* Tablenumber */}
                            <td className="font-roboto font-semibold pr-4">
                                {table.isEdit ?
                                    <input type="text" id="tablenumber" name="tablenumber" value={tableNumber ? tableNumber : ""} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setTableNumber(event.target.value)} minLength={1} maxLength={8} placeholder="A1" className="font-roboto border border-border-grey rounded-xl w-28 pl-4 py-2" />
                                    : table.tableNumber}
                            </td>

                            {/* Table Capacity */}
                            <td className="font-roboto font-semibold pr-4">
                                {table.isEdit ?
                                    <input type="number" id="tablecapacity" name="tablecapacity" value={tableCapacity ? tableCapacity : ""} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setTableCapacity(parseInt(event.target.value))} min={1} max={100} placeholder="4" className="font-roboto border border-border-grey rounded-xl w-20 pl-4 py-2" />
                                    :
                                    isMobile ? table.capacity : <div className="flex items-center">
                                        <p className="mr-5" style={{ minWidth: "30px" }}>{table.capacity}</p>
                                        {[...Array(table.capacity < 20 ? table.capacity : 19)].map((e, i) => <FontAwesomeIcon key={i} icon={faMale} className="text-lightgrey mr-2" />)}
                                        {table.capacity > 20 ? <FontAwesomeIcon icon={faMale} className="gradient-icon text-lightgrey mr-2" /> : ""}
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
                                    <button onClick={() => { updateTable({ id: table._id, tableNumber: tableNumber, capacity: tableCapacity }) }} className="text-primary-blue hover:text-primary-blue-hover focus:text-primary-blue-hover font-semibold mr-5">
                                        <FontAwesomeIcon icon={faCheck} className="mr-2" />
                                        Speichern
                                    </button>
                                    :
                                    <button onClick={() => { setIsEdit(table._id); setTableNumber(table.tableNumber); setTableCapacity(table.capacity) }} className="hover:text-gray-500 focus:hover:text-gray-500 mr-5">
                                        <FontAwesomeIcon icon={faEdit} className="mr-2" />
                                        Bearbeiten
                                    </button>}

                                {/* Delete */}
                                <div className="relative inline-block">
                                    {/* When dropdown open click outside close it */}
                                    {table.isMoreOptionsOpen && <div className="fixed inset-0 h-full w-full z-10" aria-hidden="true" onClick={() => toggleMoreOptions(table._id)}></div>}

                                    {/* Icon */}
                                    <IconButton icon={faEllipsisV} textColor="text-lightgrey" onClick={() => { toggleMoreOptions(table._id) }} />

                                    {/* Dropdown */}
                                    {table.isMoreOptionsOpen && <div id="table-delete-dropdown" className="absolute origin-top-right right-5 z-20 bg-white rounded-lg shadow mt-2 w-30" tabIndex={-1}>
                                        <div className="py-1">
                                            <button onClick={() => deleteTable(table._id)} className="block text-darkgrey hover:text-gray-500 focus:hover:text-gray-500 text-sm px-4 py-2" tabIndex={-1}>
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
                <>
                    <FontAwesomeIcon icon={faCircleNotch} className="animate-spin mr-3" />
                    <p className="text-semibold">Loading Tables</p>
                </>}
        </div>
    )
}