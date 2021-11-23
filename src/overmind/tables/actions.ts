import { Context } from ".."
import { Table } from "./state"

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

export const changeTable = async ({ state }: Context, table: Table) => {
    const tableToChange = state.tables.tables.find(e => e._id === table._id)!
    Object.assign(tableToChange, table)
}

export const setIsEdit = async ({ state }: Context, id: string) => {
    const tableToChange = state.tables.tables.find(e => e._id === id)!
    tableToChange.isEdit = !tableToChange.isEdit
}

export const toggleMoreOptions = async({ state }: Context, id: string) => {
    const table = state.tables.tables.find(table => table._id === id)!
    table.isMoreOptionsOpen = !table.isMoreOptionsOpen
}


