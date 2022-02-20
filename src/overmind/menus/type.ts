import { Status } from "../../types/status";
import { CategoryPopulated } from "../categories/type";

export type MenuDto = {
    title: string
    description: string
    isActive: boolean
    status?: Status
}

export type Menu = {
    _id: string
    title: string
    description: string
    status: Status
    isActive: boolean
}

export type MenuPopulated = {
    _id: string
    title: string
    description?: string
    status?: Status
    isActive?: boolean
    categories: CategoryPopulated[]
}