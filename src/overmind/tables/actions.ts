import { Context } from ".."
import { TableDokument } from "./state"

export const loadTables = async ({ state, effects }: Context) => {
    state.tables.isLoadingTables = true
    try {
        state.tables.tables = await effects.tables.getTables()
    } catch(error) {
        console.error(error)
    }
    state.tables.isLoadingTables = false
}

export const createTable = async ({ state, effects }: Context, { tableNumber, capacity }: { tableNumber: string, capacity: number}) => {
    state.tables.isLoadingTables = true
    try {
        const newTable = await effects.tables.createTable({ tableNumber, capacity })
        state.tables.tables = [...state.tables.tables, newTable]
    } catch(error) {
        console.error(error)
    }
    state.tables.isLoadingTables = false
}

export const deleteTable = async ({state, effects}: Context, id: string) => {
    try {
        await effects.tables.deleteTable(id)
        state.tables.tables = state.tables.tables.filter(table => table._id !== id)
    } catch(error) {
        console.error(error)
    }
}

export const updateTable = async ({state, effects, actions}: Context, { id, tableNumber, capacity }: { id: string, tableNumber: string, capacity: number}) => {
    try {
        const updatedTable = await effects.tables.updateTable({ id, tableNumber, capacity })
        const oldTable = state.tables.tables.find(table => table._id === id)!
        oldTable.capacity = updatedTable.capacity
        oldTable.tableNumber = updatedTable.tableNumber
    } catch(error) {
        console.error(error)
    }
    actions.tables.setIsEdit(id)
}

export const setIsEdit = async ({ state }: Context, id: string) => {
    const tableToChange: TableDokument = state.tables.tables.find(e => e._id === id)!
    tableToChange.isEdit = !tableToChange.isEdit
}

export const toggleMoreOptions = async({ state }: Context, id: string) => {
    const table: TableDokument = state.tables.tables.find(table => table._id === id)!
    table.isMoreOptionsOpen = !table.isMoreOptionsOpen
}


