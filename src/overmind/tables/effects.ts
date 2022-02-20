import { request } from "../../services/axios"
import { Table } from "./state"

// Get all tables
export const getTables = () => request.get<Table[]>('/tables')

// Post a table
export const createTable = ({ tableNumber, capacity }: { tableNumber: string, capacity: number }) => request.post<Table>('/tables', {
    tableNumber: tableNumber,
    capacity,
    author: "Demo"
})

// Update a table
export const updateTable = ({ id, tableNumber, capacity }: { id: string, tableNumber: string, capacity: number }) => request.patch<Table>(`/tables/${id}`, {
    tableNumber: tableNumber,
    capacity,
    author: "Demo"
})

// Delete a table
export const deleteTable = (id: string): Promise<void> => request.delete(`/tables/${id}`)

export const bulkDelete = (idArray: string[]): Promise<void> => request.delete('/tables/bulk/delete', {
    data: {
        ids: idArray
    }
})