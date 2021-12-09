import { request } from "../../services/axios"
import { Table } from "./state"

export const getTables = () => request.get<Table[]>('/tables')

export const createTable = ({ tableNumber, capacity }: { tableNumber: string, capacity: number }) => request.post<Table>('/tables', {
    tableNumber: tableNumber,
    capacity,
    createdBy: "Demo"
})

export const updateTable = ({ id, tableNumber, capacity }: { id: string, tableNumber: string, capacity: number }) => request.patch<Table>(`/tables/${id}`, {
    tableNumber: tableNumber,
    capacity,
    createdBy: "Demo"
})

export const deleteTable = (id: string): Promise<void> => request.delete(`/tables/${id}`)

export const getTablesMock = async (): Promise<Table[]> => {
    return await new Promise<Table[]>((resolve) => {
        setTimeout(() => {
            resolve([
                { _id: "1", tableNumber: "1", capacity: 4, updatedAt: new Date("2021-11-23T18:03:44.101Z"), createdBy: "Admin" },
            ])
        }, 20)
    })
}