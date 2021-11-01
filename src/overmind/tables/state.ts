export type Table = {
    id: string,
    tableNumber: number,
    capacity: number
}

export type State = {
    isLoadingTables: boolean,
    hasLoadedTablesOnce: boolean,
    tables: Table[]
}

export const state: State = {
    isLoadingTables: false,
    hasLoadedTablesOnce: false,
    tables: []
}