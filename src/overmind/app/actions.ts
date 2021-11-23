import { Context } from ".."

export const toggleSidebar = async ({ state }: Context) => {
    state.app.layoutIsSideBarOpen = !state.app.layoutIsSideBarOpen
}

export const closeSidebar = async ({state}: Context) => {
    state.app.layoutIsSideBarOpen = false
}