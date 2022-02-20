import { Status } from "../../types/Status"

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