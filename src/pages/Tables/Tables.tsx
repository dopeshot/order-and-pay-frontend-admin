import { useEffect } from "react"
import { useActions, useAppState } from "../../overmind"

export const Tables: React.FunctionComponent = () => {
    const { tables, isLoadingTables, hasLoadedTablesOnce } = useAppState().tables
    const { syncTables } = useActions().tables

    useEffect(() => {
        if (!hasLoadedTablesOnce)
            syncTables()
    }, [syncTables, hasLoadedTablesOnce])

    return (
        <div>
            <h1>Loading tables...Loading tLoading tables...Loading tables...Loading tables...Loading tables...Loading tables...Loading tables...Loading tables...Loading tables.. tables...Loading tables.. tables...Loading tables.. tables...Loading tables.. tables...Loadingoading tables...Loading tables...Loading toading tables...Loading tables...Loading toading tables...Loading tables...Loading toading tables...Loading tables...Loading toading tables...Loading tables...Loading toading tables...Loading tables...Loading toading tables...Loading tables...Loading toading tables...Loading tables...Loading toading tables...Loading tables...Loading toading tables...Loading tables...Loading t.</h1>
            {isLoadingTables ? <p><svg className="inline animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>Loading tables...</p> : (<>
                <button onClick={() => syncTables()} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Refresh</button>
                <table className="table-fixed">
                    <thead className="bg-indigo-200">
                        <tr>
                            <th className="w-1/6">Id</th>
                            <th className="w-1/6">Tischnummer</th>
                            <th className="w-1/6"><svg xmlns="http://www.w3.org/2000/svg" className="inline h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg> Anzahl der Personen</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tables.map((table, index) => (<tr key={index}>
                            <td>{table.id}</td>
                            <td className="text-right">{table.tableNumber}</td>
                            <td className="text-right">{table.capacity}</td>
                        </tr>))}
                    </tbody>
                </table>
            </>)}
            {isLoadingTables ? <p><svg className="inline animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>Loading tables...</p> : (<>
                <button onClick={() => syncTables()} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Refresh</button>
                <table className="table-fixed">
                    <thead className="bg-indigo-200">
                        <tr>
                            <th className="w-1/6">Id</th>
                            <th className="w-1/6">Tischnummer</th>
                            <th className="w-1/6"><svg xmlns="http://www.w3.org/2000/svg" className="inline h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg> Anzahl der Personen</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tables.map((table, index) => (<tr key={index}>
                            <td>{table.id}</td>
                            <td className="text-right">{table.tableNumber}</td>
                            <td className="text-right">{table.capacity}</td>
                        </tr>))}
                    </tbody>
                </table>
            </>)}
            {isLoadingTables ? <p><svg className="inline animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>Loading tables...</p> : (<>
                <button onClick={() => syncTables()} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Refresh</button>
                <table className="table-fixed">
                    <thead className="bg-indigo-200">
                        <tr>
                            <th className="w-1/6">Id</th>
                            <th className="w-1/6">Tischnummer</th>
                            <th className="w-1/6"><svg xmlns="http://www.w3.org/2000/svg" className="inline h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg> Anzahl der Personen</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tables.map((table, index) => (<tr key={index}>
                            <td>{table.id}</td>
                            <td className="text-right">{table.tableNumber}</td>
                            <td className="text-right">{table.capacity}</td>
                        </tr>))}
                    </tbody>
                </table>
            </>)}
            {isLoadingTables ? <p><svg className="inline animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>Loading tables...</p> : (<>
                <button onClick={() => syncTables()} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Refresh</button>
                <table className="table-fixed">
                    <thead className="bg-indigo-200">
                        <tr>
                            <th className="w-1/6">Id</th>
                            <th className="w-1/6">Tischnummer</th>
                            <th className="w-1/6"><svg xmlns="http://www.w3.org/2000/svg" className="inline h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg> Anzahl der Personen</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tables.map((table, index) => (<tr key={index}>
                            <td>{table.id}</td>
                            <td className="text-right">{table.tableNumber}</td>
                            <td className="text-right">{table.capacity}</td>
                        </tr>))}
                    </tbody>
                </table>
            </>)}
            {isLoadingTables ? <p><svg className="inline animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>Loading tables...</p> : (<>
                <button onClick={() => syncTables()} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Refresh</button>
                <table className="table-fixed">
                    <thead className="bg-indigo-200">
                        <tr>
                            <th className="w-1/6">Id</th>
                            <th className="w-1/6">Tischnummer</th>
                            <th className="w-1/6"><svg xmlns="http://www.w3.org/2000/svg" className="inline h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg> Anzahl der Personen</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tables.map((table, index) => (<tr key={index}>
                            <td>{table.id}</td>
                            <td className="text-right">{table.tableNumber}</td>
                            <td className="text-right">{table.capacity}</td>
                        </tr>))}
                    </tbody>
                </table>
            </>)}
            {isLoadingTables ? <p><svg className="inline animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>Loading tables...</p> : (<>
                <button onClick={() => syncTables()} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Refresh</button>
                <table className="table-fixed">
                    <thead className="bg-indigo-200">
                        <tr>
                            <th className="w-1/6">Id</th>
                            <th className="w-1/6">Tischnummer</th>
                            <th className="w-1/6"><svg xmlns="http://www.w3.org/2000/svg" className="inline h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg> Anzahl der Personen</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tables.map((table, index) => (<tr key={index}>
                            <td>{table.id}</td>
                            <td className="text-right">{table.tableNumber}</td>
                            <td className="text-right">{table.capacity}</td>
                        </tr>))}
                    </tbody>
                </table>
            </>)}
            {isLoadingTables ? <p><svg className="inline animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>Loading tables...</p> : (<>
                <button onClick={() => syncTables()} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Refresh</button>
                <table className="table-fixed">
                    <thead className="bg-indigo-200">
                        <tr>
                            <th className="w-1/6">Id</th>
                            <th className="w-1/6">Tischnummer</th>
                            <th className="w-1/6"><svg xmlns="http://www.w3.org/2000/svg" className="inline h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg> Anzahl der Personen</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tables.map((table, index) => (<tr key={index}>
                            <td>{table.id}</td>
                            <td className="text-right">{table.tableNumber}</td>
                            <td className="text-right">{table.capacity}</td>
                        </tr>))}
                    </tbody>
                </table>
            </>)}
            {isLoadingTables ? <p><svg className="inline animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>Loading tables...</p> : (<>
                <button onClick={() => syncTables()} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Refresh</button>
                <table className="table-fixed">
                    <thead className="bg-indigo-200">
                        <tr>
                            <th className="w-1/6">Id</th>
                            <th className="w-1/6">Tischnummer</th>
                            <th className="w-1/6"><svg xmlns="http://www.w3.org/2000/svg" className="inline h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg> Anzahl der Personen</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tables.map((table, index) => (<tr key={index}>
                            <td>{table.id}</td>
                            <td className="text-right">{table.tableNumber}</td>
                            <td className="text-right">{table.capacity}</td>
                        </tr>))}
                    </tbody>
                </table>
            </>)}
        </div>
    )
}