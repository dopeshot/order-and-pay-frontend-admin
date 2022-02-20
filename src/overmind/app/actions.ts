import { Context } from ".."

/**
 * Gets called before app is loaded
 */
export const onInitializeOvermind = async ({ state, actions }: Context) => {
    actions.auth.initializeUser()
    window.addEventListener("resize", actions.app.checkIsMobile)
}

/**
 * Check if current page is mobile
 */
export const checkIsMobile = ({ state }: Context): void => {
    state.app.isMobile = window.innerWidth < 768
}

/**
 * For close/open sidebar
 */
export const toggleSidebar = ({ state }: Context): void => {
    state.app.layoutIsSideBarOpen = !state.app.layoutIsSideBarOpen
}

/**
 * Close sidebar
 */
export const closeSidebar = ({ state }: Context): void => {
    state.app.layoutIsSideBarOpen = false
}