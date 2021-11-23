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

export const addTable = async ({ state }: Context, table: Table) => {
    state.tables.tables = [...state.tables.tables, table]
}

export const changeTable = async ({ state }: Context, table: Table) => {
    const tableToChange = state.tables.tables.find(e => e.id === table.id)!
    Object.assign(tableToChange, table)
}

export const setIsEdit = async ({ state }: Context, id: string) => {
    const tableToChange = state.tables.tables.find(e => e.id === id)!
    tableToChange.isEdit = !tableToChange.isEdit
}

export const toggleMoreOptions = async({ state }: Context, id: string) => {
    console.log("Modal open for: " + id)
    const table = state.tables.tables.find(table => table.id === id)!
    table.isMoreOptionsOpen = !table.isMoreOptionsOpen
}

export const deleteTable = async({ state, actions }: Context, id: string) => {
    state.tables.tables = state.tables.tables.map(table => ({...table, isMoreOptionsOpen: false}))
    // Delete table
    state.tables.tables = state.tables.tables.filter(table => table.id !== id)
}


