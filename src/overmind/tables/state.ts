import { derived } from "overmind"

export type Table = {
    _id: string,
    tableNumber: string,
    capacity: number,
    updatedAt: Date,
    createdAt: Date
}

export type TableHelper = {
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
    isCheckedAll: boolean,
    checkedCount: number,
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
    isCheckedAll: derived((state: State) => state.tables.length !== 0 && !state.tables.some(table => !table.isChecked)),
    checkedCount: derived((state: State) => state.tables.filter(table => table.isChecked).length),
    sort: {
        currentField: 'tableNumber',
        sortDirection: {
            tableNumber: 'ASC',
            capacity: 'ASC'
        }
    }
}