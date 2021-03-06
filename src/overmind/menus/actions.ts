import axios from "axios"
import { Context } from ".."
import { Menu, MenuDto } from "./type"

/**
 * Get all Menus request with error handling
 */
export const getAllMenus = async ({ state, actions, effects }: Context): Promise<void> => {
    try {
        const response = await effects.menus.getAllMenus()
        const menus = response.data
        state.menus.menus = menus
    } catch (error) /* istanbul ignore next // should not happen just fallback */ {
        console.error(error)

        actions.notify.createNotification({
            title: "Fehler beim Laden der Menüs",
            message: axios.isAxiosError(error) && error.response ? error.response.data.message : "Netzwerk-Zeitüberschreitung",
            type: "danger"
        })

        throw (error)
    }
}

/**
 * Create a menu request with error handling
 */
export const createMenu = async ({ effects, actions }: Context, menu: MenuDto): Promise<true> => {
    try {
        // We just await the creation no need to update menu object
        await effects.menus.createMenu(menu)
        return true
    } catch (error) {
        console.error(error)

        actions.notify.createNotification({
            title: "Fehler beim Erstellen des Menus",
            message: axios.isAxiosError(error) && error.response ? error.response.data.message : "Netzwerk-Zeitüberschreitung",
            type: "danger"
        })

        throw (error)
    }
}

/**
 * Get menu by id request with error handling
 */
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

/**
 * Update menu by id request with error handling
 */
export const updateMenu = async ({ effects, actions }: Context, { menuId, menu }: { menuId: string, menu: MenuDto }): Promise<true> => {
    try {
        // We just await the update no need to update menu object
        await effects.menus.updateMenu(menuId, menu)
        return true
    } catch (error) {
        console.error(error)

        actions.notify.createNotification({
            title: "Fehler beim Aktualisieren des Menus",
            message: axios.isAxiosError(error) && error.response ? error.response.data.message : "Netzwerk-Zeitüberschreitung",
            type: "danger"
        })

        throw (error)
    }
}

/**
 * Delete a menu request with error handling
 */
export const deleteMenu = async ({ effects, actions }: Context, id: string): Promise<true> => {
    try {
        // We just await the deletion no need to update menu object
        await effects.menus.deleteMenu(id)
        return true
    } catch (error) /* istanbul ignore next // should not happen just fallback */ {
        console.error(error)

        actions.notify.createNotification({
            title: "Fehler beim Löschen des Menus",
            message: axios.isAxiosError(error) && error.response ? error.response.data.message : "Netzwerk-Zeitüberschreitung",
            type: "danger"
        })

        throw (error)
    }
}