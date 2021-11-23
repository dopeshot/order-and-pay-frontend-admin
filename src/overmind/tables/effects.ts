import { Config } from "../../config.global"
import { Table } from "./state"

export const getTables = async (): Promise<Table[]> => {
    const data = await fetch(`${Config.api.baseApiUrl}/tables`)
    const tables: any = await data.json()

    return tables.map((table: any) => ({...table, updatedAt: new Date(table.updatedAt)}))
}


export const getTablesMock = async (): Promise<Table[]> => {
    return await new Promise<Table[]>((resolve) => {
        setTimeout(() => {
            resolve([
                { id: "1", tableNumber: "1", capacity: 4, updatedAt: new Date("2021-11-23T18:03:44.101Z"), createdBy: "Admin" }, 
            ])
        }, 20)
    })
}