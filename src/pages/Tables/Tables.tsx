import { faCheck, faCircleNotch, faEdit, faEllipsisV, faPlus, faSort, faSyncAlt, faTrash, faUsers } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import { AddTableModal } from "../../components/AddTableModal/AddTableModal"
import { PrimaryButton } from "../../components/PrimaryButton.tsx/PrimaryButton"
import { useActions, useAppState } from "../../overmind"

export const Tables: React.FunctionComponent = () => {
    const {
        tables: {
            tables, isLoadingTables, hasLoadedTablesOnce
        },
        app: {
            languageLocale
        }
    } = useAppState()

    const { syncTables, toggleMoreOptions, changeTable, deleteTable, setIsEdit } = useActions().tables

    const [displayModal, setDisplayModal] = useState(false)
    const [tableNumber, setTableNumber] = useState("")
    const [tableCapacity, setTableCapacity] = useState(0)

    useEffect(() => {
        if (!hasLoadedTablesOnce)
            syncTables()
    }, [syncTables, hasLoadedTablesOnce])


    return (
        <div className="text-darkgrey">
            {displayModal && <AddTableModal setDisplayModal={setDisplayModal} />}
            <h1 className="text-2xl text-headline-black font-semibold">Tische</h1>
            <p className="text-lightgrey mr-3 mb-4 sm:mb-0">14 Gesamt</p>
            <div className="flex sm:justify-end items-end mb-5">
                {/* Filter TODO: Add Dropdown
                <div>
                    
                    <button className="text-lightgrey text-sm border border-border-grey rounded-xl mr-4 py-2 px-6">
                        Personenanzahl
                        <span className="text-headline-black font-semibold mx-3">Alle</span>
                        <span><FontAwesomeIcon icon={faChevronDown}></FontAwesomeIcon></span>
                    </button>
                    
                    <button className="text-lightgrey text-sm border border-border-grey rounded-xl mr-4 py-2 px-6">
                        Erstellt von
                        <span className="text-headline-black font-semibold mx-3">Admin</span>
                        <span><FontAwesomeIcon icon={faChevronDown}></FontAwesomeIcon></span>
                    </button>
                </div>*/}
                <div className="flex items-end">
                    <PrimaryButton icon={faPlus} content="Tisch hinzufügen" onClick={() => setDisplayModal(true)}></PrimaryButton>
                </div>
            </div>
            <table className="table-auto text-left whitespace-nowrap min-w-full">
                <thead className="bg-white-lightgrey">
                    <tr className="text-darkgrey text-xs tracking-widest uppercase">
                        <th className="text-center py-5 px-5">
                            <input type="checkbox" className="bg-checkbox-grey border border-transparent checked:bg-primary-blue checked:border-transparent" />
                        </th>
                        <th className="pr-10 lg:pr-0">
                            Tischnummer
                            <FontAwesomeIcon icon={faSort} className="ml-2"></FontAwesomeIcon>
                        </th>
                        <th className="pr-10 lg:pr-0">
                            <FontAwesomeIcon icon={faUsers} className="mr-2"></FontAwesomeIcon>
                            Personenanzahl
                            <FontAwesomeIcon icon={faSort} className="ml-2"></FontAwesomeIcon>
                        </th>
                        <th className="pr-20 lg:pr-0">Erstellt von</th>
                        <th className="pr-10 lg:pr-0">Aktionen</th>
                        <th className="text-center pr-5">
                            <button className="hover:text-gray-900 focus:hover:text-gray-900" onClick={() => syncTables()}>
                                <FontAwesomeIcon icon={faSyncAlt}></FontAwesomeIcon>
                            </button>
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-border-grey">
                    {
                        !isLoadingTables &&
                        tables.map((table, index) => (<tr key={index}>
                            <td className="text-center py-4"><input type="checkbox" className="bg-checkbox-grey border border-transparent checked:bg-primary-blue checked:border-transparent" /></td>
                            <td className="font-roboto font-semibold">
                                {table.isEdit ?
                                    <input type="text" id="tablenumber" name="tablenumber" value={tableNumber} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setTableNumber(event.target.value)} minLength={1} maxLength={8} placeholder="A1" className="font-roboto border border-border-grey rounded-xl w-28 pl-4 py-2" />
                                    : table.tableNumber
                                }
                            </td>
                            { /* TODO: Add icons depending of the person count */}
                            <td className="font-roboto font-semibold">
                                {table.isEdit ?
                                    <input type="number" id="tablecapacity" name="tablecapacity" value={tableCapacity} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setTableCapacity(parseInt(event.target.value))} min={1} max={100} placeholder="4" className="font-roboto border border-border-grey rounded-xl w-20 pl-4 py-2" />
                                    : table.capacity
                                }
                            </td>
                            <td>
                                <h5 className="font-semibold text-sm h-3">{table.createdBy}</h5>
                                <small className="text-lightgrey">erstellt am {table.updatedAt.toLocaleDateString(languageLocale)}</small>
                            </td>
                            <td className="text-lightgrey">
                                {table.isEdit ? <button onClick={() => {
                                    changeTable({ id: table.id, tableNumber: tableNumber, capacity: tableCapacity, updatedAt: new Date(), createdBy: "Da Burger" })
                                    setIsEdit(table.id)
                                }} className="text-primary-blue hover:text-primary-blue-hover focus:text-primary-blue-hover font-semibold mr-5">
                                    <FontAwesomeIcon icon={faCheck} className="mr-2"></FontAwesomeIcon>
                                    Speichern
                                </button> : <button onClick={() => {
                                    setIsEdit(table.id)
                                    setTableNumber(table.id)
                                    setTableCapacity(table.capacity)
                                }} className="hover:text-gray-500 focus:hover:text-gray-500 mr-5">
                                    <FontAwesomeIcon icon={faEdit} className="mr-2"></FontAwesomeIcon>
                                    Bearbeiten
                                </button>}
                                <div className="relative inline-block">
                                    {/* When dropdown open click outside close it */}
                                    {table.isMoreOptionsOpen && <div className="fixed inset-0 h-full w-full z-10" aria-hidden="true" onClick={() => toggleMoreOptions(table.id)}></div>}

                                    <button className="hover:text-gray-500 focus:hover:text-gray-500" onClick={() => { toggleMoreOptions(table.id) }}>
                                        <FontAwesomeIcon icon={faEllipsisV} className="mx-4"></FontAwesomeIcon>
                                    </button>
                                    {table.isMoreOptionsOpen && <div id="table-delete-dropdown" className="absolute origin-top-right right-0 z-20 bg-white rounded-lg shadow mt-2 w-30" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex={-1}>
                                        <div className="py-1" role="none">
                                            <button onClick={() => deleteTable(table.id)} className="block text-darkgrey hover:text-gray-500 focus:hover:text-gray-500 text-sm px-4 py-2" role="menuitem" tabIndex={-1} id="menu-item-0">
                                                <FontAwesomeIcon icon={faTrash} className="text-danger-red mr-3"></FontAwesomeIcon>
                                                Löschen
                                            </button>
                                        </div>
                                    </div>}
                                </div>
                            </td>
                        </tr>))

                    }
                </tbody>
            </table>
            {
                isLoadingTables &&
                <>
                    <FontAwesomeIcon icon={faCircleNotch} className="animate-spin mr-3"></FontAwesomeIcon>
                    <p className="text-semibold">Loading Tables</p>
                </>
            }
        </div >
    )
}