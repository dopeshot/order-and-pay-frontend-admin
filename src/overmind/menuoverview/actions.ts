import { Context } from ".."

/**
 * Set single menu, with populated categories and dishes
 */
export const getMenuEditor = async ({ state, effects }: Context, id: string): Promise<boolean> => {
    try {
        const response = await effects.menuoverview.getMenuEditorOverview(id)
        const menu = response.data
        state.menuoverview.menu = menu
        return true
    } catch (error) /* istanbul ignore next // should not happen just fallback */ {
        console.error(error)
        return false
    }
}
