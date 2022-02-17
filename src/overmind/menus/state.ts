import { Status } from "../../services/shared"

export type Menu = {
    _id: string
    title: string
    description: string
    status: Status
    isActive: boolean
}

export type State = {
    isLoadingMenus: boolean
    menus: Menu[]
}

export const state: State = {
    isLoadingMenus: false,
    menus: []
}