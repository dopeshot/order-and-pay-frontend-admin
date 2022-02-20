import { Status } from "../../types/status";

export type MenuDto = {
    title: string
    description: string
    isActive: boolean
}

export type Menu = {
    _id: string
    title: string
    description: string
    status: Status
    isActive: boolean
}