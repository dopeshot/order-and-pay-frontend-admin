import { request } from "../../services/axios"
import { Table } from "./state"

export const getTables = async(): Promise<Table[]> => {
    const response = await request.get('/tables')
    
    return response.data.map((table: any) => ({...table, updatedAt: new Date(table.updatedAt)}))
}

export const createTable = async ({ tableNumber, capacity }: { tableNumber: string, capacity: number}): Promise<Table> => {
    const response = await request.post('/tables', {
        tableNumber: tableNumber, 
        capacity,
        createdBy: "Demo"
    })

    return {...response.data, updatedAt: new Date(response.data.updatedAt)}
}

export const updateTable = async ({ id, tableNumber, capacity }: { id: string, tableNumber: string, capacity: number}): Promise<Table> => {
    const response = await request.patch(`/tables/${id}`, {
        tableNumber: tableNumber,
        capacity,
        createdBy: "Demo"
    })

    return await {...response.data, updatedAt: new Date(response.data.updatedAt)}
}

export const deleteTable = async (id: string): Promise<void> => {
    await request.delete(`/tables/${id}`)
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