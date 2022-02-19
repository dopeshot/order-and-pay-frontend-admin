import { Context } from ".."
import { MenuDto } from "./effects"
import { Menu } from "./state"

export const getAllMenus = async ({ state, effects }: Context): Promise<Menu[] | undefined> => {
    // istanbul ignore next // Backoff when already loading
    if (state.menus.isLoadingMenus)
        return

    state.menus.isLoadingMenus = true
    try {
        const response = await effects.menus.getAllMenus()
        const menus = response.data
        state.menus.menus = menus
    } catch (error) /* istanbul ignore next // should not happen just fallback */ {
        console.error(error)
        throw (error)
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
        throw (error)
    }
}

// Get menu by id action
export const getMenuById = async ({ state, effects }: Context, id: string): Promise<Menu> => {
    try {
        const response = await effects.menus.getMenuById(id)
        const menu = response.data
        return menu
    } catch (error) /* istanbul ignore next // should not happen just fallback */ {
        console.error(error)
        throw (error)
    }
}

// Update menu by id action
export const updateMenu = async ({ effects }: Context, { menuId, menu }: { menuId: string, menu: MenuDto }): Promise<boolean> => {
    try {
        // We just await the update no need to update menu object
        await effects.menus.updateMenu(menuId, menu)
        return true
    } catch (error) {
        console.error(error)
        throw (error)
    }
}

// Delete menu by id action
export const deleteMenu = async ({ effects }: Context, id: string): Promise<boolean> => {
    try {
        // We just await the deletion no need to update menu object
        await effects.menus.deleteMenu(id)
        return true
    } catch (error) /* istanbul ignore next // should not happen just fallback */ {
        console.error(error)
        throw (error)
    }
}