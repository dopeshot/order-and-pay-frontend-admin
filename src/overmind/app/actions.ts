import { Context } from ".."

export const toggleSidebar = async ({ state }: Context) => {
    state.app.layoutIsSideBarOpen = !state.app.layoutIsSideBarOpen
}
