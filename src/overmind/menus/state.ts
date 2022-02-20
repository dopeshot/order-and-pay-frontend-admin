import { Status } from "../../types/Sstatus"

export type Menu = {
    _id: string
    title: string
    description: string
    status: Status
    isActive: boolean
}

export type State = {
    menus: Menu[]
}

export const state: State = {
    menus: []
}