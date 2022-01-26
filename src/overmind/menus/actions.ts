import { Context } from ".."

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
