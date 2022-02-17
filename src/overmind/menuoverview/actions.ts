import { Context } from ".."

export const getMenuEditor = async ({ state, effects }: Context, id: string): Promise<void> => {
    // Backoff when already loading
    if (state.menuoverview.isLoadingMenu)
        return

    state.menuoverview.isLoadingMenu = true
    try {
        const response = await effects.menuoverview.getMenuEditorOverview(id)
        const menu = response.data
        state.menuoverview.menu = menu
    } catch (error) {
        console.error(error)
    }
    state.menuoverview.isLoadingMenu = false
}
