import { faChevronDown, faCircleNotch, faEdit, faEllipsisV, faPlus, faSort, faSyncAlt, faUsers } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import { AddTableModal } from "../../components/AddTableModal/AddTableModal"
import { useActions, useAppState } from "../../overmind"

export const Tables: React.FunctionComponent = () => {
    const { tables, isLoadingTables, hasLoadedTablesOnce } = useAppState().tables
    const { syncTables } = useActions().tables
    const [displayModal, setDisplayModal] = useState(false)

    useEffect(() => {
        if (!hasLoadedTablesOnce)
            syncTables()
    }, [syncTables, hasLoadedTablesOnce])


    return (
        <div className="text-darkgrey">
            {displayModal && <AddTableModal setDisplayModal={setDisplayModal} /> }
            <h1 className="text-2xl text-headline-black font-semibold mb-5">Tische</h1>
            <div className="flex justify-between items-end mb-5">
                <div>
                    {/* Filter TODO: Add Dropdown */}
                    <button className="text-lightgrey text-sm border border-border-grey rounded-xl mr-4 py-2 px-6">
                        Personenanzahl
                        <span className="text-headline-black font-semibold mx-3">Alle</span>
                        <span><FontAwesomeIcon icon={faChevronDown}></FontAwesomeIcon></span>
                    </button>
                    {/* Filter End */}
                    <button className="text-lightgrey text-sm border border-border-grey rounded-xl mr-4 py-2 px-6">
                        Erstellt von
                        <span className="text-headline-black font-semibold mx-3">Admin</span>
                        <span><FontAwesomeIcon icon={faChevronDown}></FontAwesomeIcon></span>
                    </button>
                </div>
                <div className="flex items-end">
                    <p className="text-lightgrey mr-3">14 Tische</p>
                    <button onClick={() => setDisplayModal(true)} className="bg-primary-blue text-white font-semibold border border-transparent rounded-xl py-2 px-8">
                        <FontAwesomeIcon icon={faPlus} className="text-sm mr-3"></FontAwesomeIcon>
                        Tisch hinzufügen
                    </button>
                </div>
            </div>
            <table className="table-auto text-left whitespace-nowrap min-w-full">
                <thead className="bg-white-lightgrey">
                    <tr className="text-darkgrey text-xs tracking-widest uppercase">
                        <th className="text-center py-5">
                            <input type="checkbox" className="bg-checkbox-grey border border-transparent checked:bg-primary-blue checked:border-transparent" />
                        </th>
                        <th>
                            Tischnummer
                            <FontAwesomeIcon icon={faSort} className="ml-2"></FontAwesomeIcon>
                        </th>
                        <th>
                            <FontAwesomeIcon icon={faUsers} className="mr-2"></FontAwesomeIcon>
                            Personenanzahl
                            <FontAwesomeIcon icon={faSort} className="ml-2"></FontAwesomeIcon>
                        </th>
                        <th>Erstellt von</th>
                        <th>Aktionen</th>
                        <th className="text-center">
                            <button onClick={() => syncTables()}>
                                <FontAwesomeIcon icon={faSyncAlt}></FontAwesomeIcon>
                            </button>
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-border-grey">
                    {isLoadingTables ?
                        (<tr className="text-lightgrey">
                            <td className="flex items-center">
                                {/* TODO: Design Loading */}
                                <FontAwesomeIcon icon={faCircleNotch} className="animate-spin mr-3"></FontAwesomeIcon>
                                <p className="text-semibold">Loading Tables</p>
                            </td>
                        </tr>)
                        :
                        (<>
                            {
                                tables.map((table, index) => (<tr key={index}>
                                    <td className="text-center py-4"><input type="checkbox" className="bg-checkbox-grey border border-transparent checked:bg-primary-blue checked:border-transparent" /></td>
                                    <td className="font-roboto font-semibold">{table.tableNumber}</td>
                                    { /* TODO: Add icons depending of the person count */}
                                    <td className="font-roboto font-semibold">{table.capacity}</td>
                                    <td>
                                        <h5 className="font-semibold text-sm h-3">{table.createdBy}</h5>
                                        <small className="text-lightgrey">erstellt am {table.updatedAt.toLocaleDateString('de-DE')}</small>
                                    </td>
                                    <td className="text-lightgrey">
                                            <button className="mr-5">
                                                <FontAwesomeIcon icon={faEdit} className="mr-3"></FontAwesomeIcon>
                                                Bearbeiten
                                            </button>
                                            {/* TODO: Dropdown */}
                                            <button>
                                                <FontAwesomeIcon icon={faEllipsisV}></FontAwesomeIcon>
                                            </button>
                                    </td>
                                </tr>))
                            }
                        </>)}
                </tbody>
            </table>
        </div>
    )
}