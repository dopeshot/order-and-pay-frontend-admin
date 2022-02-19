import axios from "axios"
import { config, Context } from ".."
import { InitialTableHelper, Table, TableDocument } from "./state"

export const loadTables = async ({ state, effects, actions }: Context) => {
    state.tables.isLoadingTables = true
    try {
        const response = await effects.tables.getTables()
        const tables = response.data.map<TableDocument>((table: Table) => ({ ...table, updatedAt: new Date(table.updatedAt), ...InitialTableHelper }))
        state.tables.tables = tables.sort((a, b) => a.tableNumber.localeCompare(b.tableNumber))
    } catch (error) {
        actions.notify.createNotification({
            title: "Fehler beim Laden der Tische",
            message: axios.isAxiosError(error) && error.response ? error.response.data.message : "Netzwerk-Zeitüberschreitung",
            type: "danger"
        })
    }
    state.tables.isLoadingTables = false
}

export const createTable = async ({ state, effects, actions }: Context, { tableNumber, capacity }: { tableNumber: string, capacity: number }): Promise<boolean> => {
    try {
        const response = await effects.tables.createTable({ tableNumber, capacity })
        const newTable = { ...response.data, updatedAt: new Date(response.data.updatedAt), ...InitialTableHelper }
        state.tables.tables = [...state.tables.tables, newTable]
        return true
    } catch (error) {
        actions.notify.createNotification({
            title: "Fehler beim Erstellen des Tisches",
            message: axios.isAxiosError(error) && error.response ? error.response.data.message : "Netzwerk-Zeitüberschreitung",
            type: "danger"
        })
    }
    return false
}

export const updateTable = async ({ state, effects, actions }: Context, { id, tableNumber, capacity }: { id: string, tableNumber: string, capacity: number }): Promise<boolean> => {
    try {
        const response = await effects.tables.updateTable({ id, tableNumber, capacity })
        const updatedTable = { ...response.data, updatedAt: new Date(response.data.updatedAt) }
        const oldTable = state.tables.tables.find((table: Table) => table._id === id)!
        oldTable.capacity = updatedTable.capacity
        oldTable.tableNumber = updatedTable.tableNumber
        return true
    } catch (error) {
        actions.notify.createNotification({
            title: "Fehler beim Aktualisieren des Tisches",
            message: axios.isAxiosError(error) && error.response ? error.response.data.message : "Netzwerk-Zeitüberschreitung",
            type: "danger"
        })
    }
    return false
}

export const deleteTable = async ({ state, effects, actions }: Context, id: string) => {
    try {
        await effects.tables.deleteTable(id)
        state.tables.tables = state.tables.tables.filter((table: Table) => table._id !== id)
    } catch (error) {
        actions.notify.createNotification({
            title: "Fehler beim Löschen des Tisches",
            message: axios.isAxiosError(error) && error.response ? error.response.data.message : "Netzwerk-Zeitüberschreitung",
            type: "danger"
        })
    }
}

export const toggleChecked = async ({ state }: Context, id: string) => {
    const table: TableDocument = state.tables.tables.find((table: Table) => table._id === id)!
    table.isChecked = !table.isChecked
}

export const bulkTableSelection = async ({ state }: Context) => {
    let someTableIsChecked = false
    let setTablesTo = true

    if (state.tables.tables.some(table => table.isChecked))
        someTableIsChecked = true

    if (someTableIsChecked)
        setTablesTo = false

    state.tables.tables.forEach(table => table.isChecked = setTablesTo)
}

export const sortTable = async ({ state }: Context, sortedField: typeof config.state.tables.sort.currentField) => {
    // If you click again
    if (state.tables.sort.currentField === sortedField) {
        if (state.tables.sort.currentField === 'tableNumber')
            state.tables.sort.sortDirection.tableNumber = state.tables.sort.sortDirection.tableNumber === 'ASC' ? 'DESC' : 'ASC'
        else if (state.tables.sort.currentField === 'capacity')
            state.tables.sort.sortDirection.capacity = state.tables.sort.sortDirection.capacity === 'ASC' ? 'DESC' : 'ASC'
    }

    state.tables.sort.currentField = sortedField

    switch (state.tables.sort.currentField) {
        case 'capacity':
            if (state.tables.sort.sortDirection.capacity === 'ASC')
                state.tables.tables = state.tables.tables.sort((a, b) => a.capacity - b.capacity)
            else
                state.tables.tables = state.tables.tables.sort((a, b) => b.capacity - a.capacity)
            break;
        case 'tableNumber':
            if (state.tables.sort.sortDirection.tableNumber === 'ASC')
                state.tables.tables = state.tables.tables.sort((a, b) => a.tableNumber.localeCompare(b.tableNumber))
            else
                state.tables.tables = state.tables.tables.sort((a, b) => b.tableNumber.localeCompare(a.tableNumber))
            break;
    }
}

export const bulkDelete = async ({ state, effects, actions }: Context) => {
    try {
        const idArray: string[] = []
        await state.tables.tables.forEach(e => {
            if (e.isChecked) {
                idArray.push(e._id)
                state.tables.tables = state.tables.tables.filter((table: Table) => table._id !== e._id)
            }
        })

        await effects.tables.bulkDelete(idArray)
    } catch (error) {
        actions.notify.createNotification({
            title: "Fehler beim Löschen der Tische",
            message: axios.isAxiosError(error) && error.response ? error.response.data.message : "Netzwerk-Zeitüberschreitung",
            type: "danger"
        })
    }
}