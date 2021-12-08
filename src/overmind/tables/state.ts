import { derived } from "overmind"

export type Table = {
    _id: string,
    tableNumber: string,
    capacity: number,
    updatedAt: Date,
    createdBy: string
}

export type TableHelper = {
    isMoreOptionsOpen: boolean,
    isEdit: boolean,
    isChecked: boolean
}

export const InitialTableHelper = {
    isChecked: false, 
    isMoreOptionsOpen: false, 
    isEdit: false
}

export type TableDocument = Table & TableHelper

export type State = {
    isLoadingTables: boolean,
    modalErrors: string[],
    tableErrors: string[],
    hasModalError: boolean,
    hasTableError: boolean,
    isCheckedAll: boolean,
    tables: TableDocument[],
    sort: {
        currentField: String,
        sortDirection: {
            tableNumber: 'ASC' | 'DESC',
            capacity: 'ASC' | 'DESC'
        }
    }
}

export const state: State = {
    isLoadingTables: false,
    tables: [],
    modalErrors: [],
    tableErrors: [],
    hasModalError: derived((state: State) => state.modalErrors.length !== 0),
    hasTableError: derived((state: State) => state.tableErrors.length !== 0),
    isCheckedAll: derived((state: State) => !state.tables.some(table => !table.isChecked)),
    sort: {
        currentField: 'tableNumber',
        sortDirection: {
            tableNumber: 'ASC',
            capacity: 'ASC'
        }
    }
}