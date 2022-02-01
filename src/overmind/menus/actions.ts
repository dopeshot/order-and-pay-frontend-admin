import { Context } from ".."
import { MenuDto } from "./effects"
import { Menu } from "./state"

export const getAllMenus = async ({ state, effects }: Context) => {
    // Backoff when already loading
    if (state.menus.isLoadingMenus)
        return

    state.menus.isLoadingMenus = true
    try {
        const response = await effects.menus.getAllMenus()
        const menus = response.data
        state.menus.menus = menus
    } catch (error) {
        console.error(error)
    }
    state.menus.isLoadingMenus = false
}

// Create menu action
export const createMenu = async ({ effects }: Context, menu: MenuDto): Promise<boolean> => {
    try {
        // We just await the creation no need to update menu object
        await effects.menus.createMenu(menu)
        return true
    } catch (error) {
        console.error(error)
        return false
    }
}

// Get menu by id action
export const getMenuById = async ({ state, effects }: Context, id: string): Promise<Menu | null> => {
    try {
        const response = await effects.menus.getMenuById(id)
        const menu = response.data
        return menu
    } catch (error) {
        console.error(error)
        return null
    }
}

// Update menu by id action
export const updateMenu = async ({ effects }: Context, { id, menu }: { id: string, menu: MenuDto }): Promise<boolean> => {
    try {
        // We just await the update no need to update menu object
        await effects.menus.updateMenu(id, menu)
        return true
    } catch (error) {
        console.error(error)
        return false
    }
}

// Delete menu by id action
export const deleteMenu = async ({ effects }: Context, id: string): Promise<boolean> => {
    try {
        // We just await the deletion no need to update menu object
        await effects.menus.deleteMenu(id)
        return true
    } catch (error) {
        console.error(error)
        return false
    }
}