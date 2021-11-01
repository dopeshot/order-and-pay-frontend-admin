import { Context } from ".."
import { Table } from "./state"

export const syncTables = async ({ state }: Context) => {
    state.tables.hasLoadedTablesOnce = true
    state.tables.isLoadingTables = true
    state.tables.tables = await new Promise<Table[]>((resolve) => {
        setTimeout(() => {
            resolve([{ id: "mongoid", tableNumber: 1, capacity: 4 }, { id: "mongoid", tableNumber: 2, capacity: 2 }, { id: "mongoid", tableNumber: 3, capacity: 4 }])
        }, 500)
    })
    state.tables.isLoadingTables = false
}
