import { Context } from ".."
import { MenuDto } from "./effects"

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