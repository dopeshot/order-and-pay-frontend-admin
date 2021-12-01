import { derived } from "overmind"

export type Table = {
    _id: string,
    tableNumber: string,
    capacity: number,
    updatedAt: Date,
    createdBy: string
}

export type TableHelper = {
    isMoreOptionsOpen?: boolean,
    isEdit?: boolean,
}

export type TableDokument = Table & TableHelper

export type State = {
    isLoadingTables: boolean,
    modalErrors: string[],
    tableErrors: string[],
    hasModalError: boolean,
    hasTableError: boolean,
    tables: Table[]
}

export const state: State = {
    isLoadingTables: false,
    modalErrors: [],
    tableErrors: [],
    hasModalError: derived((state: State) => state.modalErrors.length !== 0),
    hasTableError: derived((state: State) => state.tableErrors.length !== 0),
    tables: []
}