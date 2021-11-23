export type Table = {
    id: string,
    tableNumber: string,
    capacity: number,
    updatedAt: Date,
    createdBy: string,
    isMoreOptionsOpen?: boolean,
    isEdit?: boolean
}

export type State = {
    isLoadingTables: boolean,
    tables: Table[]
}

export const state: State = {
    isLoadingTables: false,
    tables: []
}