import { faArrowUp, faChevronDown, faPlus, faSyncAlt, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import { Button } from "../../components/Buttons/Button"
import { IconButton } from "../../components/Buttons/IconButton"
import { AddTableModal } from "../../components/Table/AddTableModal"
import { TableItem } from "../../components/Table/TableItem"
import { Loading } from "../../components/UI/Loading"
import { useActions, useAppState } from "../../overmind"
import { TableDocument } from "../../overmind/tables/state"
import { EmptyTables } from "./EmptyTables"

export const Tables: React.FunctionComponent = () => {
    const {
        tables, isLoadingTables, isCheckedAll, checkedCount, sort
    } = useAppState().tables

    const { loadTables, bulkTableSelection, sortTable, bulkDelete } = useActions().tables

    const [modalOpen, setModalOpen] = useState(false)
    const [bulkDropdown, setBulkDropdown] = useState(false)

    useEffect(() => {
        loadTables()
    }, [loadTables])

    if (!isLoadingTables && tables.length === 0)
        return <EmptyTables />

    return (
        <div className="container md:max-w-full mt-12">
            <div className="text-darkgrey">
                {/* Add Table Modal */}
                <AddTableModal modalOpen={modalOpen} setModalOpen={setModalOpen} />

                {/* Headline */}
                <h1 className="text-2xl text-headline-black font-semibold">Tische</h1>
                <p className="text-lightgrey mr-3 mb-4">{!isLoadingTables ? tables.length : 0} Gesamt</p>

                {/* Add Table and Filters */}
                <div className="sm:flex lg:justify-between mt-5 mb-5 lg:mt-0">
                    <div className="relative inline-block text-lightgrey">
                        {/* When dropdown open click outside close it */}
                        {bulkDropdown && <div data-cy="table-bulk-dropdown-background" className="fixed inset-0 h-full w-full z-10" aria-hidden="true" onClick={() => setBulkDropdown(!bulkDropdown)}></div>}

                        <button data-cy="table-bulk-dropdown-button" className="border rounded-lg mr-5 mb-3 sm:mb-0 py-2 px-5" type="button" onClick={() => setBulkDropdown(!bulkDropdown)}>
                            <span className="text-darkgrey font-semibold pr-2">{!isLoadingTables && isCheckedAll ? "Alle" : checkedCount}</span>
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
                    <div>
                        <Button dataCy="table-add" type="button" icon={faPlus} onClick={() => setModalOpen(true)}>Tisch hinzufügen</Button>
                    </div>
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
                                <button data-cy="table-tablenumber-sort-button" type="button" className="text-darkgrey text-xs font-semibold tracking-widest uppercase group" onClick={() => sortTable('tableNumber')}>
                                    Tischnummer
                                    <FontAwesomeIcon data-cy="table-tablenumber-sort-icon" icon={faArrowUp} className={`ml-2 ${sort.currentField !== "tableNumber" ? `opacity-0 group-hover:opacity-50` : ``} transform-gpu transition-transform duration-200	ease-linear ${sort.sortDirection.tableNumber === 'ASC' ? 'rotate-0' : `rotate-180`}`} />
                                </button>
                            </th>
                            <th className="pr-10 lg:pr-0">
                                <button data-cy="table-capacity-sort-button" type="button" className="text-darkgrey text-xs font-semibold tracking-widest uppercase group" onClick={() => sortTable('capacity')}>
                                    Personenanzahl
                                    <FontAwesomeIcon data-cy="table-capacity-sort-icon" icon={faArrowUp} className={`ml-2 ${sort.currentField !== "capacity" ? `opacity-0 group-hover:opacity-50` : ``} transform-gpu transition-transform duration-200	ease-linear ${sort.sortDirection.capacity === 'ASC' ? 'rotate-0' : `rotate-180`}`} />
                                </button>
                            </th>
                            <th className="pr-20 lg:pr-0">
                                Erstellt von
                            </th>
                            <th className="pr-10 lg:pr-0">
                                Aktionen
                            </th>
                            <th className="text-center">
                                <IconButton dataCy="table-table-load-iconbutton" icon={faSyncAlt} textColor="text-darkgrey" onClick={() => loadTables()} className="mr-2 md:mr-4" />
                            </th>
                        </tr>
                    </thead>
                    {/* Table Header End */}
                    <tbody className="divide-y divide-border-grey">
                        {!isLoadingTables &&
                            tables.map((table: TableDocument, index: number) => <TableItem key={table._id} index={index} id={table._id} />)}
                    </tbody>
                </table>
                {isLoadingTables && <Loading />}
            </div>
        </div>
    )
}