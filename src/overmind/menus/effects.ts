import { request } from "../../services/axios";
import { Status } from "../../services/shared";
import { Menu } from "./state";

export type MenuDto = {
    title: string
    description: string
    status: Status
    isActive: boolean
}

// Get all menus
export const getAllMenus = () => request.get<Menu[]>('/menus')
