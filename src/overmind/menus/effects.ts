import { request } from "../../services/axios";
import { Menu } from "./state";

export type MenuDto = {
    title: string
    description: string
    isActive: boolean
}

// Get all menus
export const getAllMenus = () => request.get<Menu[]>('/menus')
