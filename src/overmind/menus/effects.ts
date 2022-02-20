import { request } from "../../services/axios";
import { Menu, MenuDto } from "./type";

// Get all menus
export const getAllMenus = () => request.get<Menu[]>('/menus')
// Create a Menu
export const createMenu = (createMenuDto: MenuDto) => request.post<Menu>('/menus', createMenuDto)
// Get a menu by id 
export const getMenuById = (id: string) => request.get<Menu>(`/menus/${id}`)
// Update a Menu
export const updateMenu = (id: string, createMenuDto: MenuDto) => request.patch<Menu>(`/menus/${id}`, createMenuDto)
// Delete a menu by id 
export const deleteMenu = (id: string) => request.delete(`/menus/${id}?type=hard`)