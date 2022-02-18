import { Context } from ".."

export const getMenuEditor = async ({ state, effects }: Context, id: string): Promise<boolean> => {
    try {
        const response = await effects.menuoverview.getMenuEditorOverview(id)
        const menu = response.data
        state.menuoverview.menu = menu
        return true
    } catch (error) {
        console.error(error)
    }
    return false
}
