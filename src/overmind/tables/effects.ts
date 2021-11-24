import { Config } from "../../config.global"
import { Table } from "./state"

export const getTables = async (): Promise<Table[]> => {
    const data = await fetch(`${Config.api.baseApiUrl}/tables`)
    const tables: any = await data.json()

    return tables.map((table: any) => ({...table, updatedAt: new Date(table.updatedAt)}))
}


export const createTable = async ({ tableNumber, capacity }: { tableNumber: string, capacity: number}): Promise<Table> => {
    const data = await fetch(`${Config.api.baseApiUrl}/tables`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            tableNumber: parseInt(tableNumber), // TODO MC: Here we have to discuss if numbers or strings
            capacity,
            createdBy: "Demo"
        })
    })
    const newTable = await data.json()
    return await {...newTable, updatedAt: new Date(newTable.updatedAt)}
}

export const updateTable = async ({ id, tableNumber, capacity }: { id: string, tableNumber: string, capacity: number}): Promise<Table> => {
    const data = await fetch(`${Config.api.baseApiUrl}/tables/${id}`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            tableNumber: parseInt(tableNumber), // TODO MC: Here we have to discuss if numbers or strings
            capacity,
            createdBy: "Demo"
        })
    })

    const updatedTable = await data.json()
    return await {...updatedTable, updatedAt: new Date(updatedTable.updatedAt)}
}

export const deleteTable = async (id: string): Promise<void> => {
    await await fetch(`${Config.api.baseApiUrl}/tables/${id}`, {
        method: 'DELETE'
    })
}

export const getTablesMock = async (): Promise<Table[]> => {
    return await new Promise<Table[]>((resolve) => {
        setTimeout(() => {
            resolve([
                { _id: "1", tableNumber: "1", capacity: 4, updatedAt: new Date("2021-11-23T18:03:44.101Z"), createdBy: "Admin" }, 
            ])
        }, 20)
    })
}