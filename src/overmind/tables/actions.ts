import { Context } from ".."
import { generateErrorMessage } from "../../services/error"
import { Table, TableDokument } from "./state"

export const loadTables = async ({ state, effects }: Context) => {
    state.tables.isLoadingTables = true
    try {
        const response = await effects.tables.getTables()
        const table = response.data.map((table: Table) => ({ ...table, updatedAt: new Date(table.updatedAt) }))
        state.tables.tables = table
        state.tables.tableErrors = []
    } catch (error) {
        generateErrorMessage(state, error, "tableErrors")
    }
    state.tables.isLoadingTables = false
}

export const createTable = async ({ state, effects }: Context, { tableNumber, capacity, setDisplayModal }: { tableNumber: string, capacity: number, setDisplayModal: (value: boolean) => void }) => {
    state.tables.isLoadingTables = true
    try {
        const response = await effects.tables.createTable({ tableNumber, capacity })
        const newTable = { ...response.data, updatedAt: new Date(response.data.updatedAt) }
        state.tables.tables = [...state.tables.tables, newTable]
        state.tables.modalErrors = []
        setDisplayModal(false)
    } catch (error) {
        generateErrorMessage(state, error, "modalErrors")
    }
    state.tables.isLoadingTables = false
}

export const updateTable = async ({ state, effects, actions }: Context, { id, tableNumber, capacity }: { id: string, tableNumber: string, capacity: number }) => {
    state.tables.isLoadingTables = true
    try {
        const response = await effects.tables.updateTable({ id, tableNumber, capacity })
        const updatedTable = { ...response.data, updatedAt: new Date(response.data.updatedAt) }
        const oldTable = state.tables.tables.find((table: Table) => table._id === id)!
        oldTable.capacity = updatedTable.capacity
        oldTable.tableNumber = updatedTable.tableNumber
        state.tables.tableErrors = []
    } catch (error) {
        generateErrorMessage(state, error, "tableErrors")
    }
    actions.tables.setIsEdit(id)
    state.tables.isLoadingTables = false
}

export const deleteTable = async ({ state, effects }: Context, id: string) => {
    try {
        await effects.tables.deleteTable(id)
        state.tables.tables = state.tables.tables.filter((table: Table) => table._id !== id)
        state.tables.tableErrors = []
    } catch (error) {
        generateErrorMessage(state, error, "tableErrors")
    }
}

export const setIsEdit = async ({ state }: Context, id: string) => {
    const tableToChange: TableDokument = state.tables.tables.find((table: Table) => table._id === id)!
    tableToChange.isEdit = !tableToChange.isEdit
}

export const toggleMoreOptions = async ({ state }: Context, id: string) => {
    const table: TableDokument = state.tables.tables.find((table: Table) => table._id === id)!
    table.isMoreOptionsOpen = !table.isMoreOptionsOpen
}


